# Unit 1 Exam Question Solutions: Detailed Answer Keys

---

## PART A (Short Answer Questions — 2 Marks Each)

### Q1 (2 Marks) — Unit I
**Question:**
Find the output of the following JavaScript code.

```html
<body><script type="text/javascript">
function display()
{
    var c = 50+20+"welcome";
    var d = "welcome"+50+20;
    document.write(c);
    document.write(d);
}
display();
</script></body>
```

#### Detailed Execution Step-by-Step:
1. **Evaluation of `c = 50 + 20 + "welcome"`**:
   - Operator evaluation proceeds **left-to-right**.
   - `50 + 20` involves two numeric primitives $\rightarrow$ arithmetic addition results in `70`.
   - `70 + "welcome"` involves a number and a string $\rightarrow$ implicit string coercion converts `70` to `"70"`.
   - Resulting string concatenation: `"70welcome"`.

2. **Evaluation of `d = "welcome" + 50 + 20`**:
   - Operator evaluation proceeds **left-to-right**.
   - `"welcome" + 50` involves a string and a number $\rightarrow$ implicit string coercion converts `50` to `"50"`. Concatenation yields `"welcome50"`.
   - `"welcome50" + 20` involves a string and a number $\rightarrow$ implicit string coercion converts `20` to `"20"`. Concatenation yields `"welcome5020"`.

3. **Output rendered by `document.write()`**:
   - `document.write(c)` prints `70welcome`.
   - `document.write(d)` immediately appends `welcome5020`.

#### **Final Output:**
```text
70welcomewelcome5020
```

---

### Q2 (2 Marks) — Unit I
**Question:**
What is the output of the following script?

```html
<script type="text/javascript">

var st="44.89754";
var s="kphhhhhhp";

var j=s.match(/kph{5}/);
var i=st.match(/\d.\d\d/);

document.write(i);
document.write(j);

</script>
```

#### Detailed Execution Step-by-Step:
1. **Evaluation of `i = st.match(/\d.\d\d/)`**:
   - String `st` = `"44.89754"`.
   - Regex pattern `/\d.\d\d/`:
     - `\d`: Matches any single digit (`4`).
     - `.`: Matches any single character except newline (matches decimal point `.`).
     - `\d\d`: Matches two consecutive digits (`89`).
   - First matching substring in `"44.89754"` is `"4.89"`.
   - `st.match(/\d.\d\d/)` returns an array containing `["4.89"]`.
   - `document.write(i)` implicitly converts array `["4.89"]` to string `"4.89"`.

2. **Evaluation of `j = s.match(/kph{5}/)`**:
   - String `s` = `"kphhhhhhp"`.
   - Regex pattern `/kph{5}/`:
     - `k`: Matches literal `'k'`.
     - `p`: Matches literal `'p'`.
     - `h{5}`: Quantifier `{5}` applies **only to the preceding character `h`**, requiring exactly 5 consecutive `'h'` characters (`hhhhh`).
   - Target substring in `"kphhhhhhp"` has 6 `'h'`s (`kphhhhhh`). The pattern matches `'k'`, `'p'`, and the first 5 `'h'`s $\rightarrow$ `"kphhhhh"`.
   - `s.match(/kph{5}/)` returns `["kphhhhh"]`.
   - `document.write(j)` implicitly converts array `["kphhhhh"]` to string `"kphhhhh"`.

3. **Output rendered by `document.write()`**:
   - Concatenated output of `i` followed immediately by `j`.

#### **Final Output:**
```text
4.89kphhhhh
```

---

### Q3 (2 Marks) — Unit I
**Question:**
Find the output of the following JavaScript code.

```html
<script type="text/javascript">

var str1="scripting language";

var i2=str1.search(/^scri/);

if(!i2)
{
    document.write("Found");
}
else
{
    document.write("NotFound");
}

</script>
```

#### Detailed Execution Step-by-Step:
1. **Evaluation of `str1.search(/^scri/)`**:
   - `str1` = `"scripting language"`.
   - Regex `/^scri/`: `^` anchors match to the start of the string, checking if it begins with `"scri"`.
   - String `"scripting language"` begins with `"scri"`.
   - String method `.search()` returns the **zero-based index position** of the match.
   - Match occurs at index `0`. Therefore, `i2 = 0`.

2. **Evaluation of Condition `if (!i2)`**:
   - `i2` holds the primitive number `0`.
   - In JavaScript, `0` is **falsy**.
   - Logical NOT operator `!0` negates falsy to **`true`**.
   - Since `!i2` evaluates to `true`, the `if` block executes.

3. **Output rendered by `document.write()`**:
   - `"Found"` is written to the document.

#### **Final Output:**
```text
Found
```

---

### Q4 (2 Marks) — Unit I
**Question:**
How will you create and delete an Array in JavaScript.

#### Answer:

1. **Creating an Array**:
   Arrays in JavaScript can be created using two primary syntaxes:
   - **Array Literal Notation (Preferred)**:
     ```javascript
     var fruits = ["Apple", "Banana", "Orange"];
     ```
   - **Array Constructor**:
     ```javascript
     var numbers = new Array(10, 20, 30);
     ```

2. **Deleting / Clearing an Array**:
   - **Deleting Specific Elements (`delete` operator)**: Deletes the element value at a specified index but leaves an `undefined` hole (sparse array).
     ```javascript
     delete fruits[1]; // Index 1 becomes undefined, length remains unchanged
     ```
   - **Removing Elements & Truncating (Splice method)**: Completely removes elements and re-indexes.
     ```javascript
     fruits.splice(1, 1); // Removes 1 element at index 1
     ```
   - **Clearing / Destroying Entire Array**: Set `.length` to `0` or reassign to `null`/`[]`.
     ```javascript
     fruits.length = 0; // Truncates and clears all elements instantly
     ```

---

### Q5 (2 Marks) — Unit I
**Question:**
List out the methods (Any 4) of the String object in JavaScript.

#### Answer:

1. **`charAt(index)`**: Returns the character at the specified index position.
   ```javascript
   "Hello".charAt(1); // Returns "e"
   ```
2. **`search(regexp)`**: Searches a string for a match against a regular expression and returns the zero-based index of the match (or `-1` if not found).
   ```javascript
   "JavaScript".search(/Script/); // Returns 4
   ```
3. **`replace(regexp|substr, newSubstr)`**: Searches a string for a specified value or regex match and returns a new string with the matched substring replaced.
   ```javascript
   "Web Tech".replace("Tech", "Frameworks"); // Returns "Web Frameworks"
   ```
4. **`split(separator)`**: Splits a String object into an array of substrings based on a specified separator string or pattern.
   ```javascript
   "a,b,c".split(","); // Returns ["a", "b", "c"]
   ```

---

## PART B (Long Answer Questions)

### Q1(a) (6 Marks) — Unit I
**Question:**
Create an XHTML document to display the day of the month using the method of the Date object using JavaScript code.

#### Solution Code (`day_of_month.html`):

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns = "http://www.w3.org/1999/xhtml" lang = "en" xml:lang = "en">
  <head>
    <title> XHTML Date Object Day of Month </title>
    <meta http-equiv = "Content-Type" content = "text/html; charset=utf-8" />
    <style type = "text/css">
      body {
        font-family: Arial, sans-serif;
        margin: 30px;
        background-color: #f4f4f4;
      }
      .date-card {
        background-color: #ffffff;
        border: 2px solid #333333;
        padding: 20px;
        width: 350px;
        border-radius: 8px;
      }
      h2 {
        color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class = "date-card">
      <h2> Current Date Details </h2>
      <script type = "text/javascript">
        //<![CDATA[
        // Instantiate Date object representing current timestamp
        var today = new Date();

        // Extract day of the month (1-31) using getDate() method
        var dayOfMonth = today.getDate();

        // Extract month (0-11) and add 1 for human readable representation
        var month = today.getMonth() + 1;

        // Extract 4-digit year using getFullYear()
        var year = today.getFullYear();

        // Display the day of the month
        document.write("<p><strong>Day of the Month (getDate()):</strong> " + dayOfMonth + "</p>");
        document.write("<p><strong>Full Formatted Date:</strong> " + dayOfMonth + "/" + month + "/" + year + "</p>");
        //]]>
      </script>
    </div>
  </body>
</html>
```

#### Technical Explanation:
- **`new Date()`**: Instantiates a new date object representing the current browser clock time.
- **`getDate()` Method**: Retrieves the day of the month as a 1-based numeric primitive integer ($1 \le \text{day} \le 31$).
- **XHTML Strict Compliance**: Uses standard `xmlns` declaration, lowercase tags, closed tags (`<meta />`), and nested script CDATA block (`//<![CDATA[ ... //]]>`) to preserve markup validity.

---

### Q1(b) (4 Marks) — Unit I
**Question:**
Define Constructors in JavaScript. Write a program to create a Employee object with the properties namely EmpName, EmpNo, EmpAge & EmpSal and initialize the values for data properties. Display the details of Employee object by initializing the display method.

#### Definition of Constructor:
In JavaScript, a **Constructor** is a standard function designed to be instantiated using the `new` operator. It acts as a blueprint for creating multiple object instances with identical property keys and methods. Inside a constructor function, the `this` keyword refers to the freshly allocated object instance being created.

#### Solution Code (`employee_constructor.js` / `employee.html`):

```html
<!DOCTYPE html>
<html lang = "en">
  <head>
    <title> Employee Object Constructor Demo </title>
    <meta charset = "utf-8" />
    <script type = "text/javascript">

      // 1. Define the Employee Constructor Function
      function Employee(EmpName, EmpNo, EmpAge, EmpSal) {
        // Initialize data properties on the new instance
        this.EmpName = EmpName;
        this.EmpNo = EmpNo;
        this.EmpAge = EmpAge;
        this.EmpSal = EmpSal;

        // Initialize and bind the display method
        this.display = function() {
          document.write("<h3>Employee Details:</h3>");
          document.write("<p><strong>Employee Number:</strong> " + this.EmpNo + "</p>");
          document.write("<p><strong>Employee Name:</strong> " + this.EmpName + "</p>");
          document.write("<p><strong>Employee Age:</strong> " + this.EmpAge + " years</p>");
          document.write("<p><strong>Employee Salary:</strong> $" + this.EmpSal + "</p>");
          document.write("<hr />");
        };
      }

      // 2. Main execution script
      function runDemo() {
        // Instantiate Employee object using 'new' keyword
        var emp1 = new Employee("Robert Sebesta", 1001, 35, 75000);
        var emp2 = new Employee("Alice Smith", 1002, 29, 68000);

        // Invoke the display method
        emp1.display();
        emp2.display();
      }

    </script>
  </head>
  <body onload = "runDemo();">
  </body>
</html>
```

---

### Q2 (10 Marks) — Unit I
**Question:**
Write a JavaScript code to validate the name by considering the details given below:
1. The name should be entered using prompt.
2. The first name and last name should not be more than 20 characters and middle name must be an initial single letter.
3. Display the message about the validation or invalidation of corresponding name.
4. The name should be entered in following format:
   `First_Name Middle_initial Last_name`
   *(There should be single white space between First Name, Middle initial and Last Name).*

#### Comprehensive Solution Code & Logic (`name_validation.html`):

```html
<!DOCTYPE html>
<html lang = "en">
  <head>
    <title> Prompt Name Validation </title>
    <meta charset = "utf-8" />
    <script type = "text/javascript">

      function validatePromptName() {
        // Step 1: Prompt user for name input
        var rawName = prompt("Enter your full name in the format:\nFirst_Name Middle_initial Last_name\n(Example: John A Smith)", "");

        // Handle null input (if user clicks Cancel)
        if (rawName === null) {
          alert("Validation Canceled: No input provided.");
          return;
        }

        // Step 2: Split the string by single space delimiter
        var nameParts = rawName.split(" ");

        // Step 3: Check if input contains exactly 3 parts (First Name, Middle Initial, Last Name)
        if (nameParts.length !== 3) {
          alert("Invalid Input: Name must contain exactly 3 parts separated by a single space.\n" +
                "Format: First_Name Middle_initial Last_name");
          return;
        }

        var firstName = nameParts[0];
        var middleInitial = nameParts[1];
        var lastName = nameParts[2];

        // Step 4: Validate Length Restrictions
        // - First name max 20 chars
        // - Last name max 20 chars
        // - Middle initial must be exactly 1 char
        if (firstName.length > 20) {
          alert("Invalid Name: First Name ('" + firstName + "') exceeds 20 characters limit (Current: " + firstName.length + ").");
          return;
        }

        if (lastName.length > 20) {
          alert("Invalid Name: Last Name ('" + lastName + "') exceeds 20 characters limit (Current: " + lastName.length + ").");
          return;
        }

        if (middleInitial.length !== 1) {
          alert("Invalid Name: Middle Initial ('" + middleInitial + "') must be a single letter (Current length: " + middleInitial.length + ").");
          return;
        }

        // Step 5: Validate Character Formats using Regular Expressions
        // Alphabetic checks for First and Last names
        var alphaRegex = /^[A-Za-z]+$/;
        
        if (!alphaRegex.test(firstName)) {
          alert("Invalid Name: First Name ('" + firstName + "') must contain only alphabetic characters.");
          return;
        }

        if (!alphaRegex.test(middleInitial)) {
          alert("Invalid Name: Middle Initial ('" + middleInitial + "') must be an alphabetic letter.");
          return;
        }

        if (!alphaRegex.test(lastName)) {
          alert("Invalid Name: Last Name ('" + lastName + "') must contain only alphabetic characters.");
          return;
        }

        // Step 6: If all checks pass successfully
        alert("Validation Successful!\n\n" +
              "Entered Name Details:\n" +
              "First Name: " + firstName + " (" + firstName.length + " chars)\n" +
              "Middle Initial: " + middleInitial + "\n" +
              "Last Name: " + lastName + " (" + lastName.length + " chars)");
      }

    </script>
  </head>
  <body onload = "validatePromptName();">
    <h2> Name Validation Result </h2>
    <p> Refresh the page to re-trigger the validation prompt. </p>
  </body>
</html>
```

#### Alternative Single-Regex Solution (Complete Academic Standard):
```javascript
function validateNameWithRegex() {
  var input = prompt("Enter Name (First_Name M Last_Name):");
  if (!input) return;

  // Single anchor-bounded regular expression:
  // ^[A-Za-z]{1,20}  -> First name 1-20 letters
  // \s               -> Single white space
  // [A-Za-z]         -> Middle initial single letter
  // \s               -> Single white space
  // [A-Za-z]{1,20}$  -> Last name 1-20 letters
  var pattern = /^[A-Za-z]{1,20}\s[A-Za-z]\s[A-Za-z]{1,20}$/;

  if (pattern.test(input)) {
    alert("Validation Successful: " + input);
  } else {
    alert("Invalid Name Format! Ensure First & Last names are <= 20 chars, Middle initial is 1 letter, separated by single spaces.");
  }
}
```
