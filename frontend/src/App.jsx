import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Signup} from "./pages/Signup";
import {Signin} from "./pages/Signin";
import {Dashboard} from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
import ErrorPage from "./error-page";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/send",
    element: <SendMoney />
  },
  // Catch-all route for undefined endpoints
  {
    path: "*",  // This wildcard matches any route that isn't defined above
    element: <ErrorPage />,
  },
])

export default function App() {
  return (
    <>
       <RouterProvider router={route} />
    </>
  )
}