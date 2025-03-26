import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import lplLogo from "../../assets/lpl-icon-yellow.svg";
import Header from "../../components/Header/Header.jsx";
import {Footer9} from "../../components/Footer/Footer9.jsx";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="page-container">
      <Header />
      <div className="landing-container">
        <main className="content">
          <img src={lplLogo} alt="LPL Logo" className="lpl-logo" />
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
      
    </div>
    <Footer9 />
    </>
  );
};

export default LandingPage;
