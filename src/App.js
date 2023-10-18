import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import AboutPage from './Pages/Home/AboutPage';
import FormPage from './Pages/Home/FormPage';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/form" element={<FormPage />} />
          {/* <Route path="/*" element={<FormPage />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
