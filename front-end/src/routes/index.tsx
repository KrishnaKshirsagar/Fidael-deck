import { useRoutes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Layout } from "../layouts/MainLayout";
import { Login } from "../pages/auth/Login";
import { Dashboard } from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import AddEditProject from "../pages/projects/AddEditProject";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      // Projects routes
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <Projects />,
          },
          {
            path: "new",
            element: <AddEditProject />,
          },
          {
            path: ":project_id",
            element: <AddEditProject />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
