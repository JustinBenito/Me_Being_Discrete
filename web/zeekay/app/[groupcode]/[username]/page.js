'use client';
import { useState } from 'react';

export default function GroupUserPage({ params }) {
    const { groupcode, username } = params;
    const [message, setMessage] = useState('');

    const handleClick = async () => {
         const resp = await fetch(`http://localhost:3000/api/assign-role?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMessage('Token generated successfully!');
                } else {
                    setMessage('Failed to generate token.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setMessage('An error occurred.');
            });

        console.log(resp);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Group: {groupcode}</h1>
            <h2>User: {username}</h2>

            <button
                onClick={handleClick}
                style={{
                    backgroundColor: '#0070f3',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
            >
                Generate Token
            </button>

            {message && (
                <p style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>
                    {message}
                </p>
            )}
        </div>
    );
}
