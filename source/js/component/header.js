import React, {Component} from "react"
import {Link} from "react-router-dom"
import Toast from "./modal"
import {ajax} from "../common/common"

class Landing extends Component {
    constructor() {
        super();
        this.handleOut = this.handleOut.bind(this);
    }
    handleOut() {
        if(!confirm("确认退出？")) return;
        const param = {
            url: "/getLogout"
        }
        ajax(param).then((data) => {
            if(JSON.parse(data) == false) {
                Toast("退出失败");
            }else {
                Toast("退出成功，将在2秒之后返回首页");
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    localStorage.removeItem("user");
                    window.location.href = "/";
                }, 2000);
            }
        })
    }
    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user) {
            return (
                <span className="header-btns">
                    <Link to="/login">登录</Link> |
                    <Link to="/register"> 注册</Link>
                </span>
            )
        }else if(user.name) {
            return (
                <span className="header-btns">
                    <span className="header-user">{user.name}</span> | 
                    <a onClick={this.handleOut}> 退出</a>
                </span>
            )
        }
    }
}

class Search extends Component {
    constructor (props) {
        super(props);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            flag: false,
            init: "",
            key: false,
            search: "",
            topic: []
        }
    }
    componentDidMount() {
        this.getTopic();
    }
    getTopic() {
        const that = this;
        ajax({
            url: "getTopic"
        }).then((res) => {
            const data = JSON.parse(res);
            if(data && data.docs) {
                that.setState({
                    topic: data.docs,
                    init: data.docs[Math.floor(Math.random() * data.docs.length)].topic
                })
            }
        })
    }
    handleFocus() {
        this.setState({
            flag: true
        })
    }
    handleBlur() {
        let timer = setTimeout(() => {
            this.setState({
                flag: false
            });
            clearTimeout(timer);
        }, 100);
    }
    handleClick(key) {
        this.setState({
            key: key
        })
    }
    handleInput(val) {
        if(val) {
            this.setState({
                search: val
            })
        }
    }
    handleSearch() {
        const url = this.state.search || this.state.key || this.state.init;
        window.location.hash = "#/home/" + url;
    }
    render() {
        const key = this.state.key === false ? this.state.init : this.state.key;
        return (
            <div className={"header-search " + (this.state.flag ? "active" : "")}>
                {
                    !this.state.search && 
                    <span>{this.state.topic.length > 0 ? !this.state.flag && "大家正在搜：" : "搜索关键字"}{key}</span>
                }
                <input type="text" autoComplete="off" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={e => this.handleInput(e.target.value)} />
                <a className="header-search-btn" title="搜索" onClick={this.handleSearch}>f</a>
                <ul className="header-search-list">
                    {
                        this.state.topic.map((v, k) => 
                            <li key={k} onClick = {() => this.handleClick(v.topic) }>
                                <Link to={`/home/${v.topic}`}>{v.topic}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     show: false
        // }
    }
    render() {
        return (
            <header>
                <span className="header-title"><Link to="/">Demo</Link></span>
                <Search />
                <Landing />
            </header>
        )
    }
}
export default Header;