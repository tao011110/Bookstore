import React from 'react';
import {Link } from 'react-router-dom';
import {List} from 'antd'
import {Book} from './Book'
import "../css/index.css"
import {getBooks} from "../services/bookService";

export class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {books:[]};
    }

    componentDidMount() {
        /*this.timerID = setInterval(
            () => {
                show();
                this.setState({books: bookInfo})
            },
            2000
        );*/
        const callback = (data) => {
            console.log("woc666");
            this.setState({books:data});
            console.log(data) ;
        };
        getBooks({"search":null}, callback);
    }
    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }
    render() {
        return (
            console.log("this.state.books"),
            console.log(this.state.books),
            <List
                grid={{gutter:10, column: 4}}
                dataSource={this.state.books}
                //分页
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 16,
                }}
                renderItem={item => (
                    //console.log(item.information),
                    console.log("woc "),
                    <List.Item>
                        {/*<Link to={{pathname:'/BookView', state:{information: item.information}}}>
                            {item.card}
                        </Link>*/}
                        <Book info={item}/>
                    </List.Item>
                )}
            />
            /*<div>
                <Book props={bookInfo}></Book>
            </div>*/
        );
    }
}