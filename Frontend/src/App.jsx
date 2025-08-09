import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Music from "./pages/Music";
import Dashboard from "./pages/Dashboard";
import StatsDashboard from "./pages/StatsDashboard";
import Navbar from "./components/Navbar"; 

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/music"
            element={
              <>
                <Navbar />
                <Music />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/stats"
            element={
              <>
                <Navbar />
                <StatsDashboard />
              </>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}
