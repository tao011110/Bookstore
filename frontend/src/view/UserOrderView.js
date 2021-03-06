import React from 'react';
import {HeaderInfo} from "../components/HeaderInfo";
import {Copyright} from "../components/Copyright";
import ManageList from "../components/ManageList";
import "../css/manage.css"
import OrderList from "../components/OrderList";

class UserOrderView extends React.Component {
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
                    <OrderList/>
                </div>
                <div>
                    <Copyright/>
                </div>
            </div>
        )
    }
}

export default UserOrderView;