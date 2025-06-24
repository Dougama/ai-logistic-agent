import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../shared/services/auth/AuthContext";
import { LoadingScreen } from "../shared/components/ui";

// Lazy loading de features
const AuthPage = lazy(() =>
  import("../features/auth").then((m) => ({ default: m.AuthPage }))
);
const ChatPage = lazy(() =>
  import("../features/chat").then((m) => ({ default: m.ChatPage }))
);
const DashboardPage = lazy(() =>
  import("../features/dashboard").then((m) => ({ default: m.DashboardPage }))
);

const DocumentationPage = lazy(() =>
  import("../features/documentation").then((m) => ({
    default: m.DocumentationPage,
  }))
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return currentUser ? <>{children}</> : <Navigate to="/auth" replace />;
};

export const AppRoutes: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route
          path="/auth"
          element={
            !currentUser ? <AuthPage /> : <Navigate to="/dashboard" replace />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/documentation"
          element={
            <ProtectedRoute>
              <DocumentationPage />
            </ProtectedRoute>
          }
        />
        ;
      </Routes>
    </Suspense>
  );
};
