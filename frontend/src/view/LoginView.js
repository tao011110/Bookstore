import React from 'react';
import LoginForm from "../components/LoginForm";

class LoginView extends React.Component{
    render(){
        return(
            <div className="main">
                <div className="bottom-grid">
                    <div className="logo">
                        <h1> My Bookstore Login</h1>
                    </div>
                </div>
                <div className="login-content">
                    <div className="content-bottom">
                        <LoginForm/>
                    </div>

                </div>
                <div class="copyright1">
                    <p>&copy; 2021.3 Bookstore. All Rights Reserved | Template by
                        <a a href="mailto:taoyucheng@sjtu.edu.cn">Tao Yucheng</a></p>
                </div>
            </div>
        );

    }
}

export default LoginView;