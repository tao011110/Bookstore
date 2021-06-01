import {postRequest} from "../utils/ajax";

export const updateBook = (data, callback) => {
    const url = 'http://localhost:8080/updateBook';
    postRequest(url, data, callback);
};