import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import { Routes, Route } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App