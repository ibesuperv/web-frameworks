// FeedbackFormApp.jsx
// Practical Demonstrating: Components, Props, Event Handling, and Controlled Forms in React.js

import React, { useState } from 'react';

// ==========================================
// 1. CHILD COMPONENT: Displays submitted cards
// Receives list of submissions via PROPS
// ==========================================
function FeedbackList(props) {
    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Submitted Feedbacks</h3>
            {props.items.length === 0 ? (
                <p style={{ color: '#888' }}>No feedback submitted yet.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {props.items.map((item, index) => (
                        <li key={index} style={{
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            backgroundColor: '#fff'
                        }}>
                            <strong>Name:</strong> {item.name} <br />
                            <strong>Rating:</strong> {item.rating} / 5 <br />
                            <strong>Comments:</strong> {item.comment}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ==========================================
// 2. PARENT COMPONENT: Form and main state manager
// ==========================================
export default function FeedbackFormApp() {
    // A. Form state objects (Controlled Inputs)
    const [formInputs, setFormInputs] = useState({
        name: '',
        rating: '5',
        comment: ''
    });

    // B. Submissions list state
    const [submissions, setSubmissions] = useState([]);

    // C. Change handler for multiple controlled inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormInputs({
            ...formInputs,
            [name]: value // Dynamic key update
        });
    };

    // D. Submit handler event
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Stop standard browser submit/reload
        
        // Validation check
        if (formInputs.name.trim() === '' || formInputs.comment.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Add inputs to submission list
        setSubmissions([...submissions, formInputs]);

        // Reset form inputs
        setFormInputs({
            name: '',
            rating: '5',
            comment: ''
        });
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '30px auto',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2>Course Feedback Form</h2>
            
            <form onSubmit={handleFormSubmit}>
                {/* 1. Name Controlled Input */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Student Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formInputs.name} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* 2. Rating Controlled Input */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Rating:</label>
                    <select 
                        name="rating" 
                        value={formInputs.rating} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                    </select>
                </div>

                {/* 3. Comment Controlled Input */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Comments:</label>
                    <textarea 
                        name="comment" 
                        value={formInputs.comment} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '80px' }}
                    />
                </div>

                <button 
                    type="submit" 
                    style={{
                        padding: '10px 15px',
                        background: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Submit Feedback
                </button>
            </form>

            <hr style={{ margin: '20px 0' }} />

            {/* 4. Pass submission array to Child component via PROPS */}
            <FeedbackList items={submissions} />
        </div>
    );
}
