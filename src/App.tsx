import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Assessment from "./pages/Assessment";
import Assessments from "./pages/Assessments";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Interview from "./pages/Interview";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Skills from "./pages/Skills";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/assessment/:skillId" element={<Assessment />} />
            <Route path="/interview/:type" element={<Interview />} />
          </Route>

          <Route path="*" element={<div>404! page not found!</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default App;
