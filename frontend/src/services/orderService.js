import {postRequest} from "../utils/ajax";

export const addOrder = (data, callback) => {
    const url = 'http://localhost:8080/addOrder';
    postRequest(url, data, callback);
};

export const addOrderOne = (data, callback) => {
    const url = 'http://localhost:8080/addOrderOne';
    postRequest(url, data, callback);
};

export const showAllOrders = (data, callback) => {
    const url = 'http://localhost:8080/showAllOrders';
    postRequest(url, data, callback);
};