import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import libraryLogo from "../../assets/lpl-logo-white.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="header">
        <img
          src={libraryLogo}
          alt="London Public Library Logo"
          className="logo"
        />
      </header>
      <main className="content">
        <h1>Welcome to the London Public Library Room Booking System</h1>
        <p>Select your role to proceed:</p>
        <div className="button-group">
          <button
            className="btn patron-btn"
            onClick={() => navigate("/patron-login")}
          >
            Library Patron Login
          </button>
          <button
            className="btn librarian-btn"
            onClick={() => navigate("/librarian-login")}
          >
            Librarian Login
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
