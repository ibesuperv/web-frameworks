# Unit 4: Questions (5 & 10 Marks)

## 📂 Section 1: AngularJS (Questions 1 to 10)

### **Q1. Explain the "Primitive Scope Shadowing" bug in AngularJS nested controllers. Show a code sample that breaks, trace the prototypal inheritance reason, and show two methods to fix it. [10 Marks]**

**Answer:**

#### 1. Code Sample that Breaks:

```html
<div ng-controller="ParentCtrl">
  <p>Parent Name: {{ name }}</p>

  <div ng-controller="ChildCtrl">
    <!-- Input binding directly to a primitive property -->
    <input type="text" ng-model="name" />
  </div>
</div>
```

```javascript
app.controller("ParentCtrl", function ($scope) {
  $scope.name = "John";
});
app.controller("ChildCtrl", function ($scope) {
  // Empty controller; inherits name from ParentCtrl
});
```

_Expected Behavior:_ Typing in the input field updates `name` in both parent and child views.
_Actual Behavior:_ Once you type in the child input, the connection breaks. The parent view stops updating.

#### 2. Prototypal Inheritance Reason:

In JavaScript, child scopes inherit prototypally from parent scopes.

- **Reading:** When reading `name`, the engine looks at the child scope. Since it is not found, it follows the prototype chain up and reads the parent's `name` ("John").
- **Writing:** When the user types in the input, the child scope attempts to write to `name`. Because `name` is a **primitive** (string), JavaScript does not follow the prototype chain to update the parent. Instead, it creates a new, local property called `name` directly on the child scope. This shadows (blocks access to) the parent's property.

#### 3. Solutions:

- **Solution A (The Dot Rule - Recommended):** Bind properties inside an object. When writing to `user.name`, JavaScript first reads `user` (which it successfully finds on the parent scope via prototype) and then mutates its nested `name` property.

  ```html
  <input type="text" ng-model="user.name" />
  ```

  ```javascript
  $scope.user = { name: "John" };
  ```

- **Solution B (Using Controller As syntax):** Bypasses prototypal scope inheritance rules by binding controller instances directly to properties.
  ```html
  <div ng-controller="ParentCtrl as parent">
    <input type="text" ng-model="parent.name" />
  </div>
  ```

---

### **Q2. Explain what happens when a scope variable is modified inside an external callback like `setInterval` or `addEventListener`. Trace the `$digest` cycle response, explain why the UI fails to update, and show how to fix it with code. [10 Marks]**

**Answer:**

#### 1. Why the UI Fails to Update:

AngularJS uses a **$digest cycle** to perform dirty-checking on all watched variables. This cycle is automatically triggered by AngularJS directives (like `ng-click`, `$http`).
However, when an external browser callback runs (like `setInterval`, `addEventListener`, or a third-party websocket event):

1. The browser executes the callback.
2. The JavaScript state changes (e.g. `$scope.timerCount` changes).
3. The browser exits the callback, but **AngularJS does not know** that the execution occurred because it was not started inside its own wrapper. The `$digest` cycle never runs, leaving the HTML DOM unchanged.

#### 2. The $digest Cycle Tracing:

```
[ External Callback Executed ] ---> [ Variable Updated ] ---> [ Execution Ends ] ---> (DOM is NOT updated!)
                                                                                           |
                                                                               Need $scope.$apply()
                                                                                           |
                                                                                           v
                                                                               [ Trigger $digest() ]
                                                                                           |
                                                                                           v
                                                                                [ Redraws HTML view ]
```

#### 3. Code Example & Fix:

**Incorrect Code (UI remains frozen):**

```javascript
app.controller("TimerCtrl", function ($scope) {
  $scope.seconds = 0;

  // Standard browser API
  setInterval(function () {
    $scope.seconds++; // Changes JavaScript state, but UI does not redraw!
  }, 1000);
});
```

**Correct Code (Forces $digest update):**

```javascript
app.controller("TimerCtrl", function ($scope) {
  $scope.seconds = 0;

  setInterval(function () {
    // $apply automatically catches errors and runs the $digest cycle
    $scope.$apply(function () {
      $scope.seconds++;
    });
  }, 1000);
});
```

---

### **Q3. Explain the problem of Dependency Injection minification in AngularJS. Show a standard registration that crashes after minification, explain why it happens, and provide the two recommended syntaxes to write minification-safe code. [5 Marks]**

**Answer:**

#### 1. Code that crashes:

```javascript
// Standard registration
app.controller("MyCtrl", function ($scope, $http) {
  // Controller logic
});
```

During minification, the JavaScript compiler renames variables to save space (e.g., changing `$scope` to `a` and `$http` to `b`).

```javascript
// Compiled minified code
app.controller("MyCtrl", function(a, b) { ... });
```

AngularJS attempts to read the parameter names as string keys to inject dependencies. Since `a` and `b` do not match any registered service names, AngularJS throws an `[$injector:unpr] Unknown Provider` error.

#### 2. Minification-Safe Syntaxes:

- **Syntax A: Inline Array Injection (Recommended):**
  Pass an array of strings representing the dependency names before the controller constructor function.

  ```javascript
  app.controller("MyCtrl", [
    "$scope",
    "$http",
    function ($scope, $http) {
      // safe because string names do not get minified
    },
  ]);
  ```

- **Syntax B: `$inject` Property Annotation:**
  ```javascript
  function MyCtrl($scope, $http) {}
  MyCtrl.$inject = ["$scope", "$http"];
  app.controller("MyCtrl", MyCtrl);
  ```

---

### **Q4. Contrast the performance and DOM implications of `ng-show` vs `ng-if` when rendering nested components with intensive initialization logic. [5 Marks]**

**Answer:**

#### 1. `ng-show="condition"`

- **DOM Implication:** The element remains in the DOM tree regardless of the condition. AngularJS simply toggles the element's style class using `display: none !important`.
- **Performance Implication:** Heavy initialization runs once on startup. However, even when hidden, all watchers on nested inputs remain active and are dirty-checked during every `$digest` cycle, which can degrade app performance.

#### 2. `ng-if="condition"`

- **DOM Implication:** If the condition evaluates to `false`, the element is completely removed from the DOM tree. If `true`, the element is compiled and reinserted.
- **Performance Implication:** Nested bindings and watcher loops do not run when the element is hidden. However, toggling the condition frequently triggers expensive compile, link, and DOM insertion tasks.

#### 3. Recommendation:

- Use `ng-show` for simple elements that toggle frequently (e.g., menus).
- Use `ng-if` for large, complex layouts with many watchers that toggle infrequently (e.g., tabs, modal windows).

---

### **Q5. Discuss the issue of the "Infinite $digest Loop" (TTL limits). Write a small code snippet that triggers a circular dependency, explain the dirty checking loop mechanics, and show how to resolve it. [10 Marks]**

**Answer:**

#### 1. The Infinite $digest Loop Mechanics

During a `$digest` cycle, AngularJS loops through all registered `$watch` expressions. If a value changes, it updates the view and runs the cycle again to ensure no other values changed as a side-effect.
If two variables watch and modify each other circularly, the cycle will run forever. To prevent the browser tab from freezing, AngularJS sets a **TTL (Threshold To Limit)**, defaulting to 10 iterations. Exceeding this triggers the error:
`Error: [$digest:tll] 10 $digest() iterations reached. Aborting!`

#### 2. Code Snippet that Triggers it:

Evaluating a function inside double curlies that returns a new object reference every time it is called:

```html
<div ng-controller="LoopCtrl">
  <!-- Triggers digest loop on every check -->
  <p>Random numbers: {{ generateNumbers() }}</p>
</div>
```

```javascript
app.controller("LoopCtrl", function ($scope) {
  $scope.generateNumbers = function () {
    // Returns a NEW array reference every time AngularJS calls it
    return [Math.random(), Math.random()];
  };
});
```

_Why this fails:_ AngularJS performs dirty checking using strict equality (`===`). Even if the array values are identical, reference comparison between two different arrays `[] === []` is always `false`. AngularJS thinks the model is constantly changing, triggering an infinite loop.

#### 3. How to Resolve it:

Return static values or object references, or compute the value once in the controller instead of calling the function from the view.

```javascript
app.controller("LoopCtrl", function ($scope) {
  $scope.numbers = [];
  $scope.updateNumbers = function () {
    $scope.numbers = [Math.random(), Math.random()];
  };
  $scope.updateNumbers(); // Run once
});
```

```html
<p>Numbers: {{ numbers }}</p>
```

---

### **Q6. Describe the `$event` object in AngularJS event handlers. Write a program where clicking inside a parent div triggers one event, but clicking a child button inside it triggers another event, and show how to prevent event bubbling using AngularJS. [5 Marks]**

**Answer:**

#### 1. The `$event` Object

`$event` is a reference to the native browser event object (e.g., click event). It contains properties like `clientX` and methods like `stopPropagation()` to control event execution.

#### 2. Event Bubbling Code & Fix:

If a child element has a click handler inside a parent element with its own click handler, clicking the child triggers the parent's event handler too.

```html
<div ng-app="eventApp" ng-controller="EventCtrl">
  <!-- Parent Div -->
  <div ng-click="parentClick()" style="padding: 20px; background-color: #eee;">
    Parent Area

    <br /><br />
    <!-- Child Button passing the $event reference -->
    <button ng-click="childClick($event)">Child Button</button>
  </div>
</div>

<script>
  angular.module("eventApp", []).controller("EventCtrl", function ($scope) {
    $scope.parentClick = function () {
      alert("Parent Clicked!");
    };

    $scope.childClick = function (event) {
      alert("Child Clicked!");
      // Prevent event from bubbling up to parent div
      event.stopPropagation();
    };
  });
</script>
```

---

### **Q7. Explain how AngularJS handles validation states dynamically. How do the `$pristine`, `$dirty`, `$valid`, `$invalid`, `$touched`, and `$untouched` properties change when a user types a character and then deletes it? Explain using a state timeline table. [5 Marks]**

**Answer:**

Assume an input defined as: `<input type="text" name="username" ng-model="user.username" required>`

#### State Timeline Table:

| Action / Stage                              | `$pristine` | `$dirty` | `$valid` | `$invalid` | `$touched` | `$untouched` |
| :------------------------------------------ | :---------- | :------- | :------- | :--------- | :--------- | :----------- |
| **1. Page Load** (no user action)           | `true`      | `false`  | `false`  | `true`     | `false`    | `true`       |
| **2. User Focuses** (starts typing "A")     | `false`     | `true`   | `true`   | `false`    | `false`    | `true`       |
| **3. User Deletes Character** (empty field) | `false`     | `true`   | `false`  | `true`     | `false`    | `true`       |
| **4. User Clicks Outside** (blurs field)    | `false`     | `true`   | `false`  | `true`     | `true`     | `false`      |

_Explanation:_

- Once modified, `$pristine` becomes `false` and `$dirty` becomes `true` permanently.
- Validity (`$valid`/`$invalid`) changes dynamically based on validation rules (it becomes invalid again when cleared because of the `required` attribute).
- Touch states (`$touched`/`$untouched`) only change when the element loses focus.

---

### **Q8. Write a code example showing a nested controller structure (Grandparent, Parent, Child). Explain how scope properties inherit, what happens if a child overrides a parent property, and how to write clean object bindings to keep them synchronized. [5 Marks]**

**Answer:**

#### 1. Code Example:

```html
<div ng-app="nestApp" ng-controller="GrandCtrl">
  <h3>Grandparent Name: {{ user.name }}</h3>

  <div ng-controller="ParentCtrl">
    <h3>Parent Name: {{ user.name }}</h3>

    <div ng-controller="ChildCtrl">
      <!-- Bound to object property to prevent local overrides -->
      <input type="text" ng-model="user.name" />
    </div>
  </div>
</div>
```

```javascript
angular
  .module("nestApp", [])
  .controller("GrandCtrl", function ($scope) {
    $scope.user = { name: "Elder" }; // Object reference
  })
  .controller("ParentCtrl", function ($scope) {
    // Inherits user object reference
  })
  .controller("ChildCtrl", function ($scope) {
    // Inherits user object reference
  });
```

#### 2. Inheritance Rules:

- The scopes form a prototype chain. When `ChildCtrl` reads `user.name`, it searches its own scope, then ascends to `ParentCtrl` and finally resolves the reference at `GrandCtrl`.
- By using an object (`user.name`), when the user types in the input inside the child view, JavaScript mutates the existing `user` object reference located on the grandparent scope. This ensures all three views stay in sync.
- If you bind directly to a primitive variable (e.g., `$scope.name = "Elder"`), typing inside the child controller would create a new local property on the child scope, breaking the connection to the parent.

---

### **Q9. Discuss form validation using custom validators in AngularJS. Write a controller and form code where a custom `$validators` parser checks if a username is already taken or does not match a specific pattern. [10 Marks]**

**Answer:**

To implement custom validation in AngularJS, you can write a directive that hooks into the controller of `ng-model` (`NgModelController`) and adds a validation function to the `$validators` object.

#### 1. Custom Directive and Form Code:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <style>
      .error {
        color: red;
      }
    </style>
  </head>
  <body ng-app="customValApp">
    <div ng-controller="MainCtrl">
      <form name="regForm">
        <label>Choose Username:</label>
        <!-- Custom directive 'check-admin' added here -->
        <input
          type="text"
          name="username"
          ng-model="username"
          required
          check-admin
        />

        <div
          class="error"
          ng-show="regForm.username.$touched && regForm.username.$invalid"
        >
          <span ng-show="regForm.username.$error.required"
            >Username is required.</span
          >
          <span ng-show="regForm.username.$error.isAdmin"
            >Username 'admin' is not allowed.</span
          >
        </div>
      </form>
    </div>

    <script>
      var app = angular.module("customValApp", []);

      app.controller("MainCtrl", function ($scope) {
        $scope.username = "";
      });

      // Custom validation directive definition
      app.directive("checkAdmin", function () {
        return {
          require: "ngModel", // Access ngModel controller APIs
          link: function (scope, element, attrs, ctrl) {
            // Add custom validator check
            ctrl.$validators.isAdmin = function (modelValue, viewValue) {
              var value = modelValue || viewValue;
              // Return true if valid, false if invalid
              return value !== "admin";
            };
          },
        };
      });
    </script>
  </body>
</html>
```

---

### **Q10. What is the difference between `ng-bind` and the double-curly braces `{{ }}` expression in terms of page loading experience? Discuss the "Flash of Uncompiled Template" (FOUT) issue and how to resolve it. [5 Marks]**

**Answer:**

#### 1. The Difference

- **`{{ }}` (Interpolation):** The browser displays the raw template string `{{ username }}` before the AngularJS framework loads and compiles the page.
- **`ng-bind`:** A directive that evaluates the expression and sets the text content of the DOM element (`element.innerText = value`).

#### 2. The FOUT Issue

If the AngularJS library takes time to load or compile (due to large files or slow network speeds), users will see the raw curly braces `{{ username }}` on the screen for a brief second. This is called the **Flash of Uncompiled Template (FOUT)**.

#### 3. How to Resolve it:

- **Method A (Use `ng-bind`):** Instead of using curly braces, use the `ng-bind` directive on the HTML tag. The element will remain blank until AngularJS compile runs.
  ```html
  <span ng-bind="username"></span>
  ```
- **Method B (Use `ng-cloak`):** AngularJS provides the `ng-cloak` directive. It applies a `display: none` style to the element, hiding it until AngularJS is fully loaded and compiling.
  ```html
  <div ng-cloak>{{ username }}</div>
  ```

---

## 📂 Section 2: Node.js (Questions 11 to 20)

### **Q11. Write a script that uses `process.nextTick()`, `Promise.resolve()`, `setTimeout()`, and `setImmediate()`. Trace the exact stdout print sequence step-by-step, explaining the Microtask queue priority and the Event Loop phases. [10 Marks]**

**Answer:**

#### 1. Code Snippet:

```javascript
const fs = require("fs");

console.log("1. Synchronous Start");

setTimeout(() => {
  console.log("2. Timeout Callback");
}, 0);

setImmediate(() => {
  console.log("3. Immediate Callback");
});

Promise.resolve().then(() => {
  console.log("4. Promise Microtask");
});

process.nextTick(() => {
  console.log("5. nextTick Microtask");
});

console.log("6. Synchronous End");
```

#### 2. Step-by-Step Execution Trace:

1. **Synchronous Execution:**
   - Prints `"1. Synchronous Start"`.
   - Registers `setTimeout` callback in the Timers phase queue.
   - Registers `setImmediate` callback in the Check phase queue.
   - Registers the Promise callback in the Promise microtask queue.
   - Registers the `process.nextTick` callback in the nextTick microtask queue.
   - Prints `"6. Synchronous End"`.
2. **Execute Microtask Queues:**
   - The synchronous execution block finishes. Node checks the Microtask Queue before starting the Event Loop.
   - `process.nextTick` has highest priority $\rightarrow$ Prints `"5. nextTick Microtask"`.
   - Promises queue is checked next $\rightarrow$ Prints `"4. Promise Microtask"`.
3. **Event Loop Starts:**
   - **Phase 1: Timers:** Checks for expired timers. The 0ms timer has expired, so it runs its callback $\rightarrow$ Prints `"2. Timeout Callback"`.
   - **Phase 2 & 3: Pending & Poll:** Queues are empty, so the loop moves to the next phase.
   - **Phase 4: Check:** Runs the `setImmediate` callback $\rightarrow$ Prints `"3. Immediate Callback"`.

#### 3. Output:

```
1. Synchronous Start
6. Synchronous End
5. nextTick Microtask
4. Promise Microtask
2. Timeout Callback
3. Immediate Callback
```

---

### **Q12. Explain the "blocking the event loop" hazard in Node.js. Provide a code example of a web server containing a CPU-intensive synchronous loop, explain what happens to other concurrent connections, and discuss how to mitigate it (e.g. Worker Threads or child processes). [10 Marks]**

**Answer:**

#### 1. The "Blocking the Event Loop" Hazard

Because Node.js runs on a single main thread, any CPU-heavy synchronous calculations (like deep loops, cryptography, or image processing) will hog the CPU. While the thread is busy running this calculation, the Event Loop cannot process any other tasks, leaving the server completely unresponsive.

#### 2. Code Example of a Blocking Web Server:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/heavy") {
    // CPU-intensive blocking operation
    let sum = 0;
    for (let i = 0; i < 1e10; i++) {
      sum += i;
    }
    res.end(`Calculation Completed: ${sum}`);
  } else {
    // Simple fast request route
    res.end("Fast response!");
  }
});

server.listen(3000);
```

_What happens:_ If one user opens `/heavy`, the server freezes. If a second user requests `/`, they will experience a delay and their browser will load indefinitely until the first user's loop finishes execution.

#### 3. Mitigations:

1. **Offload to Worker Threads:** Use Node's built-in `worker_threads` module to run CPU-intensive tasks on separate background threads, keeping the main event loop thread free.
2. **Split using child_process:** Fork a child process to handle calculations.
3. **Partitioning:** Split the long-running task into smaller chunks using `setImmediate()` to yield control back to the event loop between iterations.

---

### **Q13. Explain Module Caching in Node.js. If a module exports a mutable object configuration, show how modifying it in one file affects imports in other files, and explain why this singleton behavior happens. [5 Marks]**

**Answer:**

#### 1. Why Singleton Behavior Happens:

The first time a module is imported via `require()`, Node.js loads, parses, and evaluates the file. It then stores the exported result in a local cache memory. Subsequent calls to `require()` retrieve the object directly from this cache instead of executing the module file again.

#### 2. Code Demonstration:

**Module file (`config.js`):**

```javascript
module.exports = {
  theme: "light",
};
```

**Importing File 1 (`file1.js`):**

```javascript
const config = require("./config");
config.theme = "dark"; // Modify mutable property
console.log("File 1 Theme:", config.theme); // Output: dark
```

**Importing File 2 (`file2.js`):**

```javascript
const config = require("./config");
// File 2 reads the cached object reference, so it sees the modifications
console.log("File 2 Theme:", config.theme); // Output: dark
```

---

### **Q14. Explain the difference between `setImmediate(fn)` and `setTimeout(fn, 0)` in terms of execution order. Why is the order non-deterministic when called in the main module, and why does it become deterministic when nested inside an I/O callback? [10 Marks]**

**Answer:**

#### 1. The Core Difference:

- `setTimeout(fn, 0)` is designed to execute a callback after a minimum of 0ms (under the hood, Node rounds this up to 1ms).
- `setImmediate(fn)` is designed to run a callback in the Check phase of the Event Loop, immediately after the Poll phase.

#### 2. Non-Deterministic Behavior (Main Module)

When executed at the top level of a script:

```javascript
setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));
```

The execution order is **non-deterministic** (random).
_Why:_ Starting the Node process takes time. If it takes less than 1ms, the loop enters the Timers phase before the timer has expired. It skips Timers and runs the Check phase instead, printing `"Immediate"` first. If it takes more than 1ms, the timer has expired, so it prints `"Timeout"` first.

#### 3. Deterministic Behavior (Inside I/O Callback)

When called inside an I/O callback:

```javascript
const fs = require("fs");
fs.readFile("test.txt", () => {
  setTimeout(() => console.log("Timeout"), 0);
  setImmediate(() => console.log("Immediate"));
});
```

The order is **deterministic** (always prints `"Immediate"` first).
_Why:_ The I/O callback finishes executing in the **Poll phase**. According to the event loop phases, the loop moves directly from the Poll phase to the **Check phase**. Therefore, `setImmediate` is guaranteed to run before `setTimeout` (which must wait for the next iteration's Timers phase).

---

### **Q15. Discuss error handling in asynchronous Node.js. Why does a standard `try-catch` block fail to catch an error thrown inside a nested `fs.readFile` callback? Provide a code sample illustrating this failure, and show the correct "Error-First Callback" pattern. [5 Marks]**

**Answer:**

#### 1. Why `try-catch` Fails:

A `try-catch` block executes synchronously. When an asynchronous function like `fs.readFile` is called, the task is delegated to the operating system, and JavaScript immediately exits the `try` block. By the time the file read completes and the callback throws an error, the `try-catch` block has already finished execution, causing the application to crash.

#### 2. Incorrect Implementation (Crashes Application):

```javascript
try {
  fs.readFile("nonexistent.txt", "utf8", (err, data) => {
    if (err) throw err; // Thrown asynchronously; try-catch cannot catch it
  });
} catch (e) {
  console.log("Caught error:", e); // Never executed
}
```

#### 3. Correct Implementation (Error-First Callback):

Node.js callbacks expect the first argument to be an error object, and the second to be the return data.

```javascript
fs.readFile("nonexistent.txt", "utf8", (err, data) => {
  if (err) {
    // Handle error gracefully
    console.error("Error reading file safely:", err.message);
    return;
  }
  console.log(data);
});
```

---

### **Q16. How does libuv manage the thread pool in Node.js? What is the default pool size, how does it scale, and which core API tasks are offloaded to this pool? [5 Marks]**

**Answer:**

#### 1. Thread Pool Management:

While JavaScript runs on a single main thread, Node.js offloads synchronous system-level tasks to a background thread pool managed by the C library **libuv**.

#### 2. Pool Size:

- The default pool size is **4 threads**.
- It can be scaled at startup by changing the environment variable `UV_THREADPOOL_SIZE` (up to a maximum of 1024 threads).
  ```bash
  # Example: Setting pool size to 8 threads in Windows cmd
  set UV_THREADPOOL_SIZE=8
  ```

#### 3. Core Tasks Offloaded:

- **File System Operations (`fs`):** All asynchronous file reads/writes.
- **Cryptography:** Slow math algorithms like `crypto.pbkdf2()`, `crypto.randomBytes()`.
- **DNS Resolution:** `dns.lookup()`.
- **Zlib Compression:** Asynchronous compression/decompression tasks.

---

### **Q17. Write a script demonstrating Event Emitter memory leaks. Show how adding listeners inside a request handler causes resource consumption, and explain how to prevent it using `.once()` or `.removeListener()`. [5 Marks]**

**Answer:**

#### 1. Memory Leak Code:

```javascript
const EventEmitter = require("events");
const http = require("http");

const eventHub = new EventEmitter();

const server = http.createServer((req, res) => {
  // LEAK: Adding an event listener inside a request handler
  // Each request adds a new listener function to eventHub, which is never cleaned up
  eventHub.on("message", (msg) => {
    console.log("Message received:", msg);
  });

  res.end("Response complete.");
});

server.listen(3000);
```

#### 2. Why it Leaks:

Every request adds a listener function to the `eventHub` object. Because `eventHub` lives in global scope, it keeps references to the callback functions, preventing the garbage collector from cleaning them up. Over time, memory usage climbs, eventually crashing the application.

#### 3. Prevention:

- **Option A:** Use `.once()` instead of `.on()`. This automatically removes the listener after it fires.
  ```javascript
  eventHub.once('message', (msg) => { ... });
  ```
- **Option B:** Remove listeners manually.
  ```javascript
  function myListener() { ... }
  eventHub.on('message', myListener);
  // Remove listener when done
  eventHub.removeListener('message', myListener);
  ```

---

### **Q18. Explain the behavior of `exports` vs `module.exports` in Node.js. Write a code example demonstrating how reassigning `exports = function() {}` breaks the export binding, and explain the underlying reference pointer mechanics. [5 Marks]**

**Answer:**

#### 1. Reference Pointer Mechanics

At the start of every module file, Node.js implicitly creates the following reference bindings:

```javascript
var module = { exports: {} };
var exports = module.exports; // exports points to the same object
```

At the end of the file, Node.js returns **`module.exports`**, not `exports`.

#### 2. Reassignment Code that Breaks:

```javascript
// math.js

// This breaks the reference link! exports now points to a new function object
// module.exports remains an empty object {}
exports = function (a, b) {
  return a + b;
};
```

If you import this module elsewhere:

```javascript
const add = require("./math");
add(5, 5); // TypeError: add is not a function
```

#### 3. Correct Way to Export:

To reassign the export, you must bind directly to `module.exports`.

```javascript
module.exports = function (a, b) {
  return a + b;
};
```

---

### **Q20. In Node's event loop, explain the Poll phase in detail. Under what conditions does the event loop block/wait in the poll phase, and how does it determine when to wake up? [5 Marks]**

**Answer:**

#### 1. What the Poll Phase Does:

1. Calculates how long it should block and wait for new I/O events.
2. Processes events in the Poll queue.

#### 2. Blocking Conditions:

If the event loop enters the Poll phase and there are no immediate callbacks in the queue:

- **If there are no `setImmediate()` scripts scheduled:** The loop will pause in the Poll phase and wait for new I/O events (like database updates or network packets) to arrive.
- **If `setImmediate()` scripts DO exist:** The loop exits the Poll phase and immediately moves to the Check phase.
- **If timers are waiting:** The loop checks the next timer's expiration time and only blocks in the Poll phase for that duration. Once that duration passes, it wakes up and moves to the Timers phase.

---

## 📂 Section 3: React.js (Questions 21 to 30)

### **Q21. Explain the state batching behavior in React. Trace the state values and console output for a function that calls `setCount(count + 1)` three times in a row, explain why it behaves this way, and show how to fix it using functional state updates. [10 Marks]**

**Answer:**

#### 1. State Batching Behavior

To prevent unnecessary re-renders, React batches multiple state updates inside an event handler into a single update. It does not update the state variables immediately.

#### 2. Tracing the Code:

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1); // Reads count = 0 -> schedules count = 1
  setCount(count + 1); // Reads count = 0 -> schedules count = 1
  setCount(count + 1); // Reads count = 0 -> schedules count = 1

  console.log(count); // Prints count value in this render cycle
};
```

- **Actual State Update:** React batches these updates. Since all three calls read the current render cycle's value (`0`), the state is updated to `1` (not `3`).
- **Console Output:** Prints `0` because the state variable's value does not change until the next render cycle.

#### 3. How to Fix It (Functional Updates):

Pass an updater function to `setCount`. This function receives the **previous state** at the moment of execution, allowing updates to queue correctly.

```javascript
const handleClick = () => {
  setCount((prevCount) => prevCount + 1); // Queue 1: prev 0 -> returns 1
  setCount((prevCount) => prevCount + 1); // Queue 2: prev 1 -> returns 2
  setCount((prevCount) => prevCount + 1); // Queue 3: prev 2 -> returns 3

  console.log(count); // Still logs 0 because render cycle hasn't changed
};
```

_Result:_ Component updates the state correctly to `3`.

---

### **Q22. Explain why keys are required in React list rendering. Write a code sample showing the visual and state bugs that can occur if the array index is used as a `key` when rendering a list of input elements that can be reordered or deleted. [10 Marks]**

**Answer:**

#### 1. Why Keys are Required:

React uses keys to track the identity of elements in a list. When re-rendering, React compares keys to determine if elements have been moved, added, or removed, avoiding the need to reconstruct the DOM tree from scratch.

#### 2. Code Demonstrating the Array Index Key Bug:

```jsx
import React, { useState } from "react";

export default function BrokenTodoList() {
  const [todos, setTodos] = useState([
    { id: 101, text: "Buy Milk" },
    { id: 102, text: "Finish Homework" },
  ]);

  const deleteFirst = () => {
    setTodos(todos.slice(1)); // Removes the first todo
  };

  return (
    <div>
      <button onClick={deleteFirst}>Delete First Item</button>
      <ul>
        {todos.map((todo, index) => (
          // BUG: Using array index as key
          <li key={index}>
            {todo.text}:{/* Input holds internal DOM state */}
            <input type="text" placeholder="Add comments here" />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### 3. The Visual Bug Explanation:

1. Suppose you type "urgent task" into the input field for **"Buy Milk"** (index 0), leaving the input for "Finish Homework" (index 1) blank.
2. Click the **Delete First Item** button.
3. React re-renders the list. The list now contains only "Finish Homework", which is shifted to index 0.
4. React compares the new list's keys with the old list's keys:
   - It sees an item with key `0` (the new index).
   - Since key `0` already existed in the old render, React reuses the DOM element for key `0`—including its input value "urgent task"!
5. **The bug:** The text "urgent task" now appears next to the "Finish Homework" item instead of being deleted. Using unique IDs (`key={todo.id}`) avoids this issue.

---

### **Q23. Explain the Virtual DOM diffing algorithm (Reconciliation) in React. What are the heuristic assumptions React makes to achieve O(n) rendering complexity instead of O(n^3)? [5 Marks]**

**Answer:**
Comparing two trees has a minimum complexity of $O(n^3)$. To make updates performant, React makes two heuristic assumptions to achieve a much faster **$O(n)$ complexity**:

1. **Different Element Types Produce Different Trees:** If two elements have different HTML tags (e.g. changing `<div>` to `<span>`), React will not try to diff them. It destroys the old element and its children and builds the new tree from scratch.
2. **Developer-Assigned Keys:** If children elements contain unique `key` attributes, React can match elements between render passes, even if they have been reordered or shifted in the array.

---

### **Q24. Discuss what happens when a controlled input component's state value resolves to `undefined` or `null` during runtime. Write a code sample demonstrating this transition and explain React's warning behavior. [5 Marks]**

**Answer:**

#### 1. What Happens:

If a controlled input’s value is set to `null` or `undefined`, React stops managing the input and converts it to an **uncontrolled component**. The input's text values are no longer bound to the state, allowing the user to type freely.

#### 2. Code Example:

```jsx
function App() {
    const [name, setName] = useState("John");

    return (
        <button onClick={() => setName(undefined)}>
            Break Input control
        </button>
        <input value={name} onChange={e => setName(e.target.value)} />
    );
}
```

#### 3. Warning Behavior:

React logs a console warning:
`Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to an undefined value, which should not happen.`

---

### **Q25. Explain the read-only rule of `props` in React. If a parent passes an object prop to a child, what happens if the child mutates a nested property of that object? Why does this bypass React's standard re-rendering flow, and how should it be written instead? [10 Marks]**

**Answer:**

#### 1. The Immutability Rule:

React components must act like pure functions. They must never modify their input props.

#### 2. Modifying Nested Properties:

```jsx
// Child Component
function UserCard(props) {
  const editName = () => {
    // Direct Mutation of parent state object property
    props.userObj.name = "Aditi";
  };
  return <button onClick={editName}>Change Name</button>;
}
```

#### 3. Why it Bypasses Re-rendering:

React detects state changes by performing reference comparisons (`oldState === newState`).
When the child component mutates `props.userObj.name = "Aditi"`, the parent's state object reference does not change. Because the reference remains the same, React's change detection assumes nothing changed and skips re-rendering the view.

#### 4. Correct Way:

The parent must pass an updater handler function to the child. The child calls the function with a new, shallow-copied object using the spread operator.

```jsx
// Parent
const [userObj, setUserObj] = useState({ name: "Varun" });
const handleUpdate = (newName) => {
  setUserObj({ ...userObj, name: newName }); // New object reference created
};
```

---

### **Q26. Explain how event delegation works in React's SyntheticEvent system. How does React mount handlers, and what is the difference between `event.nativeEvent` and `SyntheticEvent`? [5 Marks]**

**Answer:**

#### 1. Event Delegation:

React does not attach event handlers directly to individual HTML DOM elements. Instead, it registers a single event listener at the root of the document DOM node (or container root). When an event occurs, it bubbles up to the root, where React identifies the target component and processes the event.

#### 2. SyntheticEvent vs. NativeEvent:

- **`SyntheticEvent`:** A cross-browser wrapper object created by React. It standardizes event handling properties so they behave identically in all browsers.
- **`event.nativeEvent`:** The actual browser event object, which you can access if you need to use browser-specific event APIs.

---

### **Q27. Discuss the stale closure problem in React hooks. Write a code example where a `useEffect` setting an interval logs a stale state variable, explain why it happens, and show how to solve it. [10 Marks]**

**Answer:**

#### 1. Stale Closure Code Example:

```jsx
import React, { useState, useEffect } from "react";

export default function StaleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // BUG: count is trapped in a closure from the first render
      console.log("Count is:", count);
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect only runs once

  return <h1>Count: {count}</h1>;
}
```

_Result:_ The console always prints `"Count is: 0"`, and the state never increments past `1`.

#### 2. Why it Happens:

The `useEffect` runs only once because its dependency array is empty (`[]`). The callback inside `setInterval` forms a **closure** over the variables in its parent scope. Because the effect never re-runs, the callback is trapped using the initial value of `count` (`0`) forever.

#### 3. How to Solve It:

- **Method A (Functional State Update):** Bypasses the dependency array entirely.
  ```javascript
  setCount((prevCount) => prevCount + 1);
  ```
- **Method B (Add to Dependency Array):** Re-runs the effect (re-creating the timer) whenever `count` updates.
  ```javascript
  useEffect(() => {
    // timer logic
  }, [count]);
  ```

---

### **Q28. Explain the differences between Controlled and Uncontrolled forms in React. Write a form component containing both options, and discuss when to choose one over the other in terms of performance and field validations. [5 Marks]**

**Answer:**

#### 1. Code Comparison:

```jsx
import React, { useState, useRef } from "react";

export default function CombinedForm() {
  // Controlled field state
  const [controlVal, setControlVal] = useState("");
  // Uncontrolled field ref
  const refVal = useRef(null);

  return (
    <form>
      {/* Controlled */}
      <input
        value={controlVal}
        onChange={(e) => setControlVal(e.target.value)}
      />

      {/* Uncontrolled */}
      <input ref={refVal} />
    </form>
  );
}
```

#### 2. When to Choose:

- **Use Controlled Components for:** Real-time feedback, conditional submit button disabling, password strength meters, and instantaneous format validation.
- **Use Uncontrolled Components for:** Simple forms that only validate on submit, importing non-React libraries, or optimizing performance for large forms with hundreds of fields to avoid re-rendering on every keystroke.

---

### **Q29. Explain the rules of hooks in React. Why can you not call hooks inside conditionals (`if` blocks) or loops (`for` statements)? Explain the internal array tracking mechanism React uses to map states. [5 Marks]**

**Answer:**

#### 1. Why Hooks cannot be Conditional or Nested:

React relies on the **order** in which Hooks are called. On every render, React matches each hook call with its corresponding state container. If a hook call is skipped (e.g. inside an `if` block that evaluates to false), the hook call order changes, causing React to return incorrect state data for all subsequent hooks.

#### 2. Internal Array Tracking Mechanism:

Internally, React represents component state as a linked list or array of state cells:

```
Render 1:
1. useState("Varun")   ---> returns value at index 0
2. useState("Admin")   ---> returns value at index 1
```

If Render 2 skips the first hook, the second hook is executed first, reading the state at index 0 ("Varun") instead of index 1 ("Admin"), causing data corruption.

---

### **Q30. Write a React component utilizing a single state object to handle a multi-field form. Explain the spread operator logic `...inputs` and dynamic keys `[name]: value`, showing how it avoids state mutations. [5 Marks]**

**Answer:**

#### 1. Code Example:

```jsx
import React, { useState } from "react";

export default function MultiFieldForm() {
  const [formState, setFormState] = useState({ username: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state without mutation
    setFormState((prev) => ({
      ...prev, // 1. Copy existing fields (spread operator)
      [name]: value, // 2. Set key dynamically using name attribute
    }));
  };

  return (
    <form>
      <input
        name="username"
        value={formState.username}
        onChange={handleInputChange}
      />
      <input
        name="email"
        value={formState.email}
        onChange={handleInputChange}
      />
    </form>
  );
}
```

#### 2. Mechanics:

- **`...prev`:** Creates a shallow copy of the state object, preserving other fields.
- **`[name]: value`:** Uses ES6 computed property names to dynamically resolve the key, avoiding direct state mutations (`formState.username = value`) which fail to trigger component updates.
