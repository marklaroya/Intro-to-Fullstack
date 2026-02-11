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

        <button type="submit" className="btn">SIGN IN</button>
      </form>

      <div className="auth-footer">
        New player? <a href="/register">Create account</a>
      </div>
    </div>
  </StyledWrapper>
);
