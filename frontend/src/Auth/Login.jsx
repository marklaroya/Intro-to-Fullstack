import { useState } from "react";
import { StyledWrapper } from "../components/StyledWrapper.jsx";
import { loginUser } from "../api/userApi.js";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx"; // to get the user state from AuthContext

export function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(ev) {
    ev.preventDefault();

     try {
      const response = await loginUser(email, password);

      login(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  }

  return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleLogin}>
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

export default loginPage;
