import React from 'react';
import "../css/index.css"
import '../css/search.css'
import SearchBox from '../components/SearchBar'
import {BookList} from "../components/BookList";
import {HeaderInfo} from "../components/HeaderInfo";
import {Copyright} from "../components/Copyright";

class HomeView extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render(){
        return(
            <div className="banner">
                <div>
                    <HeaderInfo/>
                </div>
                <div>
                    <h1 className="home-title">My Bookstore</h1>
                </div>
                <div>
                    <div className="search-box">
                        <SearchBox/>
                    </div>
                    <div className="home-container">
                        <div>
                            <BookList />
                        </div>
                    </div>
                </div>

                <div>
                    <Copyright/>
                </div>

            </div>

        );
    }
}

export default HomeView;