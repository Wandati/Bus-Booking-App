import React, { useState } from 'react';

<<<<<<< HEAD
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
=======
function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('passenger'); // Default role is passenger
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Role:', role);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputUsername">Username</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputUsername"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputConfirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputConfirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputRole">Role</label>
        <select
          className="form-control"
          id="exampleInputRole"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="passenger">Passenger</option>
          <option value="owner">Owner</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Signup
      </button>
    </form>
  );
}

export default SignUpForm;
>>>>>>> 13044bc7cb39512ceac9f613267c74e52ee52d78
