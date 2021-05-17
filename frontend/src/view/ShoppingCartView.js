import React from 'react';
import '../css/shoppingCart.css'
import {HeaderInfo} from "../components/HeaderInfo";
import {ShoppingList} from "../components/ShoppingList";
import {Copyright} from "../components/Copyright";

class shoppingCartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items:null};
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render(){
        return(
            <div>
                <div>
                    <HeaderInfo/>
                </div>
                <div>
                    <ShoppingList />
                </div>
                <div>
                    <Copyright/>
                </div>
            </div>
        )
    }
}

export default shoppingCartView;