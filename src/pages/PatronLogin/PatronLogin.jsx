import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatronLogin.scss";
import lplLogo from "../../assets/lpl-icon-yellow.svg";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const PatronLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder account (we will replace with proper backend logic later)
    if (email === "user@library.com" && password === "password") {
      localStorage.setItem("patron", email); // Store session
      navigate("/patron-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="patron-login-container">
        <img src={lplLogo} alt="LPL Logo" className="lpl-logo" />
        <h2>Library Patron Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?
          <button onClick={() => navigate("/patron-register")}>
            Register here.
          </button>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PatronLogin;
