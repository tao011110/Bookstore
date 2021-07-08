import React from 'react';
import {Link } from 'react-router-dom';
import {List, Button} from 'antd'
import {Book} from './Book'
import "../css/index.css"
import {getBooks} from "../services/bookService";

export class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            page: 0,
            pageable: 0
        };
    }

    listPageBooks=()=>{
        const callback = (data) => {
            console.log("woc666");
            this.setState({
                books:data.content,
                pageable: data
            });
            console.log(data) ;
            console.log(data.totalPages);
        };
        let json = new Object();
        json.page = this.state.page;

        getBooks(json, callback);
    }

    componentDidMount() {
        this.listPageBooks();
    }

    goLastPage=() =>{
        if(this.state.page > 0) {
            //this.setState({page: this.state.page - 1});
            this.state.page -= 1;
            console.log(this.state.page);
            this.listPageBooks();
        }
        else{
            window.alert("已达首页！");
        }
    }

    goNextPage=() =>{
        if(this.state.page < this.state.pageable.totalPages - 1) {
            //this.setState({page: this.state.page + 1});
            this.state.page += 1;
            console.log(this.state.page);
            this.listPageBooks();
        }
        else{
            window.alert("已达尾页！");
        }
    }

    render() {
        return (
            console.log("this.state.books"),
                console.log(this.state.books),
                <div>
                    <div>
                        <List
                            grid={{gutter:10, column: 4}}
                            dataSource={this.state.books}
                            //分页
                            // pagination={{
                            //     onChange: page => {
                            //         console.log(page);
                            //         this.setState({page: page - 1});
                            //         this.listPageBooks();
                            //     },
                            //     pageSize: 16,
                            // }}
                            renderItem={item => (
                                console.log("woc "),
                                    <List.Item>
                                        <Book info={item}/>
                                    </List.Item>
                            )}
                        />
                    </div>
                    <div className="pageButton">
                        <p>
                            <Button onClick={this.goLastPage}>上一页</Button>
                            当前<span>{this.state.page + 1}</span>页,总<span>{this.state.pageable.totalPages}</span>页
                            <Button onClick={this.goNextPage}>下一页</Button>
                        </p>
                    </div>
                </div>
        );
    }
}