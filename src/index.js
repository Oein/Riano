import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <ToastContainer autoClose={3000} position={"bottom-right"} />
  </StrictMode>
);
