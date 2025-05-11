import './App.css';
import LoginPage from "./auth/login/LoginPage";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from "./auth/register/RegisterPage";
import MainPage from './pages/MainPage';
import UploadDocument from './management/UploadDocument';
import TrainingModulesPage from "./pages/TrainingModulesPage";
import UploadsPage from "./management/UploadsPage";
import MyAccountPage from './pages/MyAccountPage';

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
          <Route path="/add-document" element={<UploadDocument />} />
          <Route path="/modules" element={<TrainingModulesPage />} />
          <Route path="/uploads" element={<UploadsPage />} />
          <Route path="/account" element={<MyAccountPage />} />
        </Routes>
      </Router>
  );
}

export default App;
