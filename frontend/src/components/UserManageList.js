import React from 'react';
import {Input} from 'antd';
import './config';
import "../css/manage.css"
import PropTypes from "prop-types";
import * as manageService from "../services/manageService"
import {showAllUsers} from "../services/manageService";
const { Search } = Input;

const headers = ["user_id", "username", "user_type"];

const list = [];

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
            list.splice(0,list.length)
            for(let i in data){
                let l = [];
                l.push(data[i].user_id);
                l.push(data[i].username);
                l.push(data[i].userType);
                list.push(l);
            }
            this.setState({data:list});
            console.log(list);
        };
        showAllUsers({"search":null}, callback);
        console.log(list);
    }

    forbidSubmit=(e)=>{
        let json = new Object();
        console.log(list);
        json.user_id = e;
        json.user_type = -1;
        console.log("user_type  " + e);
        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateUserType(json, callback);
    }

    unforbidSubmit=(e)=>{
        let json = new Object();
        console.log(list);
        json.user_id = e;
        json.user_type = 1;
        console.log("user_type  " + e);
        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateUserType(json, callback);
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

    showEditor = (e) => {
        console.log("lslslslslsls");
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
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
                    <tbody>
                    {this.renderSearch()}
                    {this.state.data.map(function (row, rowidx) {
                        return (
                            <tr key={rowidx}>
                                {
                                    row.map(function (cell, idx) {
                                        let content = cell;
                                        let edit = this.state.edit;
                                        if(idx == 2) {
                                            if (edit && edit.row === rowidx && edit.cell === idx) {
                                                content = (
                                                    <form onSubmit={this.save}>
                                                        <Input type="text" defaultValue={cell} onPressEnter={
                                                            event => {
                                                                {
                                                                    console.log("change to " + event.target.value);
                                                                    let json = new Object();
                                                                    let arr = list[edit.row];
                                                                    console.log(list);
                                                                    json.user_id = arr[0];
                                                                    json.user_type = event.target.value;
                                                                    console.log("user_type  " + event.target.value);
                                                                    const callback = (data) => {
                                                                        console.log("call  " + data);
                                                                    }
                                                                    manageService.updateUserType(json, callback);
                                                                }
                                                            }
                                                        }/>
                                                    </form>
                                                );
                                            }
                                            return <td key={idx} data-row={rowidx}
                                                       onDoubleClick={this.showEditor}>{content}</td>;
                                        }
                                        else{
                                            return <td key={idx} data-row={rowidx} >{content}</td>;
                                        }
                                    }, this)}
                            </tr>
                        );
                    }, this)}
                    </tbody>
                </table>
                <div>
                    <div className="deleteBook">
                        <Search
                            placeholder="输入禁用用户的ID"
                            allowClear
                            enterButton="禁用"
                            size="large"
                            onSearch={(e)=>this.forbidSubmit(e)}
                        />
                    </div>
                    <div className="deleteBook">
                        <Search
                            placeholder="输入启用用户的ID"
                            allowClear
                            enterButton="启用"
                            size="large"
                            onSearch={(e)=>this.unforbidSubmit(e)}
                        />
                    </div>
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

export class UserManageList extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: []
            })
        );
    }
}


export default UserManageList;
