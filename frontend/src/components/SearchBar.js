import React from 'react';
import PropTypes from 'prop-types';
import '../css/search.css'

import {Book} from './Book'
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';
import img10 from '../assets/img10.jpg';
import img11 from '../assets/img11.jpg';
import img12 from '../assets/img12.jpg';
import img13 from '../assets/img13.jpg';
import img14 from '../assets/img14.jpg';
import img15 from '../assets/img15.jpg';

const headers = ["Book"];

const info1={
    name:"Java核心技术卷II",
    author: '凯S.霍斯特曼',
    type: '编程',
    inventory: 500,
    price: '95.20',
    id: 1,
    img: img1,
    description: '本书是Java领域有影响力和价值的著作之一，由拥有20多年教学与研究经验的Java技术专家撰写（获Jolt大奖），与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。第10版根据JavaSE8全面更新',

}
const info2={
    name:"深入理解计算机系统",
    author: '凯S.霍斯特曼',
    type: '编程',
    inventory: 500,
    price: '136.90',
    id: 2,
    img: img2,
    description: '程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！',
}
const info3={
    name:"Effective C++",
    author: '梅耶',
    type: '编程',
    inventory: 500,
    price:'51.30',
    id: 3,
    img: img3,
    description: '大师名著纵横二十载，稳居任一荐书单三甲；称职程序员傍身绝学，通向C++精微奥妙之门。'
}
const info4={
    name:'小王子',
    author: '圣-埃克苏佩里',
    type: '儿童文学',
    inventory: 500,
    price:'8.89',
    id: 4,
    img: img4,
    description: '豆瓣9.7高分推荐！旅法翻译家梅子涵之女梅思繁法文直译，舒朗大开本，央美教授高精度还原原作插画。首次收录全球舞台剧、音乐会、电影、动画片等对《小王子》的精彩诠释，通晓名作的前世今生。'
}
const info5={
    name:'Java编程思想',
    author: 'Bruce Eckel',
    type: '编程',
    inventory: 500,
    price:'91.20',
    id: 5,
    img: img5,
    description:  'Java学习必读经典,殿堂级著作！赢得了全球程序员的广泛赞誉。'
}
const info6={
    name:'魔兽世界编年史套装(全三卷)',
    author: '克里斯˙梅森',
    type: '魔幻小说',
    inventory: 500,
    price:'449.20',
    id: 6,
    img: img6,
    description: '暴雪官方历时二十年编纂而成的史料！三卷《魔兽世界编年史》将呈现大量从未公布的精美原画和插图，读者在阅读故事之余，更能享受一次视觉上的饕餮盛宴，是魔兽粉丝收藏的优选。'

}
const info7={
    name:'三体：全三册',
    author: '刘慈欣',
    type: '科幻小说',
    inventory: 500,
    price:'50.20',
    id: 7,
    img: img7,
    description: '刘慈欣代表作，亚洲首部“雨果奖”获奖作品！'
}
const info8={
    name:'悲惨世界（上中下）（精装版）',
    author: '雨果',
    type: '世界名著',
    inventory: 500,
    price:'104.00',
    id: 8,
    img: img8,
    description: '《悲惨世界》是雨果在流亡期间写的长篇小说，是他的代表作，也是世界文学宝库的珍品之一。\r\n    《悲惨世界》通过冉阿让等人的悲惨遭遇以及冉阿让被卞福汝主教感化后一系列令人感动的事迹，深刻揭露和批判了19世纪法国封建专制社会的腐朽本质及其罪恶现象，对穷苦人民在封建重压下所遭受的剥削欺诈和残酷迫害表示了悲悯和同情。'

}
const info9={
    name:'动物农场',
    author: '乔治·奥威尔',
    type: '社会小说',
    inventory: 500,
    price:'20.40',
    id: 9,
    img: img9,
    description: '也译“动物庄园”，是“一代人的冷峻良知”乔治·奥威尔经典的讽喻之作。虽然这一场荒诞的动物革命走向歧途，但正是因为这样我们才了解“把权力关进制度的笼子”的重要性。'
}
const info10={
    name:'机器学习',
    author: '周志华',
    type: '编程',
    inventory: 500,
    price:'61.60',
    id: 10,
    img: img10,
    description: '击败AlphaGo的武林秘籍，赢得人机大战的必由之路：人工智能大牛周志华教授巨著，全面揭开机器学习的奥秘。'

}
const info11={
    name:'纳尼亚传奇',
    author: '梅耶',
    type: '刘易斯',
    inventory: 500,
    price:'86.20',
    id: 11,
    img: img11,
    description:'刘易斯基金会独家授权插图！翻译家吴岩，陈良廷，刘文澜经典译本！'
}
const info12={
    name:'老人与海',
    author: '海明威',
    type: '世界名著',
    inventory: 500,
    price: '27.80',
    id: 12,
    img: img12,
    description:'收录诺贝尔文学奖获奖作品《老人与海》《乞力马扎罗的雪》，深深影响了马尔克斯、塞林格等文学家的创作理念。'
}
const info13={
    name:'魔力的胎动',
    author: '东野圭吾',
    type: '悬疑/推理小说',
    inventory: 500,
    price:'35.90',
    id: 13,
    img: img13,
    description: '喜欢《解忧杂货店》，就一定要读这本书。珍藏印签。有了想要守护的东西，生命就会变得有力量。悲凉的人生、千疮百孔的命运、一桩桩悲剧的发生与救赎，读来令人喟叹不已。'
}
const info14={
    name:'我不怕这漫长黑夜',
    author: '苑子豪',
    type:'青春文学',
    inventory: 500,
    price:'37.50',
    id: 14,
    img: img14,
    description:'七篇寻光故事，七种奇遇人生，送给成长路上孤独前行的你，每个人的生活都有被困在井里一样的绝望时刻，而这本书就想做点亮黑夜的那束光芒。耐心一些，保持相信，我们终会穿越漫长黑夜，抵达属于自己的黎明。'
}
const info15={
    name:'永久记录',
    author: '爱德华·斯诺登',
    type: '传记文学',
    inventory: 500,
    price:'56.70',
    id: 15,
    img: img15,
    description: '美国政府不想让全世界读到这本书，欧美上市当日作者便被美国司法部起诉！“棱镜门”主角爱德华·斯诺登首次亲自披露美国政府滥用NSA系统监控世界的真相，袒露从“爱国者”到“叛国者”的心路历程。'
}

const onSearch = value => console.log(value);

const bookInfo=[
    <Book info={info1}/>,
    <Book info={info2}/>,
    <Book info={info3}/>,
    <Book info={info4}/>,
    <Book info={info5}/>,
    <Book info={info6}/>,
    <Book info={info7}/>,
    <Book info={info8}/>,
    <Book info={info9}/>,
    <Book info={info10}/>,
    <Book info={info11}/>,
    <Book info={info12}/>,
    <Book info={info13}/>,
    <Book info={info14}/>,
    <Book info={info15}/>,
];

const data1 = [["Java核心技术卷II",<img src={img1} className="search-img"/>],
    ["深入理解计算机系统",<img src={img2} className="search-img"/>],
    ["Effective C++",<img src={img3} className="search-img"/>],
    ["小王子",<img src={img4} className="search-img"/>],
    ["Java编程思想",<img src={img5} className="search-img"/>],
    ["魔兽世界编年史套装(全三卷)",<img src={img6} className="search-img"/>],
    ["三体：全三册",<img src={img7} className="search-img"/>],
    ["悲惨世界（上中下）（精装版）",<img src={img8} className="search-img"/>],
    ["动物农场",<img src={img9} className="search-img"/>],
    ["机器学习",<img src={img10} className="search-img"/>],
    ["纳尼亚传奇",<img src={img11} className="search-img"/>],
    ["老人与海",<img src={img12} className="search-img"/>],
    ["魔力的胎动",<img src={img13} className="search-img"/>],
    ["我不怕这漫长黑夜",<img src={img14} className="search-img"/>],
    ["永久记录",<img src={img15} className="search-img"/>],];

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


    render = () => {
        return (
            <div>
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
                <tbody>
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
                                            <input type="text" defaultValue={cell}/>
                                        </form>
                                    );
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

class SearchBox extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: data1
            })
        );
    }
}

export default SearchBox;