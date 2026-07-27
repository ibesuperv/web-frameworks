# Additional Exam Question Solutions: Detailed Answer Keys

---

## Q3 (10 Marks) — Unit I

**Question:**
Create an Array called Browsers consisting of elements such as Chrome, IE, Firefox etc. (at least 5). Order it in alphabetical order. Write a JavaScript program to display both alphabetical order and the reversed order of elements.

Perform push, pop, splice and shift activities on the elements and display the appropriate output on the web page.

#### Solution Code (`browser_array_ops.html`):

```html
<!DOCTYPE html>
<html lang = "en">
  <head>
    <title> Browsers Array Operations </title>
    <meta charset = "utf-8" />
    <style type = "text/css">
      body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
      .box { background-color: #f9f9f9; border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
      h3 { color: #0056b3; margin-top: 0; }
      code { background: #e0e0e0; padding: 2px 5px; border-radius: 3px; font-weight: bold; }
    </style>
  </head>
  <body>
    <h2> JavaScript Array Methods Demonstration (Browsers Array) </h2>
    <div id = "output"></div>

    <script type = "text/javascript">
      // 1. Create Browsers Array with at least 5 elements
      var Browsers = ["Chrome", "IE", "Firefox", "Safari", "Opera", "Edge"];
      var outputDiv = document.getElementById("output");
      var htmlContent = "";

      // Display Initial Array
      htmlContent += "<div class='box'><h3>1. Initial Browsers Array</h3>" +
                     "<p><code>" + Browsers.join(", ") + "</code></p></div>";

      // 2. Sort in Alphabetical Order (.sort())
      Browsers.sort();
      htmlContent += "<div class='box'><h3>2. Alphabetical Order (.sort())</h3>" +
                     "<p><code>" + Browsers.join(", ") + "</code></p></div>";

      // 3. Reversed Order (.reverse())
      Browsers.reverse();
      htmlContent += "<div class='box'><h3>3. Reversed Alphabetical Order (.reverse())</h3>" +
                     "<p><code>" + Browsers.join(", ") + "</code></p></div>";

      // Re-sort to alphabetical for subsequent push/pop operations
      Browsers.sort();

      // 4. push() Activity: Add elements to the end of the array
      var pushedElement = "Brave";
      Browsers.push(pushedElement);
      htmlContent += "<div class='box'><h3>4. push('" + pushedElement + "') Activity</h3>" +
                     "<p>Added '<b>" + pushedElement + "</b>' to the end.</p>" +
                     "<p>Updated Array: <code>" + Browsers.join(", ") + "</code></p></div>";

      // 5. pop() Activity: Remove the last element from the array
      var poppedElement = Browsers.pop();
      htmlContent += "<div class='box'><h3>5. pop() Activity</h3>" +
                     "<p>Removed last element: '<b>" + poppedElement + "</b>'</p>" +
                     "<p>Updated Array: <code>" + Browsers.join(", ") + "</code></p></div>";

      // 6. shift() Activity: Remove the first element from the array
      var shiftedElement = Browsers.shift();
      htmlContent += "<div class='box'><h3>6. shift() Activity</h3>" +
                     "<p>Removed first element: '<b>" + shiftedElement + "</b>'</p>" +
                     "<p>Updated Array: <code>" + Browsers.join(", ") + "</code></p></div>";

      // 7. splice() Activity: Remove elements at index 1 and insert new elements
      // Syntax: array.splice(startIndex, deleteCount, item1, item2, ...)
      var splicedRemoved = Browsers.splice(1, 2, "Vivaldi", "Tor");
      htmlContent += "<div class='box'><h3>7. splice(1, 2, 'Vivaldi', 'Tor') Activity</h3>" +
                     "<p>Removed 2 elements starting at index 1: '<b>" + splicedRemoved.join(", ") + "</b>'</p>" +
                     "<p>Inserted 'Vivaldi' and 'Tor' at index 1.</p>" +
                     "<p>Final Array: <code>" + Browsers.join(", ") + "</code></p></div>";

      // Write output to web page
      outputDiv.innerHTML = htmlContent;
    </script>
  </body>
</html>
```

---

## Q4 (10 Marks) — Unit I

**Question:**
Write a JavaScript program to count the number of vowels in your name.

*Note: The user is prompted to enter the name. Use the concept of functions in JavaScript.*

#### Solution Code (`vowels_count.html`):

```html
<!DOCTYPE html>
<html lang = "en">
  <head>
    <title> Vowel Count in Name </title>
    <meta charset = "utf-8" />
    <script type = "text/javascript">

      // Function to count vowels in a given input string
      function countVowels(userName) {
        var vowelCount = 0;
        var vowelList = [];
        
        // Normalize string to lowercase to handle both upper and lowercase vowels
        var lowerName = userName.toLowerCase();

        // Loop through each character of the string
        for (var i = 0; i < lowerName.length; i++) {
          var ch = lowerName.charAt(i);
          
          // Check if character is a vowel (a, e, i, o, u)
          if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
            vowelCount++;
            vowelList.push(userName.charAt(i)); // Store original case character
          }
        }

        // Return result object containing total count and matched vowels array
        return {
          count: vowelCount,
          vowels: vowelList
        };
      }

      // Main function to trigger prompt and display results
      function processName() {
        // Prompt user for input name
        var inputName = prompt("Please enter your name:", "Robert Sebesta");

        // Handle case where user cancels prompt or inputs empty string
        if (inputName === null || inputName.trim() === "") {
          alert("No name entered!");
          return;
        }

        // Call the counting function
        var result = countVowels(inputName);

        // Build result message
        var message = "Name Entered: " + inputName + "\n" +
                      "Total Number of Vowels: " + result.count + "\n" +
                      "Vowels Found: " + (result.count > 0 ? result.vowels.join(", ") : "None");

        // Display output via alert and on document
        alert(message);

        document.getElementById("res").innerHTML = 
          "<h3>Name Vowel Analysis Results:</h3>" +
          "<p><strong>Original Name:</strong> " + inputName + "</p>" +
          "<p><strong>Total Vowel Count:</strong> " + result.count + "</p>" +
          "<p><strong>List of Vowels:</strong> " + (result.count > 0 ? result.vowels.join(", ") : "None") + "</p>";
      }

    </script>
  </head>
  <body onload = "processName();">
    <h2> Vowel Counter Tool </h2>
    <div id = "res"></div>
    <br />
    <button onclick = "processName();"> Count Vowels Again </button>
  </body>
</html>
```

---

## Q5(a) (4 Marks) — Unit II

**Question:**
Create a web page with the form elements namely textbox and button. When the button is clicked, display some text in textbox. The text should get locked when it is on focus. Write the JavaScript code for the same.

#### Solution Code (`lock_textbox.html`):

```html
<!DOCTYPE html>
<html lang = "en">
  <head>
    <title> Lock Textbox on Focus </title>
    <meta charset = "utf-8" />
    <script type = "text/javascript">

      // Handler to populate text into the textbox
      function populateText() {
        var txtBox = document.getElementById("myText");
        txtBox.value = "CONFIDENTIAL_ORDER_TOTAL_$999";
      }

      // Handler to force blur when textbox acquires focus (locking text)
      function lockFocus(element) {
        // Force element to lose focus immediately
        element.blur();
      }

    </script>
  </head>
  <body>
    <h3> Dynamic Textbox Lock Demonstration </h3>
    <form action = "">
      <p>
        <!-- Button to trigger display of text -->
        <input type = "button" value = "Display & Lock Text" onclick = "populateText();" />
        <br /><br />
        <label>
          Locked Result Field:
          <!-- onfocus="this.blur()" prevents editing by stripping focus immediately -->
          <input type = "text" id = "myText" size = "35" onfocus = "lockFocus(this);" placeholder = "Click button to populate..." />
        </label>
      </p>
    </form>
  </body>
</html>
```

---

## Q5(b) (6 Marks) — Unit II

**Question:**
Write an XHTML document to create GUI which displays a form containing text elements to input register number, sub-code, marks in three tests and a button element. Also write JavaScript code to compute average marks on click of button and display the message using alert.

#### Solution Code (`marks_average.html`):

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns = "http://www.w3.org/1999/xhtml" lang = "en" xml:lang = "en">
  <head>
    <title> Student Test Marks Average Calculator </title>
    <meta http-equiv = "Content-Type" content = "text/html; charset=utf-8" />
    <style type = "text/css">
      body { font-family: Arial, sans-serif; margin: 30px; }
      .form-container { width: 400px; padding: 20px; border: 2px solid #0056b3; border-radius: 8px; background-color: #f9f9f9; }
      label { display: inline-block; width: 150px; margin-bottom: 10px; font-weight: bold; }
      input[type="text"] { width: 180px; padding: 4px; }
      .btn { margin-top: 15px; padding: 8px 15px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; }
    </style>
    <script type = "text/javascript">
      //<![CDATA[

      function computeAverage() {
        // 1. Get DOM element references
        var regNo = document.getElementById("regNo").value;
        var subCode = document.getElementById("subCode").value;
        var t1Str = document.getElementById("test1").value;
        var t2Str = document.getElementById("test2").value;
        var t3Str = document.getElementById("test3").value;

        // 2. Validate empty inputs
        if (regNo === "" || subCode === "" || t1Str === "" || t2Str === "" || t3Str === "") {
          alert("Error: All fields (Register No, Sub-Code, and Test Marks) are mandatory!");
          return;
        }

        // 3. Parse mark values to floating point numbers
        var test1 = parseFloat(t1Str);
        var test2 = parseFloat(t2Str);
        var test3 = parseFloat(t3Str);

        // 4. Validate numeric input range (0 - 100)
        if (isNaN(test1) || isNaN(test2) || isNaN(test3)) {
          alert("Error: Test marks must be valid numbers!");
          return;
        }

        if (test1 < 0 || test1 > 100 || test2 < 0 || test2 > 100 || test3 < 0 || test3 > 100) {
          alert("Error: Test marks must be between 0 and 100.");
          return;
        }

        // 5. Compute average
        var average = (test1 + test2 + test3) / 3.0;

        // 6. Format average to 2 decimal places and display alert message
        var message = "--- STUDENT MARKS REPORT ---\n\n" +
                      "Register Number: " + regNo + "\n" +
                      "Subject Code: " + subCode + "\n" +
                      "Test 1 Marks: " + test1 + "\n" +
                      "Test 2 Marks: " + test2 + "\n" +
                      "Test 3 Marks: " + test3 + "\n" +
                      "----------------------------\n" +
                      "Average Marks: " + average.toFixed(2);

        alert(message);
      }

      //]]>
    </script>
  </head>
  <body>
    <div class = "form-container">
      <h3> Student Marks Average Form </h3>
      <form action = "">
        <p>
          <label for = "regNo"> Register Number: </label>
          <input type = "text" id = "regNo" />
          <br />
          <label for = "subCode"> Subject Code: </label>
          <input type = "text" id = "subCode" />
          <br />
          <label for = "test1"> Test 1 Marks: </label>
          <input type = "text" id = "test1" size = "5" />
          <br />
          <label for = "test2"> Test 2 Marks: </label>
          <input type = "text" id = "test2" size = "5" />
          <br />
          <label for = "test3"> Test 3 Marks: </label>
          <input type = "text" id = "test3" size = "5" />
          <br />
          <input type = "button" class = "btn" value = "Compute Average" onclick = "computeAverage();" />
        </p>
      </form>
    </div>
  </body>
</html>
```
