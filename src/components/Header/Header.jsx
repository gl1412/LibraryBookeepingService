import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import libraryLogo from "../../assets/lpl-logo-blue.svg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <img
          src={libraryLogo}
          alt="London Public Library Logo"
          className="logo"
        />
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link
            to="https://www.lpl.ca/contact-us"
            target="_blank"
            className="nav-link"
          >
            Contact
          </Link>
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>
          <Link to="/reservation-form-screen" className="nav-link">
            Reserve now
          </Link>
          <button
            className="register-btn"
            onClick={() => navigate("/landing-page")}
          >
            Login
          </button>
          <button
            className="register-btn"
            onClick={() => navigate("/patron-register")}
          >
            Register
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
