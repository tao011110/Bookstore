import {postRequest} from "../utils/ajax";

export const getItems = (data, callback) => {
    const url = 'http://localhost:8080/listItems';
    postRequest(url, data, callback);
};

export const addItem = (data, callback) => {
    const url = 'http://localhost:8080/addItem';
    postRequest(url, data, callback);
};

export const deleteItem = (data, callback) => {
    const url = 'http://localhost:8080/deleteItem';
    postRequest(url, data, callback);
};