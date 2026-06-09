# Web Frameworks Study Notes 📚

Welcome to the ultimate exam preparation repository for **Web Frameworks** (6th Semester). This repository contains structured study guides, absolute beginner crash courses, tricky exam-style question banks (1-mark, 2-mark, 5-mark, and 10-mark), and standalone or integrated practical code files.

---

## 📁 Repository Structure

```text
├── UNIT-4/
│   ├── AngularJS/
│   │   ├── 0.AngularJS-Beginners-Guide.md
│   │   ├── 1.Introduction-and-Modules.md
│   │   ├── 2.Expressions-and-Data-Binding.md
│   │   ├── 3.Controllers-and-Scope.md
│   │   ├── 4.DOM-and-Events.md
│   │   ├── 5.Forms-and-Validations.md
│   │   └── practical/
│   │       └── index.html (Standalone list manager & form validation client)
│   ├── NodeJS/
│   │   ├── 1.Introduction-and-Basics.md
│   │   ├── 2.Server-and-Process-Models.md
│   │   ├── 3.Modules.md
│   │   ├── 4.Event-Loop.md
│   │   └── practical/
│   │       ├── fileOps.js (File write/read/append script)
│   │       └── server.js (Core routing web server)
│   ├── ReactJS/
│   │   ├── 1.Introduction-and-Advantages.md
│   │   ├── 2.Components-and-Props.md
│   │   ├── 3.Handling-Events.md
│   │   ├── 4.Working-with-Forms.md
│   │   └── practical/
│   │       └── FeedbackFormApp.jsx (Controlled forms & props sharing)
│   ├── combined-practicals/
│   │   ├── angular-node/ (AngularJS frontend + NodeJS backend)
│   │   │   ├── index.html
│   │   │   └── server.js
│   │   └── react-node/ (ReactJS frontend + NodeJS backend)
│   │       ├── ReactComponent.jsx
│   │       └── server.js
│   ├── Unit-4-Tricky-Quiz.md (20 conceptual 1-2 marks short-answer questions)
│   └── Unit-4-Long-Questions.md (30 advanced 5-10 marks scenario-based questions)
│
└── UNIT-5/
    ├── AJAX/
    │   ├── 1.Introduction-and-Technology.md
    │   ├── 2.AJAX-Basics-and-Workflow.md
    │   ├── 3.Implementation-and-Compatibility.md
    │   └── practical/
    │       └── index.html (Raw XMLHttpRequest API consumer)
    └── Django/
        ├── 1.Introduction-and-Installation.md
        ├── 2.Django-MVT-Architecture.md
        ├── 3.Forms-and-Validation.md
        └── practical/
            └── views_and_forms.py (Django Form subclass & custom clean validators)
```

---

## 🚀 How to Run the Practicals

### 1. Standalone Frontend Clients (AngularJS & AJAX)
* Locate the `index.html` inside `UNIT-4/AngularJS/practical/` or `UNIT-5/AJAX/practical/`.
* Double-click the file to open it directly in any web browser. No compilation or live server required!

### 2. Standalone Node.js Scripts
* Navigate to the target folder:
  ```bash
  cd UNIT-4/NodeJS/practical
  ```
* Run the scripts using:
  ```bash
  node fileOps.js
  # Or start the web server
  node server.js
  ```

### 3. Combined Integrations (Angular + Node / React + Node)
1. Open a terminal and run the Node backend server:
   ```bash
   node combined-practicals/angular-node/server.js
   # Or for React integration
   node combined-practicals/react-node/server.js
   ```
2. Open the frontend:
   * For Angular: Open `angular-node/index.html` in your browser.
   * For React: Import `ReactComponent.jsx` into your React compiler workspace.

---

## 🎯 Quiz & Questions Guides

Make sure to test your conceptual strength using:
* **[Unit-4-Tricky-Quiz.md](UNIT-4/Unit-4-Tricky-Quiz.md)**: 20 short-answer questions highlighting JavaScript closures, reference caching, digest loops, and state changes.
* **[Unit-4-Long-Questions.md](UNIT-4/Unit-4-Long-Questions.md)**: 30 long exam-style answers complete with trace code, structural diagrams, and performance comparisons.
