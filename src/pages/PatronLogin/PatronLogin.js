import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatronLogin.scss";
import lplLogo from "../../assets/lpl-icon-white.svg";

const PatronLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // ADD AUTHENTICATION //
    console.log("Patron login:", { email, password });
    navigate("/patron-dashboard");
  };

  return (
    <div className="patron-login-container">
      <img src={lplLogo} alt="LPL Logo" className="lpl-logo" />
      <h2>Library Patron Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/patron-register")}>Register</button>
      </p>
    </div>
  );
};

export default PatronLogin;
