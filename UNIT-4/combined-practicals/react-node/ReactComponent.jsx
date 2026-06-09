// ReactComponent.jsx (React + Node Integration Frontend)
// Practical Demonstrating: Component lifecycle fetching (useEffect) and forms fetch (POST)

import React, { useState, useEffect } from 'react';

export default function ReactComponent() {
    const API_URL = "http://localhost:5000/api/tasks";

    // 1. Component States
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [statusMessage, setStatusMessage] = useState('Loading tasks from Node backend...');

    // 2. Fetch Tasks on component mount (equivalent to componentDidMount / initial load)
    useEffect(() => {
        fetch(API_URL)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setTasks(data);
                setStatusMessage('Loaded tasks successfully.');
            })
            .catch(err => {
                setStatusMessage('Failed to load tasks. Is server.js running on port 5000?');
                console.error("Fetch Error:", err);
            });
    }, []);

    // 3. Handle Form Submit (POST task to Node backend)
    const handleAddTask = (e) => {
        e.preventDefault();
        
        if (newTaskText.trim() === '') {
            alert('Task cannot be empty');
            return;
        }

        setStatusMessage('Adding task...');

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newTaskText })
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to add task");
            return res.json();
        })
        .then(data => {
            setTasks(data.tasks); // Backend returns the updated task list
            setNewTaskText(''); // Clear input
            setStatusMessage('Task added successfully.');
        })
        .catch(err => {
            setStatusMessage('Error adding task.');
            console.error("Post Error:", err);
        });
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '40px auto',
            padding: '20px',
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2>React + NodeJS Task Manager</h2>
            <p style={{ fontSize: '14px', color: '#666' }}>
                Fetches and posts data to Node server at <code>http://localhost:5000</code>.
            </p>
            <hr />

            {/* Controlled Form */}
            <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Enter new task..." 
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button 
                    type="submit"
                    style={{
                        padding: '8px 16px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Add Task
                </button>
            </form>

            {/* Task list rendering */}
            <ul style={{ padding: 0, listStyle: 'none' }}>
                {tasks.map(task => (
                    <li key={task.id} style={{
                        padding: '10px',
                        borderBottom: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#888' : '#333'
                    }}>
                        <span>{task.text}</span>
                        <span>{task.completed ? '✅ Done' : '⏳ Pending'}</span>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '20px', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
                Status: {statusMessage}
            </div>
        </div>
    );
}
