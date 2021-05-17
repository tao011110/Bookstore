import React from 'react';
import { Card } from 'antd';
import "../css/index.css"
import {Link } from 'react-router-dom';
const { Meta } = Card;

export class Book extends React.Component{
    render() {
        const {info} = this.props;
        console.log(info.author);
        return (
            //<Link to={{pathname:'/BookView', state:{information: item.information}}}>
            <Link to={{pathname:'/BookView', search: "?id=" + info.id}}
            target = "_blank">
                <Card
                    hoverable
                    style={{width: 180}}

                    cover={<img alt="image" src={info.img} className={"img"}/>}
                    //onClick={this.showBookDetails.bind(this, info.bookId)}
                    className="home-cart-grid"
                >
                    <Meta title={info.name} description={'¥' + info.price}/>
                </Card>
            </Link>
        );
    }
}

