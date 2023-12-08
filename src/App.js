import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import CandidateRegistration from "./components/CandidateRegistration";
import CandidateList from "./components/CandidateList";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/candidate",
    children: [
      {
        path: "registration",
        element: (
          <>
            <CandidateRegistration />
          </>
        ),
      },
      {
        path: "list",
        element: (
          <>
            <CandidateList />
          </>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
