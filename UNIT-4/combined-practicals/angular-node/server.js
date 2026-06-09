// server.js (Angular + Node Integration Backend)
// Run with: node server.js

const http = require('http');

const PORT = 3000;

// In-memory array to store items
let items = ["Learn AngularJS", "Master NodeJS", "Ace the Exam"];

const server = http.createServer((req, res) => {
    // 1. Enable CORS headers so local index.html frontend can access it
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

    // 2. GET API: Return all items
    if (req.method === 'GET' && req.url === '/api/items') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items));
    } 
    // 3. POST API: Add a new item
    else if (req.method === 'POST' && req.url === '/api/items') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (data.item && data.item.trim() !== '') {
                    items.push(data.item);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Item added successfully", items }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Item text cannot be empty" }));
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
    console.log(`Node backend running for AngularJS at http://localhost:${PORT}`);
});
