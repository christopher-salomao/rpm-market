import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import VehicleDetail from "./pages/VehicleDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewVehicle from "./pages/Dashboard/NewVehicle";

import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detalhes/:id",
        element: <VehicleDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cadastro",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/novo-veiculo",
        element: <NewVehicle />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
