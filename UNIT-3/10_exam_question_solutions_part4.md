# Web Technologies Exam Solutions: Unit III (Q4, Q5, and Q6)

---

## Q4 (10 Marks) — Unit III
### Online Student Registration and Login System using PHP

#### Question:
> **Develop a PHP-based web application for an online student registration system. The application should perform the following operations:**
> 1. Accept student details through an HTML form.
> 2. Validate user inputs using PHP form handling techniques.
> 3. Store multiple student subjects and marks using arrays.
> 4. Use control statements to calculate grade and display results.
> 5. Create user-defined functions to compute total and average marks.
> 6. Use pattern matching techniques to validate email and phone number formats.
> 7. Implement cookies to remember the username for future visits.
> 8. Use session tracking to maintain user login status until logout.
>
> **Write the complete PHP program and explain the use of arrays, functions, form handling, cookies, and sessions in the application.**

---

### Complete PHP Code (`student_registration.php`):

```php
<?php
// =========================================================================
// 1. COOKIE & SESSION INITIALIZATION (MUST BE BEFORE ANY HTML OUTPUT)
// =========================================================================
// Session tracking to maintain login state across requests
session_start();

// Process Cookie: Check if a remembered username cookie exists
$remembered_user = isset($_COOKIE["remember_username"]) ? $_COOKIE["remember_username"] : "";

// Process Logout Request
if (isset($_GET['action']) && $_GET['action'] == 'logout') {
    unset($_SESSION['logged_in']);
    unset($_SESSION['student_data']);
    session_destroy();
    header("Location: student_registration.php");
    exit();
}

// Global variables for validation errors and success messages
$errors = array();
$student_data = null;

// =========================================================================
// 2. USER-DEFINED FUNCTIONS
// =========================================================================

/**
 * Calculates total marks from an associative array of subjects and marks.
 * @param array $marks_assoc Associative array of [subject => mark]
 * @return float Total marks sum
 */
function compute_total_marks($marks_assoc) {
    $total = 0;
    foreach ($marks_assoc as $subject => $mark) {
        $total += $mark;
    }
    return $total;
}

/**
 * Calculates average marks given total marks and subject count.
 * @param float $total
 * @param int $count
 * @return float Average mark rounded to 2 decimal places
 */
function compute_average_marks($total, $count) {
    return ($count > 0) ? round($total / $count, 2) : 0;
}

/**
 * Determines final letter grade based on average percentage using control statements.
 * @param float $average
 * @return string Grade letter
 */
function calculate_grade($average) {
    if ($average >= 90) return "A+ (Excellent)";
    elseif ($average >= 80) return "A (Very Good)";
    elseif ($average >= 70) return "B (Good)";
    elseif ($average >= 60) return "C (Satisfactory)";
    elseif ($average >= 50) return "D (Pass)";
    else return "F (Fail)";
}

// =========================================================================
// 3. FORM PROCESSING & PATTERN MATCHING VALIDATION
// =========================================================================
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Extract inputs from $_POST superglobal array
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $phone = trim($_POST["phone"]);
    $remember = isset($_POST["remember_me"]) ? true : false;

    // Collect subject marks into an associative array
    $marks = array(
        "Web Technologies" => isset($_POST["mark_wt"]) ? floatval($_POST["mark_wt"]) : 0,
        "Database Systems" => isset($_POST["mark_dbms"]) ? floatval($_POST["mark_dbms"]) : 0,
        "Computer Networks" => isset($_POST["mark_cn"]) ? floatval($_POST["mark_cn"]) : 0
    );

    // --- INPUT VALIDATIONS ---
    if (empty($username)) {
        $errors[] = "Username is required.";
    }

    // Pattern Matching Validation for Email (PCRE preg_match)
    $email_pattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
    if (empty($email)) {
        $errors[] = "Email address is required.";
    } elseif (!preg_match($email_pattern, $email)) {
        $errors[] = "Invalid Email format. Example: student@university.edu";
    }

    // Pattern Matching Validation for Phone Number (10-digit numeric pattern)
    $phone_pattern = "/^[0-9]{10}$/";
    if (empty($phone)) {
        $errors[] = "Phone number is required.";
    } elseif (!preg_match($phone_pattern, $phone)) {
        $errors[] = "Invalid Phone format. Must be exactly 10 digits (e.g. 9876543210).";
    }

    // Process Cookie Setting
    if ($remember && !empty($username)) {
        // Set cookie for 7 days (86400 * 7 seconds)
        setcookie("remember_username", $username, time() + (86400 * 7));
    } else {
        // Unset cookie by setting past timestamp
        setcookie("remember_username", "", time() - 3600);
    }

    // --- SUCCESS PROCESSING ---
    if (count($errors) == 0) {
        // Calculate total, average, grade
        $total = compute_total_marks($marks);
        $avg = compute_average_marks($total, count($marks));
        $grade = calculate_grade($avg);

        // Store student result data in array
        $student_data = array(
            "username" => $username,
            "email" => $email,
            "phone" => $phone,
            "marks" => $marks,
            "total" => $total,
            "average" => $avg,
            "grade" => $grade
        );

        // Register session variables for persistent login status
        $_SESSION['logged_in'] = true;
        $_SESSION['student_data'] = $student_data;
    }
}

// Restore session data if already logged in
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    $student_data = $_SESSION['student_data'];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Student Registration & Results Portal</title>
  <style type="text/css">
    body { font-family: Arial, sans-serif; background-color: #f4f6f9; margin: 20px; }
    .container { width: 600px; margin: auto; background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; }
    .error-box { background: #f8d7da; color: #721c24; padding: 12px; border-radius: 5px; margin-bottom: 15px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: bold; margin-bottom: 5px; }
    input[type="text"], input[type="email"], input[type="number"] { width: 95%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    .btn { background: #3498db; color: #fff; padding: 10px 18px; border: none; border-radius: 4px; cursor: pointer; font-size: 15px; }
    .btn-danger { background: #e74c3c; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #3498db; color: white; }
  </style>
</head>
<body>

<div class="container">

  <?php if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true && $student_data != null): ?>
    
    <!-- ========================================================================= -->
    <!-- LOGGED IN STUDENT DASHBOARD (SESSION ACTIVE) -->
    <!-- ========================================================================= -->
    <h2>Welcome, <?php echo htmlspecialchars($student_data['username']); ?>! [Session Active]</h2>
    <p><strong>Email:</strong> <?php echo htmlspecialchars($student_data['email']); ?></p>
    <p><strong>Phone:</strong> <?php echo htmlspecialchars($student_data['phone']); ?></p>

    <h3>Subject Marks Breakdown</h3>
    <table>
      <tr><th>Subject Name</th><th>Marks Obtained</th></tr>
      <?php foreach ($student_data['marks'] as $sub => $score): ?>
        <tr><td><?php echo $sub; ?></td><td><?php echo $score; ?> / 100</td></tr>
      <?php endforeach; ?>
      <tr><strong><th>Total Marks</th><th><?php echo $student_data['total']; ?> / 300</th></strong></tr>
      <tr><strong><th>Average Percentage</th><th><?php echo $student_data['average']; ?>%</th></strong></tr>
      <tr><strong><th>Final Grade</th><th><?php echo $student_data['grade']; ?></th></strong></tr>
    </table>

    <br />
    <a href="student_registration.php?action=logout" class="btn btn-danger" style="text-decoration:none;">Logout (Destroy Session)</a>

  <?php else: ?>

    <!-- ========================================================================= -->
    <!-- STUDENT REGISTRATION FORM -->
    <!-- ========================================================================= -->
    <h2>Student Registration Form</h2>

    <?php if (count($errors) > 0): ?>
      <div class="error-box">
        <strong>Registration Errors:</strong>
        <ul>
          <?php foreach ($errors as $err): ?>
            <li><?php echo $err; ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <form action="student_registration.php" method="post">
      <div class="form-group">
        <label>Student Full Name / Username:</label>
        <input type="text" name="username" value="<?php echo htmlspecialchars($remembered_user); ?>" required />
      </div>

      <div class="form-group">
        <label>Email Address:</label>
        <input type="email" name="email" required placeholder="user@domain.com" />
      </div>

      <div class="form-group">
        <label>Phone Number (10 Digits):</label>
        <input type="text" name="phone" required placeholder="9876543210" />
      </div>

      <h3>Enter Subject Marks (0 - 100)</h3>
      <div class="form-group">
        <label>Web Technologies:</label>
        <input type="number" name="mark_wt" min="0" max="100" required />
      </div>
      <div class="form-group">
        <label>Database Systems:</label>
        <input type="number" name="mark_dbms" min="0" max="100" required />
      </div>
      <div class="form-group">
        <label>Computer Networks:</label>
        <input type="number" name="mark_cn" min="0" max="100" required />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" name="remember_me" <?php echo !empty($remembered_user) ? 'checked' : ''; ?> /> 
          Remember Username via Cookie
        </label>
      </div>

      <button type="submit" class="btn">Register & Compute Grade</button>
    </form>

  <?php endif; ?>

</div>

</body>
</html>
```

---

### Conceptual Explanation for Q4:

1. **Form Handling (`$_POST`)**:
   - The HTML form sends user inputs securely using `method="post"`.
   - On submission, PHP extracts form fields via the `$_POST` superglobal array (e.g. `$_POST["username"]`, `$_POST["email"]`).
2. **Pattern Matching (`preg_match`)**:
   - `preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email)` checks that the email contains valid username, `@`, domain, and TLD formats.
   - `preg_match("/^[0-9]{10}$/", $phone)` enforces an exact 10-digit numeric format.
3. **Arrays (Associative)**:
   - Subject marks are stored in an associative array `$marks = array("Web Technologies" => score, ...)`, allowing key-value iteration using `foreach`.
4. **User-Defined Functions & Control Statements**:
   - `compute_total_marks()` iterates through marks to return the sum.
   - `compute_average_marks()` calculates average percentage.
   - `calculate_grade()` uses `if-elseif-else` conditional branching to assign letter grades (`A+` to `F`).
5. **Cookies (`setcookie`)**:
   - If the "Remember Username" checkbox is selected, `setcookie("remember_username", $username, time() + 604800)` saves the name on the browser host machine for 7 days.
6. **Session Tracking (`session_start` / `$_SESSION`)**:
   - `session_start()` initializes a session on the server. Upon successful registration, `$_SESSION['logged_in'] = true` and `$_SESSION['student_data']` keep the user logged in across page reloads until clicking Logout (`session_destroy()`).

---

---

## Q5 (10 Marks) — Unit III
### PHP-Based Online Shopping Cart Application

#### Question:
> **Design and implement a simple online shopping cart system using PHP. The application should support the following features:**
> 1. Display a list of products using PHP arrays.
> 2. Allow users to add products to the shopping cart through forms.
> 3. Use PHP expressions and operators to calculate total bill amount and discounts.
> 4. Apply control statements to categorize customers based on purchase amount.
> 5. Create reusable PHP functions for bill generation and tax calculation.
> 6. Validate product coupon codes using pattern matching functions.
> 7. Use cookies to store customer preferences such as selected theme or language.
> 8. Use session variables to maintain cart information across multiple pages.
>
> **Write the PHP code for the above application and explain how PHP supports dynamic web application development through sessions, cookies, and form processing.**

---

### Complete PHP Code (`shopping_cart.php`):

```php
<?php
// 1. START SESSION & COOKIE MANAGEMENT
session_start();

// Theme Cookie Handling (Default to 'light')
if (isset($_POST['set_theme'])) {
    $theme = $_POST['theme'];
    setcookie("user_theme", $theme, time() + (86400 * 30)); // 30 days
    $_COOKIE['user_theme'] = $theme; // Immediate runtime update
}
$current_theme = isset($_COOKIE['user_theme']) ? $_COOKIE['user_theme'] : 'light';

// Initialize Cart in Session array if empty
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

// =========================================================================
// 2. PRODUCT CATALOG ARRAY (Multidimensional Associative Array)
// =========================================================================
$products = array(
    101 => array("name" => "Wireless Headphones", "price" => 150.00, "category" => "Electronics"),
    102 => array("name" => "Mechanical Keyboard", "price" => 100.00, "category" => "Electronics"),
    103 => array("name" => "Ergonomic Chair", "price" => 250.00, "category" => "Furniture"),
    104 => array("name" => "Stainless Water Bottle", "price" => 25.00, "category" => "Accessories")
);

// =========================================================================
// 3. CART ACTIONS & FORM PROCESSING
// =========================================================================

// Add Item to Cart
if (isset($_POST['action']) && $_POST['action'] == 'add') {
    $p_id = intval($_POST['product_id']);
    $qty = intval($_POST['quantity']);

    if (isset($products[$p_id]) && $qty > 0) {
        if (isset($_SESSION['cart'][$p_id])) {
            $_SESSION['cart'][$p_id] += $qty;
        } else {
            $_SESSION['cart'][$p_id] = $qty;
        }
    }
}

// Clear Cart
if (isset($_POST['action']) && $_POST['action'] == 'clear') {
    $_SESSION['cart'] = array();
    unset($_SESSION['coupon']);
}

// Coupon Code Pattern Matching Validation
$coupon_error = "";
$discount_rate = 0;
if (isset($_POST['apply_coupon'])) {
    $coupon_code = trim($_POST['coupon_code']);
    // Pattern matching: MUST follow pattern "SAVE10" or "SAVE20"
    if (preg_match("/^SAVE(10|20)$/i", $coupon_code, $matches)) {
        $discount_pct = intval($matches[1]);
        $_SESSION['coupon'] = array("code" => strtoupper($coupon_code), "rate" => $discount_pct / 100);
    } else {
        $coupon_error = "Invalid Coupon Code! Try 'SAVE10' or 'SAVE20'.";
    }
}

if (isset($_SESSION['coupon'])) {
    $discount_rate = $_SESSION['coupon']['rate'];
}

// =========================================================================
// 4. REUSABLE FUNCTIONS
// =========================================================================

/**
 * Computes Tax (18% GST).
 */
function calculate_tax($subtotal) {
    return $subtotal * 0.18;
}

/**
 * Categorizes customer tier using control statements based on subtotal.
 */
function categorize_customer($subtotal) {
    if ($subtotal >= 500) return "VIP Gold Customer (Eligible for Free Express Shipping)";
    elseif ($subtotal >= 200) return "Silver Customer (Eligible for Standard Discount)";
    else return "Regular Customer";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Online Shopping Cart Application</title>
  <style type="text/css">
    body.light { background-color: #f9f9f9; color: #333; font-family: Arial, sans-serif; }
    body.dark { background-color: #222; color: #fff; font-family: Arial, sans-serif; }
    .container { width: 800px; margin: 20px auto; padding: 20px; background: rgba(128,128,128,0.1); border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th, td { border: 1px solid #777; padding: 10px; text-align: left; }
    .btn { padding: 6px 12px; background: #27ae60; color: white; border: none; cursor: pointer; border-radius: 4px; }
    .btn-danger { background: #c0392b; }
    .badge { padding: 5px 10px; background: #e67e22; color: white; border-radius: 4px; font-weight: bold; }
  </style>
</head>
<body class="<?php echo $current_theme; ?>">

<div class="container">
  <h2>Shopping Cart Portal</h2>

  <!-- Theme Preference Form (Cookie Test) -->
  <form method="post" style="float: right;">
    <label>Theme Preference (Cookie): </label>
    <select name="theme">
      <option value="light" <?php if($current_theme=='light') echo 'selected'; ?>>Light Theme</option>
      <option value="dark" <?php if($current_theme=='dark') echo 'selected'; ?>>Dark Theme</option>
    </select>
    <button type="submit" name="set_theme" class="btn">Save Preference</button>
  </form>
  <div style="clear: both;"></div>

  <h3>Available Products</h3>
  <table>
    <tr><th>ID</th><th>Product Name</th><th>Category</th><th>Price</th><th>Action</th></tr>
    <?php foreach ($products as $id => $p): ?>
      <tr>
        <td><?php echo $id; ?></td>
        <td><?php echo $p['name']; ?></td>
        <td><?php echo $p['category']; ?></td>
        <td>$<?php echo number_format($p['price'], 2); ?></td>
        <td>
          <form method="post">
            <input type="hidden" name="action" value="add" />
            <input type="hidden" name="product_id" value="<?php echo $id; ?>" />
            <input type="number" name="quantity" value="1" min="1" style="width: 40px;" />
            <button type="submit" class="btn">Add to Cart</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
  </table>

  <h3>Your Shopping Cart (Session Active)</h3>
  <?php if (count($_SESSION['cart']) == 0): ?>
    <p>Your shopping cart is empty.</p>
  <?php else: ?>
    <table>
      <tr><th>Product Name</th><th>Unit Price</th><th>Quantity</th><th>Item Total</th></tr>
      <?php 
        $subtotal = 0;
        foreach ($_SESSION['cart'] as $id => $qty):
          $item_total = $products[$id]['price'] * $qty;
          $subtotal += $item_total;
      ?>
        <tr>
          <td><?php echo $products[$id]['name']; ?></td>
          <td>$<?php echo number_format($products[$id]['price'], 2); ?></td>
          <td><?php echo $qty; ?></td>
          <td>$<?php echo number_format($item_total, 2); ?></td>
        </tr>
      <?php endforeach; ?>
    </table>

    <!-- Coupon Form -->
    <form method="post">
      <label>Coupon Code (Try 'SAVE10' or 'SAVE20'): </label>
      <input type="text" name="coupon_code" />
      <button type="submit" name="apply_coupon" class="btn">Apply Coupon</button>
      <span style="color: red;"><?php echo $coupon_error; ?></span>
    </form>
    <br />

    <!-- Bill Summary -->
    <?php
      $discount = $subtotal * $discount_rate;
      $taxable = $subtotal - $discount;
      $tax = calculate_tax($taxable);
      $grand_total = $taxable + $tax;
      $customer_category = categorize_customer($subtotal);
    ?>

    <table>
      <tr><th>Subtotal</th><td>$<?php echo number_format($subtotal, 2); ?></td></tr>
      <tr><th>Discount Applied (<?php echo ($discount_rate * 100); ?>%)</th><td>-$<?php echo number_format($discount, 2); ?></td></tr>
      <tr><th>Estimated Tax (18% GST)</th><td>+$<?php echo number_format($tax, 2); ?></td></tr>
      <tr><th>Grand Total Bill</th><td><strong>$<?php echo number_format($grand_total, 2); ?></strong></td></tr>
      <tr><th>Customer Status</th><td><span class="badge"><?php echo $customer_category; ?></span></td></tr>
    </table>

    <form method="post">
      <input type="hidden" name="action" value="clear" />
      <button type="submit" class="btn btn-danger">Clear Cart</button>
    </form>
  <?php endif; ?>

</div>

</body>
</html>
```

---

### Explanation of Concepts for Q5:

1. **Dynamic Web Development via Sessions**:
   - `$_SESSION['cart']` retains product items across multiple page reloads or page transitions without needing database persistence for temporary carts.
2. **Cookies for Preferences**:
   - `setcookie("user_theme", $theme, time() + 2592000)` saves user UI theme preference ('light' vs 'dark') on the browser.
3. **Form Processing**:
   - HTTP `POST` requests handle product addition, quantity adjustments, and coupon submissions securely.
4. **Pattern Matching**:
   - `preg_match("/^SAVE(10|20)$/i", $code)` uses regular expressions to validate and extract valid promo codes.

---

---

## Q6 (10 Marks) — Unit III
### XML Document, DTD, XSD, and CSS for Online Library Management System

#### Question:
> **Design and validate an XML document for an Online Library Management System.**  
> Create an XML document to store details of books such as Book ID, Title, Author, Publisher, Price, and Category. The solution should include the following:
> 1. Proper XML syntax and document structure.
> 2. A Document Type Definition (DTD) to validate the XML document.
> 3. Use of XML namespaces for organizing elements.
> 4. An XML Schema (XSD) to define data types and constraints.
> 5. A CSS style sheet to display the XML document in a formatted manner on a web browser.
>
> **Write the XML document, DTD/XSD, and CSS code, and explain how validation and styling are achieved in XML applications.**

---

### 1. Document Type Definition File (`library.dtd`)

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- library.dtd - Document Type Definition for Library Management System -->
<!ELEMENT library (book+)>
<!ELEMENT book (title, author+, publisher, price, category)>
<!ATTLIST book book_id CDATA #REQUIRED>
<!ELEMENT title (#PCDATA)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT publisher (#PCDATA)>
<!ELEMENT price (#PCDATA)>
<!ELEMENT category (#PCDATA)>
```

---

### 2. XML Schema File (`library.xsd`)

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- library.xsd - XML Schema Definition -->
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema"
            targetNamespace="http://www.library.org/catalog"
            xmlns="http://www.library.org/catalog"
            elementFormDefault="qualified">

  <!-- Root Element Declaration -->
  <xsd:element name="library">
    <xsd:complexType>
      <xsd:sequence>
        <xsd:element name="book" maxOccurs="unbounded">
          <xsd:complexType>
            <xsd:sequence>
              <xsd:element name="title" type="xsd:string" />
              <xsd:element name="author" type="xsd:string" maxOccurs="unbounded" />
              <xsd:element name="publisher" type="xsd:string" />
              
              <!-- Custom Price Type with Facet Constraint -->
              <xsd:element name="price">
                <xsd:simpleType>
                  <xsd:restriction base="xsd:decimal">
                    <xsd:minInclusive value="0.00" />
                    <xsd:maxInclusive value="5000.00" />
                  </xsd:restriction>
                </xsd:simpleType>
              </xsd:element>

              <xsd:element name="category" type="xsd:string" />
            </xsd:sequence>
            <!-- Attribute Declaration -->
            <xsd:attribute name="book_id" type="xsd:string" use="required" />
          </xsd:complexType>
        </xsd:element>
      </xsd:sequence>
    </xsd:complexType>
  </xsd:element>

</xsd:schema>
```

---

### 3. CSS Formatting Style Sheet (`library.css`)

```css
/* library.css - Presentation styling for raw XML library catalog */
library {
  display: block;
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  padding: 20px;
}

book {
  display: block;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-left: 6px solid #2563eb;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px;
}

title {
  display: block;
  font-size: 18pt;
  font-weight: bold;
  color: #1e3a8a;
}

author {
  display: block;
  font-size: 12pt;
  color: #475569;
  font-style: italic;
}

publisher {
  display: block;
  font-size: 11pt;
  color: #64748b;
}

price {
  display: block;
  font-size: 14pt;
  font-weight: bold;
  color: #16a34a;
  margin-top: 5px;
}

category {
  display: inline-block;
  background-color: #e0e7ff;
  color: #3730a3;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10pt;
  margin-top: 5px;
}
```

---

### 4. Valid XML Instance Document with Namespaces & CSS Link (`library.xml`)

```xml
<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet type="text/css" href="library.css"?>
<!DOCTYPE library SYSTEM "library.dtd">
<library xmlns="http://www.library.org/catalog"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.library.org/catalog library.xsd">

  <book book_id="BK-101">
    <title>Programming the World Wide Web</title>
    <author>Robert W. Sebesta</author>
    <publisher>Pearson Education</publisher>
    <price>85.50</price>
    <category>Computer Science</category>
  </book>

  <book book_id="BK-102">
    <title>Modern Operating Systems</title>
    <author>Andrew S. Tanenbaum</author>
    <author>Herbert Bos</author>
    <publisher>Prentice Hall</publisher>
    <price>120.00</price>
    <category>Engineering</category>
  </book>

</library>
```

---

### Explanation of Validation and Styling in XML Applications:

1. **Validation Mechanism**:
   - **DTD Validation**: A validating XML parser checks that elements appear in the mandatory order (`title`, `author+`, `publisher`, `price`, `category`) and enforces the mandatory `#REQUIRED` `book_id` attribute.
   - **XSD Validation**: XML Schema enforces strict data type checking (e.g. verifying `price` is a numeric `xsd:decimal` within `$0.00` to `$5000.00`).
2. **Namespaces**:
   - `xmlns="http://www.library.org/catalog"` organizes all library catalog tags under a unique URI, preventing conflicts with other book schema element names.
3. **Styling Mechanism**:
   - Because browsers lack built-in display rules for custom XML tags (`<book>`, `<price>`), `<?xml-stylesheet type="text/css" href="library.css"?>` links presentation styles, setting `display: block` so custom elements render cleanly as visual UI blocks.
