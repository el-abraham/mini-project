import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error.tsx";
import LoginPage from "./pages/login/page";
import DashboardPage from "./pages/dashboard/page";
import DishPage from "./pages/dish/page";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dish",
    element: <DishPage />,
  },
]);
