import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LibrarianLogin.scss";
import lplLogo from "../../assets/lpl-icon-white.svg";

const LibrarianLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // ADD AUTHENTICATION //
    console.log("Librarian login:", { email, password });
    navigate("/librarian-dashboard");
  };

  return (
    <div className="librarian-login-container">
      <img src={lplLogo} alt="LPL Logo" className="lpl-logo" /> {/* LPL Icon */}
      <h2>Librarian Login</h2>
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
    </div>
  );
};

export default LibrarianLogin;
