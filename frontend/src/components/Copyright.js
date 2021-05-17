import React from "react";
import '../css/copyright.css'


export class Copyright extends React.Component {
    render(){
        return(
            <div className="copyright text-center">
                <p>© 2021.5 Bookstore. All rights reserved | Design by
                    <a href="mailto:taoyucheng@sjtu.edu.cn">Tao Yucheng</a>
                </p>
            </div>
        );
    }
}

