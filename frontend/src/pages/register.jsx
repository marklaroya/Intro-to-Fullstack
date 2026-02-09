import axios from "axios";
import { useState } from "react";
import { StyledWrapper } from "../components/StyledWrapper";


export default function RegisterPage(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    
    function handleSubmit(ev){
        ev.preventDefault();

    axios.post('/api/v1/users/register',{ // to the backend route for registration
            username,
            email,
            password
        }) .then(response => {
            alert('Registration successful. Please log in.');
        }) .catch(error => {
            alert('Registration failed. Please try again.');
        });
    }


    return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">Create a free account with your email.</span>

          <div className="form-container">
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <button type="submit">Sign up</button>
        </form>

        <div className="form-section">
          <p>
            Have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </StyledWrapper>
    );
}


