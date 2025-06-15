import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home"
import Layout from "./components/Layout";
import Music from "./pages/Music";
import Dashboard from "./pages/Dashboard";
import StatsDashboard from "./pages/StatsDashboard";
export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/stats" element={<StatsDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </GoogleOAuthProvider>
  );
}
