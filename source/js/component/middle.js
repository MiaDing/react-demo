import React, {Component} from "react"
import Toast from "./modal"
import {ajax, checkLogin} from "../common/common"

import "../../css/middle.css"

class Middle extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            content: "",
            posts: [],
            isBottom: false,
            scroll: 0,
            last: "",
            tips: ""
        }
        this.getPost();
    }
    getPost() {
        const that = this;
        ajax({
            url: "getContent",
            type: "GET"
        }).then((res) => {
            console.log(JSON.parse(res).docs);
            if(res) {
                const data = JSON.parse(res).docs;
                that.setState(preState => ({
                    posts: [...preState.posts, ...data],
                    last: data[data.length - 1].date
                }))
            }
        })
    }
    getKey(key) {
        const that = this;
        ajax({
            url: "getKey?key=" + key,
            type: "GET"
        }).then((res) => {
            console.log(JSON.parse(res).docs);
            if (res) {
                const data = JSON.parse(res).docs;
                that.setState({
                    posts: data
                })
                window.removeEventListener("scroll", this.handleScroll);
            }
        })
    }
    handleScroll() {
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const status = clientHeight + scrollTop >= scrollHeight - 5;
        const isBottom = this.state.isBottom;
        if(status && !isBottom) {
            this.setState({
                scroll: scrollTop,
                tips: "loading...",
                isBottom: true
            })
            this.getMore();
        }
    }
    getMore() {
        const last = this.state.last;
        const that = this;
        if(last) {
            ajax({
                url: "getContent?last=" + last
            }).then((res) => {
                if(res) {
                    const data = JSON.parse(res).docs;
                    if(data.length === 0) {
                        this.setState({
                            tips: "到底了..."
                        })
                        return;
                    };
                    that.setState(preState => ({
                        posts: [...preState.posts, ...data],
                        last: data[data.length - 1].date,
                        tips: "",
                        isBottom: false
                    }))
                    const scroll = that.state.scroll - 20;
                    document.documentElement.scrollTop = document.body.scrollTop = scroll;
                }
            })
        }
    }
    handleInput(val) {
        this.setState({
            content: val
        })
    }
    handleSubmit() {
        const val = this.state.content;
        const userid = checkLogin();
        const that = this;
        if(!userid) {
            Toast("请先登录");
            return;
        }
        if(!val) {
            Toast("内容不能为空");
            return;
        }

        ajax({
            url: "postContent",
            type: "POST",
            data: JSON.stringify({
                author: userid,
                content: val
            })
        }).then((res) => {
            res && that.setPost(JSON.parse(res).docs);
        })
    }
    setPost(data) {
        this.setState(preState => ({
            posts: [data, ...preState.posts],
            content: ""
        }))
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillReceiveProps(nextProps) {
        const next = nextProps.match.params;
        const curr = this.props.match.params;
        if(JSON.stringify(next) !== JSON.stringify(curr)) {
            this.getKey(next.key);
        }
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        const key = this.props.match.params.key || "";
        return (
            <div className="middle">
                <h1>{key}</h1>
                {
                    (!this.props.match.params.key) && 
                    <div className="publish">
                        <textarea name="content" value={this.state.content} onChange={(e) => this.handleInput(e.target.value)}></textarea>
                        <button className={this.state.content && "active"} onClick={() => this.handleSubmit()}>发布</button>
                    </div>
                }
                <ul className="posts">
                    {
                        this.state.posts.length > 0 &&
                        this.state.posts.map((post, k) => {
                            return (
                                <li key={k}>
                                    <p className="post-author">{post.author.name}</p>
                                    <p className="post-date">{new Date(post.date).toLocaleString()}</p>
                                    <p className="post-content">{post.content}</p>
                                </li>
                            ) 
                        })
                    }
                    {
                        this.state.posts.length <= 0 &&
                        <p>空空如也~~~</p>
                    }
                </ul>
                <p>{this.state.tips}</p>
            </div>
        )
    }
}

export default Middle;