import React from 'react';

const Admin = () => {
    const users = [
        { id: 1, name: 'Michael Townley'},
        { id: 2, name: 'Dave Norton'},
        { id: 3, name: 'Andrew Williams'},

        // Add more users if needed
    ];

    return (
        <div>
            <h2>Admin Panel</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.id}: {user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;