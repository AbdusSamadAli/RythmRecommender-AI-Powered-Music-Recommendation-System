import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Backend login success:", data);
        localStorage.setItem("token", data.token); 
      } else {
        console.error("Backend login failed:", data);
      }
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };
  const handleLoginError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div style={{ marginTop: 100, textAlign: "center" }}>
      <h1>Login with Google</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
}
