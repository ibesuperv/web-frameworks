# Web Technologies Exam Solutions: Unit II & Unit III

---

## PART-A Solutions

---

### Q1.1 (2 Marks) — Unit II

#### Question:
> **What is meant by a dynamic document in JavaScript?**

#### Solution:
A **dynamic document** is a web page whose content, structural layout, positioning, style (colors, fonts), or visibility can be modified dynamically at runtime by client-side JavaScript in response to user actions (e.g., mouse clicks, key presses, timers) without requiring a full page reload from the web server. 

Dynamic documents leverage the **Document Object Model (DOM)** and CSS properties (such as `style.visibility`, `style.top`, `style.left`, and `innerHTML`) to transform static HTML markup into interactive, responsive user interfaces.

---

### Q1.2 (2 Marks) — Unit II

#### Question:
> **Define drag-and-drop functionality in JavaScript.**

#### Solution:
**Drag-and-drop functionality** in JavaScript is an interactive user interface mechanism that allows users to click on an element, move (drag) it across the screen while holding down the primary mouse button, and place (drop) it at a new position upon releasing the button.

It is implemented using three core DOM mouse event handlers:
1. **`mousedown`**: Detects when the user clicks on the element, grabs its current position, calculates cursor offset coordinates (`event.clientX`, `event.clientY`), and sets a grab flag to `true`.
2. **`mousemove`**: Tracks cursor movement across the viewport and dynamically updates the element's CSS `left` and `top` position styles.
3. **`mouseup`**: Detects button release, resets the grab flag to `false`, and unbinds or stops coordinate updating to drop the element in place.

---

### Q1.3 (2 Marks) — Unit III

#### Question:
> **What is the purpose of session tracking in PHP?**

#### Solution:
The primary purpose of **session tracking** in PHP is to maintain state and persist user-specific data across multiple HTTP requests during a web browsing session. Because HTTP is inherently a **stateless protocol**, servers cannot natively remember previous requests from the same user.

Session tracking solves this by:
1. Generating a unique **Session ID** for each connecting browser.
2. Allocating a secure, server-side data structure (**`$_SESSION` superglobal array**) to store variables (such as user authentication status, shopping cart items, and user preferences).
3. Associating client requests with their corresponding server-side session data using a lightweight cookie or URL parameter.

---

### Q1.4 (2 Marks) — Unit III

#### Question:
> **Differentiate between cookies and sessions in PHP.**

#### Solution:

| Feature | Cookies (`$_COOKIE`) | Sessions (`$_SESSION`) |
| :--- | :--- | :--- |
| **Storage Location** | Stored locally on the **Client Browser Machine**. | Stored on the **Web Server Machine**. |
| **Security Level** | **Lower**: Sensitive data can be inspected or altered by users. | **Higher**: Clients store only an encrypted Session ID; data remains secure on server. |
| **Data Capacity** | Limited to **4 KB** of text data per cookie. | Large capacity (limited only by server memory/disk space). |
| **Lifetime Control** | Set via explicit expiration timestamp in `setcookie()`. | Automatically expires when browser is closed or upon server session timeout (`session_destroy()`). |

---

### Q1.5 (2 Marks) — Unit III

#### Question:
> **What is an XML Schema and why is it used?**

#### Solution:
An **XML Schema (XSD)** is a W3C-standardized meta-language written in native XML syntax that defines the structural rules, element hierarchy, attribute definitions, and precise data types for a class of XML instance documents.

#### Why it is used:
1. **Data Type Checking**: Unlike DTDs (which support only text), XML Schema provides **44 built-in data types** (integers, floats, dates, booleans) and custom facet constraints (e.g. `maxLength`, `minInclusive`).
2. **Structural Validation**: Ensures that XML documents adhere to strict structural constraints before being processed by application logic.
3. **Native XML Syntax**: Being an XML document itself, an XML Schema can be parsed, validated, and transformed using standard XML processors and tools.
4. **Namespace Integration**: Seamlessly integrates with XML Namespaces to prevent element name collisions.

---

---

## PART-B Solutions

---

### Q2(a) (5 Marks) — Unit II

#### Question:
> **Describe how JavaScript is used to manipulate webpage elements dynamically. Explain the concepts of positioning elements, changing colors and fonts, and controlling element visibility with suitable examples.**

#### Solution:

JavaScript interacts with HTML elements dynamically through the **Document Object Model (DOM)**. Every HTML element in a document is represented as a DOM element node object accessible via methods like `document.getElementById()`. Developers alter element properties at runtime by modifying the element's `.style` property object or `.innerHTML` property.

#### 1. Positioning Elements Dynamically
To move elements dynamically, the element's CSS `position` property must be set to `absolute`, `relative`, or `fixed`. JavaScript then updates the numerical values of the `left`, `top`, `right`, or `bottom` style properties (always appending unit strings like `"px"`).

```javascript
// Moves an element to position (200px, 150px)
var elem = document.getElementById("box");
elem.style.position = "absolute";
elem.style.left = "200px";
elem.style.top = "150px";
```

#### 2. Changing Colors and Fonts
JavaScript can dynamically modify visual presentation styles via the `style` object:
- **Colors**: `style.color` (text color), `style.backgroundColor` (background color).
- **Fonts**: `style.fontSize` (e.g., `"18pt"`), `style.fontFamily` (e.g., `"Arial"`), `style.fontWeight` (e.g., `"bold"`).

```javascript
var textElem = document.getElementById("heading");
textElem.style.color = "crimson";
textElem.style.backgroundColor = "#f0f0f0";
textElem.style.fontSize = "24pt";
textElem.style.fontFamily = "Verdana, sans-serif";
```

#### 3. Controlling Element Visibility
Element visibility can be manipulated dynamically using two primary CSS style properties:
- **`visibility`**: Setting `style.visibility = "hidden"` hides the element while maintaining its physical layout space in the document flow. Setting `style.visibility = "visible"` reveals it.
- **`display`**: Setting `style.display = "none"` hides the element and removes its space from the layout flow entirely. Setting `style.display = "block"` or `"inline"` restores it.

```javascript
function toggleVisibility(id) {
  var target = document.getElementById(id);
  if (target.style.visibility === "hidden") {
    target.style.visibility = "visible";
  } else {
    target.style.visibility = "hidden";
  }
}
```

---

### Q2(b) (5 Marks) — Unit II

#### Question:
> **Explain how JavaScript can locate the mouse cursor, react to mouse clicks, and implement Drag-and-drop functionality and slow movement of elements in dynamic documents.**

#### Solution:

#### 1. Locating Mouse Cursor & Reacting to Mouse Clicks
JavaScript detects mouse activity via `MouseEvent` objects passed to event listeners (`onclick`, `onmousedown`, `onmousemove`, `onmouseup`).
- **Cursor Coordinates**:
  - `event.clientX`, `event.clientY`: Returns horizontal and vertical coordinates relative to the visible browser viewport.
  - `event.pageX`, `event.pageY`: Returns coordinates relative to the full page document (including scroll offsets).

```javascript
document.onmousemove = function(event) {
  var x = event.clientX;
  var y = event.clientY;
  console.log("Cursor Position: X=" + x + ", Y=" + y);
};
```

#### 2. Implementing Drag-and-Drop Functionality
Drag-and-drop connects three mouse event states:
1. `mousedown`: Determines if the cursor is over the target element, calculates grab offsets (`offsetX = clientX - elementLeft`), and sets `isDragging = true`.
2. `mousemove`: If `isDragging` is true, continuously updates `element.style.left = (clientX - offsetX) + "px"` and `element.style.top = (clientY - offsetY) + "px"`.
3. `mouseup`: Resets `isDragging = false` to release the element at its current position.

#### 3. Slow Movement of Elements (Animation)
Slow movement is achieved by incrementally altering an element's position over time using timer functions: `setInterval(function, delayMs)` or `setTimeout()`.

```javascript
// Slowly animates an element horizontally to 400px position
function animateSlow(id) {
  var elem = document.getElementById(id);
  var currentPos = parseInt(elem.style.left) || 0;
  var targetPos = 400;

  var timer = setInterval(function() {
    if (currentPos >= targetPos) {
      clearInterval(timer); // Stop animation when target is reached
    } else {
      currentPos += 5; // Move 5px per interval step
      elem.style.left = currentPos + "px";
    }
  }, 20); // Step every 20ms
}
```

---

---

### Q3 (10 Marks) — Unit II

#### Question:
> **You need to build a simple "card stack" manager using JavaScript. Assume three overlapping `<div>` cards (each 150×200 pixels) with different background colors, initially stacked with different z-index values (e.g., card 1 on top, card 3 at bottom). Implement the following features:**
>
> **(a) A button that toggles visibility of the middle card (show/hide) without affecting the other cards.**  
> **(b) Buttons to change the text color and font size of the frontmost (top) card dynamically.**  
> **(c) A "Change Content" button that replaces the dynamic content (HTML text) of the bottom card with the current date and time.**  
> **(d) Enable dragging and dropping of the topmost card using mouse events (mousedown, mousemove, mouseup). The card should follow the mouse cursor while dragging and be dropped at the new position.**  
> **(e) A button that brings the dragged card to the top of the stack (i.e., changes its z-index to be higher than all others).**  
>
> **Provide the full HTML/JavaScript code with clear comments for each feature.**

#### Solution:

Below is the complete, self-contained, and fully executable HTML and JavaScript code fulfilling all requirements (a) through (e).

```html
<!DOCTYPE html>
<!-- card_stack_manager.html
     A complete Card Stack Manager demonstrating DHTML, z-index manipulation,
     dynamic content/style modification, and drag-and-drop functionality.
     -->
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Card Stack Manager</title>
  <style type="text/css">
    /* Control Panel Styling */
    #controls {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f0f4f8;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    button {
      margin: 5px;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
    }

    /* Container for the stacked cards */
    #stack-container {
      position: relative;
      width: 600px;
      height: 450px;
      border: 2px dashed #999;
      background-color: #fafafa;
    }

    /* Base Styling for all 150x200 cards */
    .card {
      position: absolute;
      width: 150px;
      height: 200px;
      border: 2px solid #333;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      font-family: sans-serif;
      box-shadow: 4px 4px 10px rgba(0,0,0,0.3);
      user-select: none; /* Prevents text highlight during drag */
    }

    /* Card 1: Top Card (Initially z-index: 3) */
    #card1 {
      top: 50px;
      left: 50px;
      background-color: #ffadad; /* Light Red */
      z-index: 3;
    }

    /* Card 2: Middle Card (Initially z-index: 2) */
    #card2 {
      top: 80px;
      left: 90px;
      background-color: #caffbf; /* Light Green */
      z-index: 2;
    }

    /* Card 3: Bottom Card (Initially z-index: 1) */
    #card3 {
      top: 110px;
      left: 130px;
      background-color: #9bf6ff; /* Light Blue */
      z-index: 1;
    }
  </style>
</head>
<body>

  <h2>Dynamic Card Stack Manager</h2>

  <!-- CONTROL PANEL BUTTONS -->
  <div id="controls">
    <!-- Feature (a): Toggle Middle Card Visibility -->
    <button onclick="toggleMiddleCard()">Toggle Middle Card (Hide/Show)</button>

    <!-- Feature (b): Change Frontmost Card Styles -->
    <button onclick="changeTopCardColor()">Change Top Card Text Color</button>
    <button onclick="changeTopCardFontSize()">Increase Top Card Font Size</button>

    <!-- Feature (c): Change Bottom Card Content -->
    <button onclick="updateBottomCardContent()">Change Content (Set Date/Time)</button>

    <!-- Feature (e): Bring Dragged Card to Top -->
    <button onclick="bringCard1ToTop()">Bring Card 1 to Top</button>
  </div>

  <!-- STACK CONTAINER CONTAINING 3 OVERLAPPING CARDS -->
  <div id="stack-container">
    
    <!-- CARD 1 (Topmost initially, Draggable) -->
    <div id="card1" class="card">
      <h4 style="margin-top:0;">Card 1 (Top)</h4>
      <p id="card1-text">Drag me around! I am the top card.</p>
    </div>

    <!-- CARD 2 (Middle) -->
    <div id="card2" class="card">
      <h4 style="margin-top:0;">Card 2 (Middle)</h4>
      <p>I am the middle card in the stack.</p>
    </div>

    <!-- CARD 3 (Bottom) -->
    <div id="card3" class="card">
      <h4 style="margin-top:0;">Card 3 (Bottom)</h4>
      <p id="card3-content">Initial content of the bottom card.</p>
    </div>

  </div>

  <script type="text/javascript">

    // =========================================================================
    // FEATURE (a): Toggle Visibility of Middle Card (Card 2)
    // =========================================================================
    function toggleMiddleCard() {
      var card2 = document.getElementById("card2");
      // Check current visibility status
      if (card2.style.visibility === "hidden") {
        card2.style.visibility = "visible"; // Show card
      } else {
        card2.style.visibility = "hidden";  // Hide card without breaking layout
      }
    }

    // =========================================================================
    // FEATURE (b): Dynamically Change Text Color & Font Size of Frontmost Card
    // =========================================================================
    var colorToggle = false;
    function changeTopCardColor() {
      var card1 = document.getElementById("card1");
      // Toggle between Dark Blue and Dark Red text colors
      if (!colorToggle) {
        card1.style.color = "#00008b";
        colorToggle = true;
      } else {
        card1.style.color = "#8b0000";
        colorToggle = false;
      }
    }

    var currentFontSize = 14; // Base font size in px
    function changeTopCardFontSize() {
      var card1Text = document.getElementById("card1-text");
      currentFontSize += 2; // Increase font size by 2px
      if (currentFontSize > 22) currentFontSize = 14; // Reset if too large
      card1Text.style.fontSize = currentFontSize + "px";
    }

    // =========================================================================
    // FEATURE (c): Replace Bottom Card Content with Current Date & Time
    // =========================================================================
    function updateBottomCardContent() {
      var card3Content = document.getElementById("card3-content");
      var now = new Date();
      // Format current timestamp string
      var timestamp = now.toLocaleDateString() + "<br />" + now.toLocaleTimeString();
      card3Content.innerHTML = "<strong>Updated Date/Time:</strong><br />" + timestamp;
    }

    // =========================================================================
    // FEATURE (d): Drag and Drop Implementation for Topmost Card (Card 1)
    // =========================================================================
    var grabCard = document.getElementById("card1");
    var isDragging = false;
    var offsetX = 0;
    var offsetY = 0;

    // 1. MouseDown Handler: Initiate Grab
    grabCard.addEventListener("mousedown", function(e) {
      isDragging = true;
      // Calculate offset distance between cursor and top-left corner of card
      var rect = grabCard.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      grabCard.style.cursor = "grabbing";
    });

    // 2. MouseMove Handler: Move Card with Cursor
    document.addEventListener("mousemove", function(e) {
      if (isDragging) {
        var container = document.getElementById("stack-container");
        var containerRect = container.getBoundingClientRect();

        // Compute new coordinates relative to container
        var newLeft = e.clientX - containerRect.left - offsetX;
        var newTop = e.clientY - containerRect.top - offsetY;

        // Apply calculated coordinates
        grabCard.style.left = newLeft + "px";
        grabCard.style.top = newTop + "px";
      }
    });

    // 3. MouseUp Handler: Drop Card
    document.addEventListener("mouseup", function() {
      if (isDragging) {
        isDragging = false;
        grabCard.style.cursor = "pointer";
      }
    });

    // =========================================================================
    // FEATURE (e): Bring Dragged Card to Highest Z-Index (Top of Stack)
    // =========================================================================
    var highestZIndex = 3; // Initial maximum z-index
    function bringCard1ToTop() {
      highestZIndex += 1; // Increment max z-index
      var card1 = document.getElementById("card1");
      card1.style.zIndex = highestZIndex; // Assign new highest z-index
    }

  </script>
</body>
</html>
```
