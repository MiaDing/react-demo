import React, {Component} from "react"
import {render} from "react-dom"

function createWrap() {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const toast = render(<Toast />, div);
    return {
        add(notice) {
            return toast.add(notice);
        },
        destory() {
            React.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}

// example: notice("Error name") = <Toast />.add({"Error name", 3000})
let toast;
const ToastHandle = (message, seconds = 3000) => {
    if (!toast) toast = createWrap();
    return toast.add({message, seconds});
}

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notices: []
        }
    }
    getNoticeKey() {
        const {notices} = this.state;
        return `notice-${new Date().getTime()}-${notices.length}`;
    }

    add(notice) {
        const {notices} = this.state;
        notice.key = this.getNoticeKey();
        notices.push(notice);
        this.setState({notices});
        
        let timer = setTimeout(() => {
            this.remove(notice.key);
            clearTimeout(timer);
        }, notice.seconds);
    }

    remove(key) {
        this.setState(previousState => ({
            notices: previousState.notices.filter((notice) => {
                if (notice.key === key) return false;
                return true;
            })
        }))
    }

    // componentDidMount() {
    //     const seconds = this.props.seconds || 2900;
    //     let timer = setTimeout(() => {
    //         React.unmountComponentAtNode();
    //         clearTimeout(timer);
    //     }, seconds);
    // }

    render() {
        return (
            <div className={"modal " + (this.state.notices.length > 0 ? "active" : "")}>
                {/* <div className="modal-title"> */}
                    {
                        this.state.notices.map((notice) => (
                            <div className="modal-title" key={notice.key}>
                                <span>{notice.message}</span>
                            </div>
                        ))
                    }
                {/* </div> */}
            </div>
        )
    }
}

export default ToastHandle;