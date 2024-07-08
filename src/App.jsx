import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TasksListPage from "./pages/TasksListPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import { useAuth } from "./contexts/AuthProvider";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";
import ChangePassword from "./pages/ChangePassword";
import ProfileSettings from "./pages/ProfileSettings";

function ProtectedRoute({ children }) {
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) {
    return null;
  }

  if (loggedInUser === null) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

function AuthRoute({ children }) {
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) {
    return null;
  }

  if (loggedInUser !== null) {
    return <Navigate to="/" />;
  }

  return children;
}
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<HistoryPage />} />
          <Route path="contact" element={<ContactPage />} />

          <Route
            path="task"
            element={
              <ProtectedRoute>
                <TasksListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="task/:taskId"
            element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/changePassword"
            element={
              <AuthRoute>
                <ChangePassword />
              </AuthRoute>
            }
          />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />

          <Route
            path="register"
            element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
