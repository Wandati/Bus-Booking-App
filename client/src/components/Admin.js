import React, { useState } from 'react';

const Admin = () => {
    const users = [users] = useState([
        { id: 1, name: 'Michael Townley', email: 'townley@example.com' },
        { id: 2, name: 'Dave Norton', email: 'dnorton@example.com' },
        { id: 3, name: 'Andrew Williams', email: 'willandre@example.com' },

        // Add more users if needed
    ]);

    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (userId) => {
        const user = users.find((user) => user.id === userId);
        setSelectedUser(user);
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => handleUserClick(user.id)}>
                        {user.name}
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div>
                    <h3>Selected User Info:</h3>
                    <p>ID: {selectedUser.id}</p>
                    <p>Name: {selectedUser.name}</p>
                    <p>Email {selectedUser.email}</p>
                </div>
            )}
        </div>
    );
};

export default Admin;