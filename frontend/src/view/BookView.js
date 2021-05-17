import React from 'react';
import '../css/detail.css'
import '../css/search.css'
import {BookDetail} from "../components/BookDetail";
import {HeaderInfo} from "../components/HeaderInfo";
import {Copyright} from "../components/Copyright";
import SearchBox from "../components/SearchBar";
import {getBook} from "../services/bookService";

class BookView extends React.Component{
    constructor(props) {
        super(props);

        this.state = {books:null};
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        getBook(bookId, (data) => {this.setState({ info: data})})
    }

    render(){
        console.log(this.state.info);
        return(
            <div>
                <div>
                    <HeaderInfo/>
                </div>
                <div  className="detail-layout">
                    <div className="search-box">
                        <SearchBox/>
                    </div>
                    <div className="home-content">
                        <BookDetail info={ this.state.info } />
                    </div>
                </div>
                <div>
                    <Copyright/>
                </div>
            </div>
        );
    }
}

export default BookView;