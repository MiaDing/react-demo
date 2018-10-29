import React, {Component} from "react"
import Toast from "./modal"
import {ajax} from "../common/common"

import "../../css/admin.css"

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            topic: "",
            list: []
        }
        this.getTopic();
    }
    handleChange(type, val) {
        if(!val) return;
        this.setState({
            [type]: val
        })
    }
    handleAdd() {
        const that = this;
        const token = this.state.token;
        const topic = this.state.topic;
        if(!token || !topic) {
            Toast("话题或口令不能为空");
            return;
        }
        if(this.state.list.length >= 5) {
            Toast("话题数量不可超过5条");
            return;
        }
        ajax({
            url: "postTopic",
            type: "POST",
            data: JSON.stringify({
                token: token,
                topic: topic
            })
        }).then((res) => {
            const data = JSON.parse(res);
            if (data && data.docs) {
                that.setState({
                    token: "",
                    topic: ""
                })
                Toast("话题设置成功");
                that.setTopic([data.docs]);
            }
        })
    }
    getTopic() {
        const that = this;
        ajax({
            url: "getTopic"
        }).then((res) => {
            const data = JSON.parse(res);
            if(data && data.docs) {
                that.setTopic(data.docs);
            }
        })
    }
    setTopic(data) {
        this.setState(preState => ({
            list: [...data, ...preState.list]
        }))
    }
    modifyTopic(type, e) {
        if(type === "d" && !confirm(`确认删除${e.dataset.val}`)) return;
        console.log("delete", e.dataset.id);
        const that = this;
        ajax({
            url: "modifyTopic",
            type: "POST",
            data: JSON.stringify({
                _id: e.dataset.id
            })
        }).then((res) => {
            const data = JSON.parse(res);
            if (data && data.raw && data.raw.ok) {
                that.setState(preState => {
                    const list = [...preState.list];
                    let index = 0;
                    list.some((v, i) => {
                        index = i;
                        return v._id === e.dataset.id;
                    })
                    console.log(index);
                    list.splice(index, 1);
                    return {
                        list
                    }
                });
            }
        })
    }
    render() {
        return (
            <div className="container">
                <div className="admin-token">
                    <input type="text" name="token" placeholder="token" onChange={(e) => this.handleChange("token", e.target.value)} value={this.state.token} />
                    <input type="text" name="topic" placeholder="topic" onChange={(e) => this.handleChange("topic", e.target.value)} value={this.state.topic} />
                    <button onClick={() => this.handleAdd()} >add</button>
                </div>
                <ul className="admin-list">
                    {
                        this.state.list.map(t => (
                            <li key={t._id}>
                                <p>{new Date(t.date).toLocaleString()}</p>
                                <input type="text" value={t.topic} disabled />
                                {/* <input type="button" onClick={(e) => this.modifyTopic("m", e.target)} data-id={t._id} data-val={t.topic} value="√"/> */}
                                <input type="button" onClick={(e) => this.modifyTopic("d", e.target)} data-id={t._id} data-val={t.topic} value="X" />
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

module.exports = Admin;