import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import FormPage from "./Pages/FormPage/FormPage";
import MapPage from "./Pages/MapPage/MapPage";
import LoginPage from "./Pages/AuthPage/LoginPage";
import ForgotPage from "./Pages/AuthPage/ForgotPage";
import RegisterPage from "./Pages/AuthPage/Register";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
