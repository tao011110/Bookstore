import {postRequest} from "../utils/ajax";
import React from "react";
import {history} from "../utils/history";

export const login = (data) => {
    const url = 'http://localhost:8080/login';
    const callback = (data1) => {
        console.log(data1);
        let user_id = parseInt(data1.user_id);
        let user_type = parseInt(data1.user_type);
        let username = data1.username;
        if(user_id > 0 && user_type !== -1)
        {
            localStorage.setItem("user",JSON.stringify(user_id));
            localStorage.setItem("user_type",JSON.stringify(user_type));
            localStorage.setItem("username",JSON.stringify(username));
            history.push("/HomeView");
        }
        if(user_type === -1){
            window.alert("您的账号已经被禁用！");
        }
        if(user_id === -1)
        {
            window.alert("账号密码错误，登陆失败！");
        }
    };
    postRequest(url, data, callback);
};

export const logout = (data) => {
    const url = 'http://localhost:8080/logout';
    const callback = ()=>{}
    postRequest(url, {}, callback);
}

export const register = (data, callback) => {
    const url = 'http://localhost:8080/register';
    history.push("/");
    postRequest(url, data, callback);
};

export const findNameDup = (data, callback) => {
    const url = 'http://localhost:8080/findNameDup';
    postRequest(url, data, callback);
};

export const checkSession = (callback) => {
    const url = 'http://localhost:8080/checkSession';

    console.log("begin check");
    postRequest(url, {}, callback);
    console.log("finish check");
};

export const checkUserType = (data, callback) => {
    const url = 'http://localhost:8080/checkUserType';
    postRequest(url, data, callback);
};
