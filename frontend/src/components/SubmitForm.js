import React from 'react';
import { Form, Input, Button, Checkbox, Table, Col, Row, Radio } from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import {Link} from "react-router-dom";
import * as orderService from "../services/orderService";
import * as cartService from "../services/cartService";
const { TextArea } = Input;

let dataSource = [];
function add(){
    var i = 0;
    for(i = 0; i < global.buy.length; i++){
        let isFind = false;
        let price = global.buy[i].price, num = global.buy[i].num;
        let total = price * num;
        for(let j = 0; j < dataSource.length; j++){
            if (dataSource[j].name == global.buy[i].name){
                isFind = true;
                dataSource.splice(j, 1, {
                    name: global.buy[i].name,
                    description: global.buy[i].description,
                    price: global.buy[i].price,
                    num: global.buy[i].num,
                    total: total
                })
                console.log("name:"+ global.buy[i].name+
                    "description: "+global.buy[i].description+
                    "price: "+global.buy[i].price+
                    "num:"+ global.buy[i].num+
                    "total: "+total)
                break;
            }
        }
        if(isFind == false) {
            dataSource.push({
                name: global.buy[i].name,
                description: global.buy[i].description,
                price: global.buy[i].price,
                num: global.buy[i].num,
                total: total
            });
        }
    }
    //console.log("????  " ,dataSource);
}
const columns = [
    {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '信息',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
    },
    {
        title: '小计',
        dataIndex: 'total',
        key: 'total',
    },
]

const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '50px',
};

class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0,
        }
        let user = localStorage.getItem("user");
        console.log("user  " + user + typeof user);
        this.state.user = parseInt(user);
        console.log("user  " + this.state.user);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleClick2 = e =>{
        //e.preventDefault();
        let user_id = this.state.user;
        console.log("suadaw  " +user_id);
        let json = new Object();
        json.user_id = user_id;
        json.totalmoney = global.totalmoney;
        json.books = global.checked;
        const callback = (data) => {
            console.log("call  " + data);
        }
        orderService.addOrder(json, callback);
        let json2 = new Object();
        let delArray = [];
        for(let i = 0; i < global.checked.length; i++){
            let book_id = global.buy[i].book_id;
            console.log("global.buy[i]  " + book_id);
            console.log(global.buy);
            delArray.push(book_id);
        }
        json2.id = delArray;
        json2.user_id = user_id;
        const callback2 = (data) => {
            console.log("call  " + data);
        }
        cartService.deleteItem(json2, callback2);
    }

    // handleClick = e =>{
    //     console.log("submit!");
    //     window.alert("您已成功提交订单！");
    // }


    render() {
        dataSource=[];
        console.log("buy", global.buy);
        add();
        console.log(dataSource);

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="deliver-form">
                    <div className="deliver-form-note">
                        地址信息:
                    </div>
                    <Form onSubmit={this.handleSubmit} className="address-form">
                        <Form.Item label="姓名" name="name" labelCol={{span: 4}} wrapperCol={{offset:1,span:17}}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入姓名！' }],
                                initialValue:'陶昱丞'
                            })(
                                <Input
                                    placeholder="长度不超过25个字符"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="邮编" name="mail" labelCol={{span: 4}} wrapperCol={{offset:1,span:17}}>
                            {getFieldDecorator('mail', {
                                rules: [{ required: true, message: '请输入邮编！' }],
                                initialValue:'201100'
                            })(
                                <Input
                                    placeholder="请填写邮编"
                                />,
                            )}

                        </Form.Item>
                        <Form.Item label="联系方式" name="phone" labelCol={{span: 4}} wrapperCol={{offset:1, span:17}}>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入联系方式!' }],
                                initialValue:'18211776509'
                            })(
                                <Input
                                    placeholder="电话号码、手机号码必须填一项"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="详细地址" name="address" labelCol={{span: 4}} wrapperCol={{offset:1, span:17}} style={{height:'300%'}}>
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: '详细地址长度需要在5-120个汉字或字符，不能包含表情符号' }],
                                initialValue:'上海交通大学'
                            })(
                                <TextArea
                                    placeholder="请输入详细地址信息，如道路、门牌号、校区、楼栋号、单元等信息"
                                    rows={4}
                                />,
                            )}
                        </Form.Item>
                    </Form>
                    <div className="invoice">
                        <div className="invoice-text">是否开具发票：</div>
                        <div className="invoice-radio">
                            <Radio.Group>
                                <Radio style={radioStyle} value={1}>
                                    不开具发票
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                    开具电子发票
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    开具纸质发票
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
                <div className="showTable">
                    <div className="showText">确认订单信息</div>
                    <Table dataSource={dataSource} columns={columns} />
                    <div className="showTable-banner"></div>
                    <Row>
                        <Col span={12}>
                            <div>
                                <Checkbox>菜鸟驿站代收</Checkbox>
                            </div>
                        </Col>
                        <Col span={8} offset={2}>
                            <div>
                                运送方式： 普通配送 快递 免邮
                            </div>
                        </Col>
                        <Col span={2}>
                            <div className={"freight"}>
                                ￥0
                            </div>
                        </Col>
                    </Row>
                    <div className="showTable-banner"></div>
                    <Row>
                        <Col span={12}>
                            <div>
                                给卖家留言：
                                <TextArea
                                    placeholder="选填，请先和商家协商一致"
                                    rows={4}
                                />,
                            </div>
                        </Col>
                        <Col span={10} offset={2}>
                            <div className="submit-total">
                                合计（含运费）：<span className="total">￥{global.totalmoney}</span>
                            </div>
                            <div className="submit-button">
                                <Row>
                                    <Col span={11}>
                                        <Link  to={'/ShoppingCartView'}>
                                            <Button>返回购物车</Button>
                                        </Link>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Button onClick={handleClick=>{
                                            console.log("submit!");
                                            window.alert("您已成功提交订单！");
                                            this.handleClick2();
                                        }
                                        }>提交订单</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const WrappedSubmitForm = Form.create({ name: 'normal_login' })(SubmitForm);

export default WrappedSubmitForm
