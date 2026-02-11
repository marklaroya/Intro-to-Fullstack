import { useState } from "react";
import { StyledWrapper } from "../components/StyledWrapper";
import { registerUser } from "../api/userApi"; // to API folder
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nagivate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();

    // call the registerUser API function
    registerUser(username, email, password)
      .then((response) => {
        alert("Registration successful. Please log in.");

        setUsername("");
        setEmail("");
        setPassword("");
        nagivate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(
            "This email is already registered. Please use a different email.",
          );
        } else {
          alert("Registration failed. Please try again.");
        }
      });
  }

  return (
    <StyledWrapper>
        <div className="tile tile-pad auth-box">
          <div className="auth-title">CREATE ACCOUNT</div>
          <div className="auth-sub">Register to unlock dashboard</div>

          <form onSubmit={handleSubmit} className="form-group">
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

          <button type="submit" className="btn">
            Sign up
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}


export default RegisterPage;