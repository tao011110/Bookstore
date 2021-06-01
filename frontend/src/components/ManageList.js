import React from 'react';
import {Input} from 'antd';
import {Link } from 'react-router-dom';
import './config';
import "../css/manage.css"
import PropTypes from "prop-types";
import {showAllBooks} from "../services/bookService";
import * as manageService from "../services/manageService"

const headers = ["id", "author", "type", "inventory", "price", "name", "img", "description", "status"];

const list = []

class Excel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            preSearchData: null,
        };
    }

    componentDidMount() {
        const callback = (data) => {
            console.log("woc666");
            list.splice(0,list.length);
            for(let i in data){
                let l = [];
                l.push(data[i].id);
                l.push(data[i].author);
                l.push(data[i].type);
                l.push(data[i].inventory);
                l.push(data[i].price);
                l.push(data[i].name);
                l.push(data[i].img);
                l.push(data[i].description);
                l.push(data[i].status);
                list.push(l);
            }
            this.setState({data:list});
            console.log(list);
        };
        showAllBooks({"search":null}, callback);
    }

    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    };

    save = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
        });
    };

    toggleSearch = () => {
        if (this.state.search) {
            this.setState({
                data: this.preSearchData,
                search: false,
            });
            this.preSearchData = null;
        } else {
            this.preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
    };

    search = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.preSearchData});
            return;
        }
        let idx = e.target.dataset.idx;
        let searchdata = this.preSearchData.filter(function (row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };

    showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    };

    render = () => {
        return (
            <div className="manageMain">
                {this.renderToolbar()}
                {this.renderTable()}
            </div>
        );
    };

    renderToolbar = () => {
        return (
            <div className="toolbar">
                <button onClick={this.toggleSearch}>Search</button>
            </div>
        );
    };

    renderSearch = () =>  {
        if (!this.state.search) {
            return null;
        }
        return (
            <tr onChange={this.search}>
                {this.props.headers.map(function (ignore, idx) {
                    return <td key={idx}><input type="text" data-idx={idx} placeholder="请输入"/></td>;
                })}
            </tr>
        );
    };

    handleUpdateID=(arr)=>{

    }

    handleUpdateAuthor =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.author = arr[1];
        json.change = "author";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateType =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.type = arr[2];
        json.change = "type";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateInventory =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.inventory = arr[3];
        json.change = "inventory";
        console.log("inv");

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdatePrice =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.price = arr[4];
        json.change = "price";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateName =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.name = arr[5];
        json.change = "name";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateImg =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.img = arr[6];
        json.change = "img";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateDescription =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.description = arr[7];
        json.change = "description";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateStatus =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.status = arr[8];
        json.change = "status";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    renderTable = () => {
        return (
            <table>
                <thead onClick={this.sort}>
                <tr>{
                    this.props.headers.map(function (title, idx) {
                        if (this.state.sortby === idx) {
                            title += this.state.descending ? ' \u2191' : ' \u2193';
                        }
                        return <th key={idx}>{title}</th>;
                    }, this)
                }</tr>
                </thead>
                <tbody onDoubleClick={this.showEditor} >
                {this.renderSearch()}
                {this.state.data.map(function (row, rowidx) {
                    return (
                        <tr key={rowidx}>{
                            row.map(function (cell, idx) {
                                let content = cell;
                                let edit = this.state.edit;
                                if (edit && edit.row === rowidx && edit.cell === idx) {
                                    content = (
                                        <form onSubmit={this.save}>
                                            <Input type="text" defaultValue={cell} onPressEnter={
                                                event=>{
                                                    {
                                                        console.log(event.target.value);
                                                        let index = edit.row;
                                                        let tmpID = list[index][0];
                                                        list[edit.row][edit.cell] = event.target.value;
                                                        console.log("Now it is,  ",list[edit.row][edit.cell]);
                                                        console.log(list[edit.row][edit.cell]);
                                                        if(edit.cell == 0){
                                                            console.log("list[index][0]  " +list[index][0]);
                                                            list[index].id = event.target.value;
                                                            let arr = list[index];
                                                            let json = new Object();
                                                            json.id = arr[0];
                                                            json.author = arr[1];
                                                            json.name= arr[5];
                                                            json.change = "id";
                                                            const callback = (data) => {
                                                                console.log("call  " + data);
                                                                if(data == -1){
                                                                    window.alert("id不可重复，请立即还原为" + tmpID + "!")
                                                                }
                                                            }
                                                            manageService.updateBook(json, callback);
                                                        }
                                                        if(edit.cell == 1){
                                                            list[index].author = event.target.value;
                                                            this.handleUpdateAuthor(list[index]);
                                                        }
                                                        if(edit.cell == 2){
                                                            list[index].type = event.target.value;
                                                            this.handleUpdateType(list[index]);
                                                        }
                                                        if(edit.cell == 3){
                                                            list[index].inventory = event.target.value;
                                                            this.handleUpdateInventory(list[index]);
                                                        }
                                                        if(edit.cell == 4){
                                                            list[index].price = event.target.value;
                                                            this.handleUpdatePrice(list[index]);
                                                        }
                                                        if(edit.cell == 5){
                                                            list[index].name = event.target.value;
                                                            this.handleUpdateName(list[index]);
                                                        }
                                                        if(edit.cell == 6){
                                                            list[index].img = event.target.value;
                                                            this.handleUpdateImg(list[index]);
                                                        }
                                                        if(edit.cell == 7){
                                                            list[index].description = event.target.value;
                                                            this.handleUpdateDescription(list[index]);
                                                        }
                                                        if(edit.cell == 8){
                                                            list[index].isShow = event.target.value;
                                                            this.handleUpdateStatus(list[index]);
                                                        }
                                                        console.log(list[index]);
                                                    }
                                                }
                                            }/>
                                        </form>
                                    );
                                    console.log(edit);
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                        </tr>
                    );
                }, this)}
                </tbody>
            </table>
        );
    }
};

Excel.propTypes = {
    headers: PropTypes.arrayOf(
        PropTypes.string
    ),
    initialData: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.string
        )
    ),
};

export class ManageList extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: []
            })
        );
    }
}


export default ManageList;
