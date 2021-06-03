import React from 'react';
import { Descriptions, Button } from 'antd';
import {Link } from 'react-router-dom';
import {CartBuy} from './CartBuy'
import './config';
import * as cartService from "../services/cartService";
import {history} from "../utils/history";
import * as orderService from "../services/orderService";
import {getBook} from "../services/bookService";

export class BookDetail extends React.Component{
    componentDidMount(){
        let user = localStorage.getItem("user");
        console.log("user  " + user);
        this.setState({user:user});
    }

    handleSubmit = e => {
        e.preventDefault();
        let num = 1;
        let user_id = this.state.user;
        let json = new Object();
        json.id = this.props.info.id;
        json.user_id = user_id;
        console.log(json.price);
        const callback = (data) => {
            console.log("callback " + data);
            if(data === false){
                window.alert("不可重复添加！");
            }
            else{
                window.alert("已成功添加！");
            }
        };
        cartService.addItem(json, callback);
    };

    handleClick2 = e =>{
        //e.preventDefault();
        let user_id = this.state.user;
        let json = new Object();
        json.user_id = user_id;
        json.totalmoney = this.props.info.price;
        json.book_id = this.props.info.id;
        json.num = 1;
        const callback = (data) => {
            console.log("call  " + data);
        }
        orderService.addOrderOne(json, callback);
    }

    render() {
        global.totalmoney = 0;
        global.buy =[];
        //console.log("已初始化");
        const {info} = this.props;//this.props.location.query.state
        if(info == null){
            return null;
        }
        console.log("ccc " + info);
        console.log("ccc " + info.id);

        info.number = 0;
        const addition={
            card:<CartBuy info={info}/>,
            information: info
        }

        return (
            <div className={"content"}>
                <div className={"center_con"}>
                    <div className={"main_menu"}>
                        <img alt="image" src={info.img} style={{width:"350px", height:"350px"}}/>
                    </div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>{info.author}</Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className={"button-groups"}>
                    <Button type="danger" icon="shopping-cart" size={"large"}
                            htmlType="submit" onClick={this.handleSubmit}
                    >
                        加入购物车
                    </Button>
                    <Link to={'/SubmitView'}>
                        <Button type="danger" icon="pay-circle" size={"large"} style={{marginLeft:"15%"}}ghost
                                onClick={onclick=>{
                                    info.num = 1;
                                    global.totalmoney = info.price;
                                    global.buy.push(info);
                                    this.handleClick2();
                                }}
                        >
                            立即购买
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}