import axios from "axios";
import { useState } from "react";
import { StyledWrapper } from "../components/StyledWrapper";

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    axios
      .post("/api/v1/users/login", {
        // to the backend route for login
        email,
        password,
      })
      .then((response) => {
        alert("Login successful.");
      })
      .catch((error) => {
        alert("Login failed. Please try again.");
      });
  }

  return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Welcome!</span>
          <span className="subtitle">Sign in to your account.</span>

          <div className="form-container">
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

          <button type="submit">Sign in</button>
        </form>

        <div className="form-section">
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}
