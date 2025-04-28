import './App.css';
import LoginPage from "./auth/login/LoginPage";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from "./auth/register/RegisterPage";
import MainPage from './pages/MainPage';
import ManagerAddDocument from './management/ManagerAddDocument';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={
                 <Navigate replace to="/login" />
            } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/add-document" element={<ManagerAddDocument />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
  );
}

export default App;
