import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Jonas from "./pages/Jonas";
import Steffany from "./pages/Steffany";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, // Agrupa rutas protegidas
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/jonas",
        element: <Jonas />,
      },
      {
        path: "/casamiento",
        element: <Steffany />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
