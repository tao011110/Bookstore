import React from 'react';
import {Card, Input, Button, DatePicker} from 'antd';
import {Link } from 'react-router-dom';
import {List, Row, Col, Checkbox} from 'antd';
import './config';
import "../css/manage.css"
import PropTypes, {array} from "prop-types";
import {showAllBooks} from "../services/bookService";
import * as manageService from "../services/manageService"
import {findOrderItemsByTime, showAllOrders, showOneOrder, userFindOrderItemsByTime} from "../services/orderService";
import * as orderService from "../services/orderService";
const { Search } = Input;

const headers = ["order_id", "user_id", "totalmoney", "time", "books", "check"];

let list = []

let user = 0;
let user_type = 0;

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
            user: 0,
        };
        user = localStorage.getItem("user");
        user_type = localStorage.getItem("user_type");
        this.setState({user:user});
    }

    componentDidMount() {
        // const callback = (data) => {
        //     console.log("woc666");
        //     list.splice(0,list.length);
        //     for(let i in data){
        //         let l = [];
        //         l.push(data[i].order_id);
        //         l.push(data[i].user_id);
        //         l.push(data[i].totalmoney);
        //         l.push(data[i].time);
        //         console.log(data[i].books);
        //         let books = [];
        //         for(let j = 0; j < data[i].books.length; j++){
        //             books[j]= "《"+data[i].books[j]+"》";
        //         }
        //         l.push(books);
        //         console.log("(data[i].books)");
        //         console.log(l);
        //         list.push(l);
        //     }
        //     this.setState({
        //         preSearchData:list,
        //         data:list});
        //     console.log(list);
        // };
        // console.log("user_type  ", user_type);
        // if(user_type === "0") {
        //     showAllOrders({"search": null}, callback);
        // }
        // else{
        //     console.log("just a user!");
        //     let json = new Object();
        //     json.user_id = user;
        //     showOneOrder(json, callback);
        // }
        this.rangeDate("1970-01-01 00:00:01.0001", "2038-01-19 03:14:07.999");
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
            console.log(row[3]);
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };

    rangeDate = (min, max) => {
        // console.log("change");
        // console.log(this.state.preSearchData);
        // console.log("(min "+ min);
        // console.log("(max "+ max);
        //
        // let searchdata = this.state.preSearchData.filter(function (row) {
        //     console.log("???");
        //     let str = row[3].toString().substring(0, 10);
        //     console.log("str "+str);
        //     if(str >= min && str <= max){
        //         return true;
        //     }
        //     else{
        //         return false;
        //     }
        // });
        // list = [];
        // for(let i in searchdata){
        //     let l = [];
        //     l.push(searchdata[i][0]);
        //     l.push(searchdata[i][1]);
        //     l.push(searchdata[i][2]);
        //     l.push(searchdata[i][3]);
        //     console.log("searchdata");
        //     console.log(searchdata[i]);
        //     let books = [];
        //     for(let j = 0; j < searchdata[i][4].length; j++){
        //         books[j]= "《"+searchdata[i][4][j]+"》";
        //     }
        //     l.push(books);
        //     console.log("(data[i].books)");
        //     console.log(l);
        //     list.push(l);
        // }
        // this.setState({
        //     data: searchdata
        // });
        console.log("user_type " + user_type + typeof user_type);
        const callback = (data) => {
            let num = 0;
            let money = 0;
            console.log("woc666");
            console.log(data);
            list.splice(0,list.length);
            for(let i in data){
                let l = [];
                l.push(data[i].order_id);
                l.push(data[i].user_id);
                l.push(data[i].totalmoney);
                l.push(data[i].time);
                l.push(data[i].books);
                list.push(l);
            }
            this.setState({
                data:list,
                totalBook: num,
                totalMoney: money,
            });
            console.log(list);
        };
        if(parseInt(user_type) === 0) {
            let json = new Object();
            json.minDate = min;
            json.maxDate = max;
            orderService.findOrderByTime(json, callback);
        }
        else{
            console.log("just a user!");
            let json = new Object();
            json.minDate = min;
            json.maxDate = max;
            json.user_id = user;
            orderService.userFindOrderByTime(json, callback);
        }
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

    renderTable = () => {
        return (
            <div>

                <table  border={"1"}>
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
                    <tbody>
                    {this.renderSearch()}
                    {this.state.data.map(function (row, rowidx) {
                        return (
                            console.log("list"),
                                console.log(list),
                                <tr key={rowidx}>{
                                    row.map(function (cell, idx) {
                                        let content = cell;
                                        return <td key={idx} data-row={rowidx}>{content}</td>;
                                    }, this)}
                                    <td>
                                        <Link to={{pathname:'/OrderView', search: "?id=" + list[rowidx][0]}}
                                              target = "_blank">
                                            <Button type="primary" size={"large"}>
                                                查看详情
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                        );
                    }, this)}
                    </tbody>
                </table>
                <div>
                    <Input.Group compact>
                        <DatePicker.RangePicker style={{ width: '40%' }}
                                                onChange={(e)=>{
                                                    let min = e[0].format("YYYY-MM-DD").toString() + " 00:00:00";
                                                    let max = e[1].format("YYYY-MM-DD").toString() + " 00:00:00";
                                                    console.log(min);
                                                    console.log(max);
                                                    this.preSearchData = this.state.data;
                                                    this.rangeDate(min, max);
                                                }}
                        />

                    </Input.Group>
                    <br/>
                </div>
            </div>
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

export class OrderList extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: []
            })
        );
    }
}


export default OrderList;
