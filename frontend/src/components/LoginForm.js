import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {Link, Redirect, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/login.css';
import * as userService from '../services/userService'

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                userService.login(values);
                console.log('now  values of form: ', values);
            }
            else{
                window.alert("请确保输入用户名和密码！");
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    placeholder="Username"
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
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <Form.Item className="check">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign In!
                    </Button>
                    {/*{getFieldDecorator('remember', {*/}
                    {/*    valuePropName: 'checked',*/}
                    {/*    initialValue: true,*/}
                    {/*})(<Checkbox>Remember me</Checkbox>)}*/}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <div><Link to={'/RegisterView'}> register now!</Link></div>

                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm


