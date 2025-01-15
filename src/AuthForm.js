import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";

import axios from "axios";

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(""); // Track username for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true); 

  // Toggle between login and signup modes
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || (!isLogin && !username)) {
      console.error("Please fill out all required fields.");
      return;
    }
  
    const payload = { email, password, ...(isLogin ? {} : { username }) };
    console.log("Payload being sent:", payload);
  
    try {
      const endpoint = `${process.env.REACT_APP_API_URL}/auth/${isLogin ? "login" : "signup"}`;
      const response = await axios.post(endpoint, payload);
  
      console.log("Auth response:", response.data);
      onLogin(response.data.userId); // Pass userId to parent App
      navigate("/main");
    } catch (error) {
      console.error("Error during authentication:", error.response?.data || error.message);
      alert("Authentication failed. Please try again.");
    }
  };
  return (
    <div>
      {showBanner && (
        <div>
          <WelcomeMessage />  
          <button onClick={() => setShowBanner(false)}>Dismiss </button>
        </div>
      )}
        <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3 className="auth-form-title">{isLogin ? "Login" : "Sign Up"}</h3>

            {/* Username field for signup */}
            {!isLogin && (
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            )}

            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit" className="btn-submit">
            {isLogin ? "Login" : "Sign Up"}
            </button>

            {/* Toggle link */}
            <p className="toggle-auth">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span onClick={toggleAuthMode} className="toggle-link">
                {isLogin ? "Sign Up" : "Login"}
            </span>
            </p>
        </form>
        </div>
    </div>
);
};

export default AuthForm;