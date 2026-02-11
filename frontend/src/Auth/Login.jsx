import { useState } from "react";
import { StyledWrapper } from "../components/StyledWrapper.jsx";
import { loginUser } from "../api/userApi.js";
import { useNavigate } from "react-router-dom";
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
      <div className="tile tile-pad auth-box">
        <div className="auth-title">SYSTEM LOGIN</div>
        <div className="auth-sub">Enter credentials to continue</div>

        <form onSubmit={handleLogin} className="form-group">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn">
            SIGN IN
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <a href="/register">Create account</a>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default loginPage;
