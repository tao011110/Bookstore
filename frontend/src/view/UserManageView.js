import React from "react";
import {HeaderInfo} from "../components/HeaderInfo";
import {Copyright} from "../components/Copyright";
import UserManageList from "../components/UserManageList";
import "../css/manage.css"

class UserManageView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }
    render(){
        return(
            <div className="manageBack">
                <div>
                    <HeaderInfo/>
                </div>
                <div>
                    <UserManageList/>
                </div>
                <div>
                    <Copyright/>
                </div>
            </div>
        )
    }
}

export default UserManageView;