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

          <Route
            path="task"
            element={
              <ProtectedRoute>
                <TasksListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="task/:id"
            element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
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
