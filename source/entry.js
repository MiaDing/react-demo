import React, {Component} from "react"
import {render} from "react-dom"
import {Route, hashHistory, HashRouter, Switch, Link, Redirect} from "react-router-dom"
import Header from "./js/component/header"
import Middle from "./js/component/middle"
import Right from "./js/component/right"
import Login from "./js/component/login"
import Register from "./js/component/register"
import Admin from "./js/component/admin"

import "./css/main.css"

const NoMatch = () => (
    <div className="container">
        <h1>404</h1>
        <h3>
            Back <Link to="/home" >home</Link>.
        </h3>
    </div>
)

const Content = (props) => (
    <div className="container">
        <Middle {...props} />
        <Right />
    </div>
)

class Root extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter history={hashHistory}>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" render= {() => 
                            <Redirect to="/home"/>
                        } />
                        <Route exact path="/home" component={Content} />
                        <Route path="/home/:key" component={Content} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/admin" component={Admin} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

render(<Root />, document.getElementById("root"));