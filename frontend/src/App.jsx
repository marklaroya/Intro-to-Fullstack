import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard" element={
          <ProtectedRoute>
              <Dashboard />
          </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
