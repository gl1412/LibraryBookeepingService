import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/index.jsx";
import PatronLogin from "./pages/PatronLogin/PatronLogin.jsx";
import PatronRegister from "./pages/PatronRegister/PatronRegister.jsx";
import PatronDashboard from "./pages/PatronDashboard/PatronDashboard.jsx";
import LibrarianLogin from "./pages/LibrarianLogin/LibrarianLogin.jsx";
import LibrarianDashboard from "./pages/LibrarianDashboard/LibrarianDashboard.jsx";
import FAQ from "./faq/index.jsx";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/patron-login" element={<PatronLogin />} />
        <Route path="/patron-register" element={<PatronRegister />} />
        <Route path="/patron-dashboard" element={<PatronDashboard />} />
        <Route path="/librarian-login" element={<LibrarianLogin />} />
        <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;