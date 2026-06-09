// fileOps.js
// Practical Demonstrating: File System Operations (fs module) and Path resolutions (path module)

const fs = require('fs');
const path = require('path');

// 1. Resolve path securely using path.join()
const filePath = path.join(__dirname, 'student_data.txt');
console.log('Writing file to resolved path:', filePath);

// 2. Writing to a file (creates the file or overwrites it)
const dataToWrite = "Roll No: 101\nName: Varun\nSubject: Web Development Frameworks\n";
fs.writeFileSync(filePath, dataToWrite, 'utf8');
console.log('File successfully written.');

// 3. Appending content to an existing file
const appendData = "Exam Date: June 2026\nStatus: Preparing\n";
fs.appendFileSync(filePath, appendData, 'utf8');
console.log('Data successfully appended.');

// 4. Reading content from the file
console.log('\n--- Reading File Contents ---');
const fileContents = fs.readFileSync(filePath, 'utf8');
console.log(fileContents);
console.log('------------------------------');

// 5. Checking if a file exists
const fileExists = fs.existsSync(filePath);
console.log('Does student_data.txt exist?:', fileExists);
