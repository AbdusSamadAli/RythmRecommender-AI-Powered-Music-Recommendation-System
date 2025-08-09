import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Sign-In Successful:", credentialResponse);
    fetch("http://localhost:8000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login Response:", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsSignedIn(true);
          alert("Signed in successfully!");
        } else {
          alert("Login failed!");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        alert("Login failed!");
      });
  };

  const handleGoogleLoginError = () => {
    console.error("Google Sign-In Failed");
    alert("Sign-In failed. Please try again.");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsSignedIn(false);
    alert("Signed out successfully!");
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 shadow-lg border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold ml-4">
          <a href="/" className="transition cursor-pointer hover:underline">
            Home
          </a>
        </div>
        <div className="flex items-center space-x-6">
          {isSignedIn && (
            <>
              <a href="/music" className="hover:underline">Music</a>
              <a href="/dashboard" className="hover:underline">My Dashboard</a>
              <a href="/stats" className="hover:underline">My Stats</a>
            </>
          )}

          {!isSignedIn ? (
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            />
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-4 py-2 rounded transition-all duration-200"
            >
              Sign Out
            </button>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
