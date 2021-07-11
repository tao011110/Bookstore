import React from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {Link, Redirect, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/login.css';
import * as userService from '../services/userService'
import * as cartService from '../services/cartService'

class RegisterForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values.email);
                // if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(values.email))) {
                //     console.log('请输入正确的Email');
                //     window.alert("请输入正确的Email");
                // }
                console.log('Received password: ', values.password, typeof values.password2);
                console.log('Received password2: ', values.password2);
                if(values.password !== values.password2){
                    window.alert("两次输入的密码不一致！");
                }
                else{
                    const callback = (data1) => {
                        console.log(data1, typeof data1);
                        if(data1 == true){
                            window.alert("用户名重复！");
                        }
                        else{
                            const callback = (data) => {
                                console.log(data, typeof data);
                                let json2 = new Object();
                                json2.user_id = data.toString();
                                console.log(json2.user_id);
                                cartService.createCart(json2);
                            };
                            userService.register(values, callback);
                            window.alert("您已成功注册，请返回登录界面！");
                        }
                    };
                    let json = new Object();
                    json.username = values.username;
                    userService.findNameDup(json, callback);

                    console.log('now  values of form: ', values);
                }
            }
        });
    };

    handleUsername = e =>{
        console.log("e.value");
        console.log(e.target.value);
        let username = e.target.value;
        const callback = (data1) => {
            console.log(data1, typeof data1);
            if(data1 == true){
                message.info("用户名重复！");
            }
        };
        let json = new Object();
        json.username = username;
        userService.findNameDup(json, callback);
    }

    handleConfirmPassword = e =>{
        console.log("e.value");
        console.log(e.target.value);
        if(this.props.form.getFieldValue('password') != e.target.value){
            message.info("两次输入密码不一致！");
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Username can not be empty!' },
                                    {
                                        whitespace: true,
                                        message: 'Username can not be empty!',
                                    } ],
                            })(
                                <Input
                                    placeholder="Please input your username"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                    onChange={this.handleUsername}
                                />,
                            )}
                        </div>
                    </Form.Item>

                </div>
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码不得为空!' },
                                    {
                                        whitespace: true,
                                        message: 'Password can not be empty!',
                                    }],

                            })(
                                <Input
                                    type="password"
                                    placeholder="Please input your password"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('password2', {
                                rules: [{ required: true, message: '密码不得为空!' },
                                    {
                                        whitespace: true,
                                        message: 'Password can not be empty!',
                                    }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="Please confirm your password"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                    onChange={this.handleConfirmPassword}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '邮箱不得为空!' },
                                    {
                                        whitespace: true,
                                        message: 'email can not be empty!',
                                    }],
                            })(
                                <Input
                                    type="email"
                                    placeholder="Please input your email"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <Form.Item className="check">
                    {/*<Link to={'/'}>*/}
                    {/*</Link>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register!
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(RegisterForm);

export default WrappedLoginForm


