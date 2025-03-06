import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import PatronLogin from "./pages/PatronLogin/PatronLogin.js";
import LibrarianLogin from "./pages/LibrarianLogin/LibrarianLogin.js";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patron-login" element={<PatronLogin />} />
        <Route path="/librarian-login" element={<LibrarianLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
