import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        // Signup Logic here
        console.log('Signup form submitted');
        console.log('Email:', email);
        console.log('Password:', password);

        // Reset Form
        setEmail('');
        setPassword('');
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>

                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>

                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;