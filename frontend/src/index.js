import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { CookiesProvider } from "react-cookie";

function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />;
          <Route exact path="/login" element={<Login />} />;
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);
