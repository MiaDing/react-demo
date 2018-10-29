import React, {Component} from "react"
import Header from "./header"
import Toast from "./modal"
import {ajax} from "../common/common"


class Login extends Component {
    constructor(props) {
        super(props);
        this.getInfo = this.getInfo.bind(this);
        this.state = {
            user: "",
            pass: ""
        }
    }
    handleChange(type, value) {
        if (typeof type === "string" && (type === "user" || type === "pass") && !!value) {
            this.setState({
                [type]: value
            })
        }
    }
    getInfo() {
        const name = this.state.user,
            pass = this.state.pass;
        if(!name || !pass) {
            Toast("用户名或密码不能为空");
            return;
        }
        const param = {
            url: "/getLogin",
            type: "POST",
            data: JSON.stringify({
                name: name,
                pass: pass
            })
        }
        const that = this;
        ajax(param).then((data) => {
            that.setData(JSON.parse(data));
        })
    }
    setData(data) {
        if(data == false) {
            Toast("用户名或密码错误");
            return;
        }
        Toast("登录成功，将在1秒后跳转到首页");
        let timer = setTimeout(() => {
            clearTimeout(timer);
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "/";
        }, 1000);
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="landing-box">
                        <div className="item">
                            <input type="text" placeholder="用户名" name="user" autoComplete="off" onChange={(e) => this.handleChange("user", e.target.value)} />
                        </div>
                        <div className="item">
                            <input type="password" placeholder="密码" name="pass" onChange={(e) => this.handleChange("pass", e.target.value)} />
                        </div>
                        <div className="item">
                            <input type="button" onClick={this.getInfo} value="登录" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }    
}

export default Login;