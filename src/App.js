import "./App.css";
import FavoritePage from "./pages/FavoritePage";
import LandingPage from "./pages/LandingPage";

import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/favorite",
    element: <FavoritePage></FavoritePage>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
