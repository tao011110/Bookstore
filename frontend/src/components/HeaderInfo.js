import React from 'react';
import {Link } from 'react-router-dom';
import { Row, Col, Menu, Input } from 'antd';
import '../css/header.css'
import './config'
import shoppingIcon from '../assets/shopping_icon.png';
import * as userService from '../services/userService'
const { SubMenu } = Menu;
const { Search } = Input;
const onSearch = value => console.log(value);

export class HeaderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_menu: true,
            manager_menu: true
        };
    }
    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
        let user_type = localStorage.getItem("user_type");
        console.log(localStorage.getItem("username"));
        this.setState({user_type:user_type});
        console.log("usertype " + user_type)
        if(user_type === "1"){
            this.setState({
                user_menu:false,
                manager_menu:true
            });
        }
        else{
            this.setState({
                user_menu:true,
                manager_menu:false
            });
        }
    }
    logOut(){
        localStorage.removeItem('user');
        localStorage.removeItem('user_type');
        localStorage.removeItem('username');
        global.isAu = false;
        userService.logout();
    }

    render(){
        let username = localStorage.getItem("username");
        console.log(username);
        return(
            <div>
                <div className="header">
                    <Row>
                        <Col span = {5}>
                            <div className="menu_hd">您好，欢迎来到My Bookstore！</div>
                        </Col>
                        <Col span = {2}>
                            <div className="switchToLogin">
                                <Link to={'/'}>
                                    <div className="menu_hd">{username}</div>
                                </Link>
                            </div>
                        </Col>
                        <Col span = {2}>
                            <div className="menu_hd">免费注册</div>
                        </Col>
                        <Col span = {2} offset={6}>
                            <div className="menu_hd">我的订单</div>
                        </Col>
                        <Col span = {2}>
                            <div className="menu_hd">服务中心</div>
                        </Col>
                        <Col span = {2}>
                            <div className="menu_hd">商家入驻</div>
                        </Col>
                        <Col span = {3}>
                            <div className="menu_hd_guide">
                                <Menu>
                                    <SubMenu key="headerMenu" title="网站导航">
                                        <Menu.Item key="1" hidden={this.state.user_menu}>
                                            <Link to={'/ShoppingCartView'}>
                                                <div className="cart">
                                                    <Row>
                                                        <Col span={24}>
                                                            <div className="menu_hd_cart">
                                                                <Menu>
                                                                    <SubMenu key="shoppingCart" icon={shoppingIcon} title="购物车">
                                                                        {/*<Menu.Item key="1"><span><img src={img1} alt="item1"  className="home-cart-item-img"/></span>Java核心技术卷II<span className="home-cart-item-price">￥95.20</span></Menu.Item>*/}
                                                                        {/*<Menu.Item key="2"><span><img src={img2} alt="item2"  className="home-cart-item-img"/></span>深入理解计算机系统<span className="home-cart-item-price">￥136.90</span></Menu.Item>*/}
                                                                        {/*<Menu.Item key="3"><span><img src={img3} alt="item3"  className="home-cart-item-img"/></span>Effective C++<span className="home-cart-item-price">￥51.30</span></Menu.Item>*/}
                                                                    </SubMenu>
                                                                </Menu>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to={'/HomeView'}>
                                                <div>
                                                    网站首页
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="3" hidden={this.state.manager_menu}>
                                            <Link to={'/ManageView'}>
                                                <div>
                                                    管理书籍界面
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="4" hidden={this.state.manager_menu}>
                                            <Link to={'/ManageUserView'}>
                                                <div>
                                                    管理用户界面
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="5" hidden={this.state.manager_menu}>
                                            <Link to={'/ManageOrderView'}>
                                                <div>
                                                    管理员订单界面
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="6" hidden={this.state.user_menu}>
                                            <Link to={'/UserOrderView'}>
                                                <div>
                                                    用户订单界面
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="7">
                                            <Link to={'/BookStatisticsView'}>
                                                <div>
                                                    统计书籍界面
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="8" hidden={this.state.manager_menu}>
                                            <Link to={'/UserStatisticsView'}>
                                                <div>
                                                    统计用户界面
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="9" onClick={this.logOut}>
                                            <Link to={'/'}>
                                                <div>
                                                    退出登录
                                                </div>
                                            </Link>
                                        </Menu.Item>

                                    </SubMenu>
                                </Menu>
                            </div>
                        </Col>
                    </Row>

                </div>
                <div className="banner_red_top"/>
            </div>
        );
    }
}

function ActionLink() {
    console.log("wasd");
    return (
        <Link to={'/ShoppingCartView'}>
        </Link>
    );
}