import React from "react";
import {Link} from "react-router-dom"

import "../../css/right.css"

const user = JSON.parse(localStorage.getItem("user"));
const Right = () => (
    <div className="right">
        <Link to="/admin">管理员</Link>
        <h1>Welcome</h1>
        {user ? user.name : ""}
    </div>
)

export default Right;