import './App.css';
import LoginPage from "./auth/login/LoginPage";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from "./auth/register/RegisterPage";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={
                 <Navigate replace to="/login" />
            } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
  );
}

export default App;
