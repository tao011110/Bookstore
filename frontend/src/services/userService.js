import {postRequest} from "../utils/ajax";
import React from "react";
import {history} from "../utils/history";

export const login = (data) => {
    const url = 'http://localhost:8080/login';
    const callback = (data1) => {
        console.log("wd  "+ data1);
        if(data1 == -1){
            window.alert("您的账号已经被禁用");
        }
        if(data1 > 0)
        {
            localStorage.setItem("user",JSON.stringify(data1));
            history.push("/HomeView");
        }
    };
    postRequest(url, data, callback);
};

export const checkSession = (callback) => {
    const url = 'http://localhost:8080/checkSession';

    console.log("begin chec");
    postRequest(url, {}, callback);
    console.log("finish chec");
};
