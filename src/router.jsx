import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { publicRoutes, protectedUserRoutes, protectedAdminRoutes } from "./routes.jsx";

const children = [
  ...publicRoutes,
  {
    element: <ProtectedRoute allowRoles={["user", "admin"]} />,
    children: protectedUserRoutes,
  },
  {
    element: <ProtectedRoute allowRoles={["admin"]} />,
    children: protectedAdminRoutes,
  },
];

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);


