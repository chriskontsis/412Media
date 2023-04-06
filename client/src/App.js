import React from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
