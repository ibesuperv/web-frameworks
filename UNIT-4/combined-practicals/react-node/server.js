// server.js (React + Node Integration Backend)
// Run with: node server.js

const http = require('http');

const PORT = 5000;

// In-memory array to store tasks
let tasks = [
    { id: 1, text: "Revise React components", completed: false },
    { id: 2, text: "Revise NodeJS process model", completed: true }
];

const server = http.createServer((req, res) => {
    // 1. Enable CORS headers for React dev client access
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    console.log(`Backend Request: ${req.method} ${req.url}`);

    // 2. GET API: Return all tasks
    if (req.method === 'GET' && req.url === '/api/tasks') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    } 
    // 3. POST API: Add a new task
    else if (req.method === 'POST' && req.url === '/api/tasks') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (data.text && data.text.trim() !== '') {
                    const newTask = {
                        id: tasks.length + 1,
                        text: data.text,
                        completed: false
                    };
                    tasks.push(newTask);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Task added", tasks }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Task text cannot be empty" }));
                }
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid JSON format" }));
            }
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Node backend running for React at http://localhost:${PORT}`);
});
