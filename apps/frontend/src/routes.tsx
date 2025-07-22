import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Jonas from "./pages/Jonas";
import Steffany from "./pages/Steffany";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EditCasamientos from "./pages/EditCasamientos";
import Ventas from "./pages/Ventas";

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
      {
        path: "/editcasamiento",
        element: <EditCasamientos />,
      },
      {
        path: "/ventas",
        element: <Ventas />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
