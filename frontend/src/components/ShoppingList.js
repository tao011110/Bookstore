import React from 'react';
import {List, Row, Col, Checkbox, Button} from 'antd';
import {Link } from 'react-router-dom';
import Check from "./Check";
import CartBuy from "./CartBuy";
import ShoppingListCard from "./ShoppingListCard";
import "../css/shoppingCart.css"
import './config';
import {getItems} from "../services/cartService";
import * as cartService from "../services/cartService";
import * as orderService from "../services/orderService";

export class ShoppingList extends React.Component{
    delArray = [];
    isChanged = true;

    callback=()=>{
        console.log(global.totalmoney);
        console.log(typeof global.totalmoney);

        this.setState({total: global.totalmoney});
    }

    handleClick = e =>{
        //e.preventDefault();
        let user_id = this.state.user;
        let json = new Object();
        json.id = this.delArray;
        json.user_id = user_id;
        const callback = (data) => {
            console.log("call  " + data);
        }
        cartService.deleteItem(json, callback);
    }

    constructor(props) {
        super(props);
        global.totalmoney = 0;
        global.buy =[];
        global.checked =[];
        console.log("已清空", global.buy);
        this.state = {
            total: global.totalmoney,
            items:[],
            user: 0,
        }
        let user = localStorage.getItem("user");
        console.log("user  " + user + typeof user);
        this.state.user = parseInt(user);
        console.log("user  " + this.state.user);
    }

    componentDidMount() {
        const callback = (data) => {
            console.log("data33");
            console.log(data);
            this.setState({items:data.cart_itemlist});
        }
        this.timerID = setInterval(
            () => {
                if(this.isChanged == true) {
                    let user_id = this.state.user;
                    let json = new Object();
                    json.user_id = user_id;
                    console.log("suadaw  " +this.state.user);
                    getItems(json, callback);
                    this.setState({dataSource: this.state.items});
                    this.isChanged = false;
                    global.buy =[];
                    global.checked =[];
                }
            },
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className="cart-main">
                <div>
                    <h1 className="shopping-cart-title">My Shopping Cart</h1>
                </div>
                <div className="cart-container">
                    <div className="main-bar">
                        <Row>
                            <Col span={4} offset={6}>
                                <div className="cart-title">商品信息</div>
                            </Col>
                            <Col span={4} offset={4}>
                                <div className="cart-title">单价</div>
                            </Col>
                            <Col offset={2} span={3}>
                                <div className="cart-title">数量</div>
                            </Col>
                        </Row>
                    </div>
                    <List
                        grid={{column: 1}}
                        //dataSource={global.book}
                        dataSource={this.state.items}
                        //分页
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 4,
                        }}
                        renderItem={item => (
                            global.book.push(item),
                            console.log(item),
                                <List.Item>
                                    <ShoppingListCard callback={this.callback} info={item}/>
                                    {/*<Row>*/}
                                    {/*    <Col span={16}>*/}
                                    {/*        <CartBuy info={item}/>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col span={8}>*/}
                                    {/*        <div className="cartCheck">*/}
                                    {/*            <Check callback={this.callback} info={item}/>*/}
                                    {/*        </div>*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
                                </List.Item>
                        )}
                    />
                    <div className="cart-menu">
                        <div>
                            <div className="total-money">
                                总价：<span className="cal">￥{this.state.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="delete">
                            <Button onClick={onClick=>
                            {
                                let i, j;
                                for(j = 0; j < global.checked.length; j++) {
                                    for (i = 0; i < global.book.length; i++) {
                                        if (global.book[i].name === global.checked[j].name) {
                                            this.delArray.push(global.book[i].book_id);
                                            global.book.splice(i, 1);
                                            global.checked.splice(j, 1);
                                            j--;
                                            break;
                                        }
                                    }
                                }
                                this.handleClick();
                                this.delArray=[];
                                this.isChanged = true;
                            }}>删除</Button>
                        </div>
                        <div className="submit">
                            <Link to={'/SubmitView'}>
                                <Button onClick={onClick=>
                                {
                                    global.buy = global.checked;
                                    global.orderFrom = "cart";
                                    this.isChanged = true;
                                }}>结算</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingList;
