import React from 'react';
import {Input} from 'antd';
import {Link } from 'react-router-dom';
import './config';
import "../css/manage.css"
import PropTypes from "prop-types";

const headers = ["name", "author", "type", "inventory", "price", "id", "description", "show"];

const data1 = global.allBooks;

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
                                                        global.allBooks[edit.row][edit.cell] = event.target.value;
                                                        console.log("Now it is,  ",global.allBooks[edit.row][edit.cell]);
                                                        console.log(global.allBooks[edit.row][edit.cell]);
                                                        var index = edit.row;
                                                        if(edit.cell == 0){
                                                            global.showBooks[index].name = event.target.value;
                                                        }
                                                        if(edit.cell == 1){
                                                            global.showBooks[index].author = event.target.value;
                                                        }
                                                        if(edit.cell == 2){
                                                            global.showBooks[index].type = event.target.value;
                                                        }
                                                        if(edit.cell == 3){
                                                            global.showBooks[index].inventory = event.target.value;
                                                        }
                                                        if(edit.cell == 4){
                                                            global.showBooks[index].price = event.target.value;
                                                        }
                                                        if(edit.cell == 5){
                                                            global.showBooks[index].id = event.target.value;
                                                        }
                                                        if(edit.cell == 6){
                                                            global.showBooks[index].description = event.target.value;
                                                        }
                                                        if(edit.cell == 7){
                                                            global.showBooks[index].isShow = event.target.value;
                                                        }
                                                        console.log(global.showBooks[index]);
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
                initialData: data1
            })
        );
    }
}


export default ManageList;
