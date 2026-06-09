**Q1. In AngularJS expressions like `{{ name }}`, what happens if the variable `name` is undefined?**
A1. AngularJS does not throw an error; it simply renders nothing (displays blank).

**Q2. In AngularJS, which directive is used to implement two-way data binding on form inputs?**
A2. The `ng-model` directive.

**Q3. What is the role of the `$rootScope` in an AngularJS application?**
A3. It is the top-level parent scope created on the element with `ng-app` that is accessible by all controllers in the application.

**Q4. In AngularJS, how do you prevent local variable shadowing when a child controller inherits primitive variables from a parent controller?**
A4. By binding to a property of an object (e.g., `user.name`) rather than a primitive variable directly (e.g., `name`).

**Q5. How does AngularJS know when to update the DOM view when a model variable changes?**
A5. It runs a `$digest` cycle which executes "dirty checking" on all registered `$watch` variables to detect differences between current and previous values.

**Q6. Name two built-in CSS state classes that AngularJS automatically attaches to input elements to indicate validity.**
A6. `ng-valid` and `ng-invalid`.

**Q7. In AngularJS form validation, what is the difference between the `$dirty` state and the `$touched` state?**
A7. `$dirty` becomes true when the user modifies the input's text value. `$touched` becomes true when the user loses focus (blurs) from the input.

**Q8. What happens if you modify a `$scope` variable inside a standard JavaScript `setTimeout` callback function?**
A8. The model changes in JavaScript, but the HTML view does not update because `setTimeout` runs outside AngularJS and does not trigger the `$digest` cycle.

**Q9. What type of architecture does Node.js follow to handle concurrent connections on a single thread?**
A9. An asynchronous, single-threaded, event-driven architecture using an Event Loop.

**Q10. What is the primary difference between how traditional web servers (like Apache) and Node.js process requests?**
A10. Traditional web servers allocate a new thread per request (multi-threaded, blocking), whereas Node.js uses a single main thread and non-blocking I/O to handle all requests.

**Q11. Which Node.js global object contains information about and control over the current execution process?**
A11. The `process` object.

**Q12. What is the difference between `process.nextTick()` and `setImmediate()` execution order in Node.js?**
A12. `process.nextTick()` runs immediately after the current operation ends (before the next event loop phase), while `setImmediate()` runs during the Check phase of the Event Loop.

**Q13. How do you import a local file module named `utils.js` into another script using Node's CommonJS module system?**
A13. By calling `const utils = require('./utils');`.

**Q14. What is the role of the `libuv` library in Node.js?**
A14. It manages the Event Loop and provides a background thread pool to handle asynchronous system operations (like file system tasks).

**Q15. Why does React use a Virtual DOM instead of updating the browser DOM directly?**
A15. To optimize performance by computing the minimum number of updates needed (via diffing) and batching updates to avoid expensive real DOM manipulations.

**Q16. What is the difference in immutability between `props` and `state` in a React component?**
A16. `props` are read-only (immutable) parameters passed down from a parent component, whereas `state` is local data managed and mutated within the component itself.

**Q17. In React JSX, what naming convention is used for HTML attributes like `class` and `onclick`?**
A17. camelCase syntax is used, converting them to `className` and `onClick`.

**Q18. What is a Controlled Component in React?**
A18. An input component whose value is driven by React component state, synced via `value` and `onChange` attributes.

**Q19. Why does React wrap browser native events inside a `SyntheticEvent` object?**
A19. To standardize event properties and behaviors across different browsers and improve speed through event delegation.

**Q20. Why does writing `onClick={deleteItem(id)}` in React cause a render loop crash?**
A20. Because the parentheses call the function immediately during rendering. It must be wrapped in a callback reference: `onClick={() => deleteItem(id)}`.
