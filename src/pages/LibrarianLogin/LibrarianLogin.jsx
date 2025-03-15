import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LibrarianLogin.scss";
import lplLogo from "../../assets/lpl-icon-yellow.svg";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const LibrarianLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // This is placeholder authentication ( we can replace with backend logic eventually)
    if (email === "admin@library.com" && password === "password") {
      localStorage.setItem("librarian", email);
      navigate("/librarian-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="librarian-login-container">
        <img src={lplLogo} alt="LPL Logo" className="lpl-logo" />
        <h2>Librarian Login</h2>
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
      </div>
      <Footer />
    </div>
  );
};

export default LibrarianLogin;
