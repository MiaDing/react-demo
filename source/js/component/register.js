import React, {Component} from "react"
import Header from "./header"
import Toast from "./modal"
import {ajax} from "../common/common"

import "../../css/landing.css"

class Register extends Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: "",
            pass: "",
            passA: "",
            time: 3
        }
    }
    handleChange(type, value) {
        if (typeof type === "string" && (type === "user" || type === "pass" || type === "passA") && !!value) {
            this.setState({
                [type]: value
            })
        }
    }
    handleSubmit() {
        const passA = this.state.passA;
        const data = {
            name: this.state.user,
            pass: this.state.pass
        }
        if(!data.name || !data.pass || !passA) {
            Toast("用户名或密码不能为空");
            return;
        }
        if(data.pass !== passA) {
            Toast("密码错误");
            return;
        }
        const param = {
            type: "POST",
            url: "/getRegister",
            data: JSON.stringify(data)
        }
        const that = this;
        ajax(param).then((res) => {
            if(res) {
                that.setData(JSON.parse(res));
            }
        }, (err) => {
            console.log(err);
        })
    }
    setData(res) {
        if(res == false) {
            Toast("用户名已存在");
            return;
        }
        Toast("注册成功，将在1秒后跳转到首页");
        let timer = setTimeout(() => {
            clearTimeout(timer);
            localStorage.setItem("user", JSON.stringify(res));
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
                            <input type="text" placeholder="请输入用户名" autoComplete="off" name="user" onChange={(e) => this.handleChange("user", e.target.value)} />
                            {/* <span>用户名以字母、汉字、字母开头（不能含空格）</span> */}
                        </div>
                        <div className="item">
                            <input type="password" placeholder="请输入密码" autoComplete="off" name="pass" onChange={(e) => this.handleChange("pass", e.target.value)} />
                        </div>
                        <div className="item">
                            <input type="password" placeholder="请确认密码" autoComplete="off" name="passA" onChange={(e) => this.handleChange("passA", e.target.value)} />
                        </div>
                        <div className="item">
                            <input type="button" value="注册" onClick={this.handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;