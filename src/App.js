import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import MainPage from './pages/MainPage';
import UploadDocument from './management/UploadDocument';
import EditDocument from './management/EditDocument';
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
          <Route path="/edit-document/:id" element={<EditDocument />} />
          <Route path="/modules" element={<TrainingModulesPage />} />
          <Route path="/uploads" element={<UploadsPage />} />
          <Route path="/account" element={<MyAccountPage />} />
        </Routes>
      </Router>
  );
}

export default App;
