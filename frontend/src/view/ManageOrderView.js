import React from 'react';
import {HeaderInfo} from "../components/HeaderInfo";
import {Copyright} from "../components/Copyright";
import OrderList from "../components/OrderList";
import "../css/manage.css"

class ManageView extends React.Component {
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

export default ManageView;