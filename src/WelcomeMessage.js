import React from "react";

const WelcomeMessage = () => {
  return (
    <div className="welcome-message">
        <div>  
            Thank you for exploring my project ! You can use the following user credentials to test the app: <br/>
            <div>  
            Email: <strong>guest@test.com</strong>
            <br />
            Password: <strong>guest</strong>
        </div>
        <div class="cursive">
            Feel free to log in, explore, and add some tasks. If you have any questions, don’t hesitate to
            reach out!
        </div>
    </div>
    </div>
  );
};

export default WelcomeMessage;
