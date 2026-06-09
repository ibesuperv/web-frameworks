// server.js
// Practical Demonstrating: Creating a simple HTTP Web Server

const http = require('http');

// Define port number
const PORT = 3000;

// Create the web server
const server = http.createServer((request, response) => {
    // 1. Log request details to the server console
    console.log(`Received request: ${request.method} ${request.url}`);

    // 2. Route Handling
    if (request.url === '/' || request.url === '/home') {
        // Send a 200 OK HTML response
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<h1>Welcome to NodeJS Home Page!</h1>');
        response.write('<p>Use /api to get JSON data, or /about for details.</p>');
        response.end();
    } 
    else if (request.url === '/about') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<h1>About Page</h1>');
        response.write('<p>This is a practical server demonstrating NodeJS http modules.</p>');
        response.end();
    } 
    else if (request.url === '/api') {
        // Send JSON data
        response.writeHead(200, { 'Content-Type': 'application/json' });
        const userJSON = {
            id: 101,
            name: "Varun",
            semester: 6,
            subjects: ["CD", "MOBILE", "WEB"]
        };
        response.end(JSON.stringify(userJSON));
    } 
    else {
        // Handle 404 Not Found
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<h1>404 Page Not Found</h1>');
        response.write('<p>The page you requested does not exist.</p>');
        response.end();
    }
});

// Start listening on the port
server.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    console.log('Press Ctrl + C to stop the server.');
});
