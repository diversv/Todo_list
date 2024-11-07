import React, {useState} from "react";

const LoginForm =  ({}) => {
    let [authMode, setAuthMode]=useState("signin");

    const changeAuthMode = () => {
        setAuthMode(authMode==="signin" ? "signup" : "signin")
    };

    
    return (
        <div className = "Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form3">
                        <label> Email address</label>
                        <input
                            id="emailid"
                            type="email"
                            className="form-control-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form3">
                        <label> Password</label>
                        <input
                            id="passwordid"
                            type="password" 
                            className="form-control-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="form-grid">
                        <button type= "submit" className="btn-submit">Submit</button>
                    </div>
                </div>    
            </form>
        </div>
    )
};

export default LoginForm;