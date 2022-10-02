import React, { useEffect, useState } from "react";
import { Counter } from "./pages/counter/Counter";
import "./App.css";
import { Button } from "antd";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import Home from "pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "pages/login/Login";
import NotFound from "components/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    console.log(process.env.REACT_APP_BASE_URL);
  }, []);

  return (
    <>
      <Routes>
        <Route
          element={
            <PublicRoute isAuthenticated={isAuthenticated} to="/">
              <Login />
            </PublicRoute>
          }
          path="/login"
        />
        <Route
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} to="/login">
              <Home />
            </PrivateRoute>
          }
          path="/"
        />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
