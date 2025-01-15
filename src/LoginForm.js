import React, { useState } from "react";
import WelcomeMessage from "./WelcomeMessage"; // Import the banner

const LoginForm = () => {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <div>
      {/* Add the WelcomeMessage banner */}
      <WelcomeMessage />
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group">
              <label>Email address</label>
              <input
                id="emailid"
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                id="passwordid"
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-grid">
              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
