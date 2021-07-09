import React from "react";
import {CartBuy} from "./CartBuy";
import {Button, Descriptions, input} from "antd";
import {Link} from "react-router-dom";
import {findOneOrder, findOrderItems, showAllOrders} from "../services/orderService";
import PropTypes from "prop-types";
import {getBook, showAllBooks} from "../services/bookService";

const headers = ["name", "price", "num", "time"];

let list = []

let id = 0;

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
        console.log("wad");
        const order_id = id;
        console.log(typeof order_id+ "  wwworder_id  " + order_id);
        console.log(order_id);
        this.setState({ id: order_id});
        console.log("wccccc " + order_id);
        findOrderItems(parseInt(order_id), (data) => {
            list.splice(0,list.length);
            console.log("data666");
            console.log(data.order_itemlist);
            for(let i = 0; i < data.order_itemlist.length; i++){
                let l = [];
                l.push(data.order_itemlist[i].name);
                console.log(data.order_itemlist[i].name);
                l.push(data.order_itemlist[i].price);
                l.push(data.order_itemlist[i].num);
                l.push(data.order_itemlist[i].time);
                list.push(l);
            }
            this.setState({ data: list});});
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
                            <tr key={rowidx}>{
                                row.map(function (cell, idx) {
                                    let content = cell;
                                    return <td key={idx} data-row={rowidx}>{content}</td>;
                                }, this)}
                            </tr>
                        );
                    }, this)}
                    </tbody>
                </table>
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

export class OrderDetail extends React.Component{
    render() {
        // console.log("this.props"+this.props);
        // const {info} = this.props;   //this.props.location.query.state
        // if(order_id == null){
        //     console.log("null  ");
        //     return null;
        // }
        // console.log("OrderDetail  " +info);
        // console.log(typeof info);
        // order_id = info;
        // console.log(order_id);
        const {info} = this.props;
        console.log("???  " + info  + "  " +typeof info);
        id = parseInt(info);
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: [],
            })
        );
    }
}