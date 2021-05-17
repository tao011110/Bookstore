import React from 'react';
import {Card, Row, Col, Checkbox, List} from 'antd';
import "../css/shoppingCart.css"
import NumberBox from "./NumberBox";
import ShoppingList from "./ShoppingList";
import {Link} from "react-router-dom";

const { Meta } = Card;

/*function onChange(e) {
    console.log(`checked = info.name`);
}*/

export class CartBuy extends React.Component{
    constructor(props){
        super(props);
        this.state={
            total: global.totalmoney,
        }
    }

    render() {
        const {info} = this.props;
        return (
            console.log("got id    "+info.item_id),
                <Link to={{pathname:'/BookView', search: "?id=" + info.item_id}}
                      target = "_blank">
                    <Card
                        hoverable
                        style={{width: 690}}
                        //onClick={this.showBookDetails.bind(this, info.bookId)}
                        className="cart-grid"
                    >
                        <Row>
                            <Col span={5}>
                                {<img alt="image" src={info.img} className={"cart-book-img"}/>}
                            </Col>
                            <Col span={5} offset={2}>
                                <div  className="book-name">
                                    <Meta title={info.name}/>
                                </div>

                            </Col>
                            <Col span={4} offset={2}>
                                <div  className="single-price">
                                    <Meta description={'¥' + info.price}/>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Link>
        );
    }
}

export default CartBuy;

