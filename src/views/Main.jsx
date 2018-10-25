import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from "@src/components/Login"

import routeList from "@src/routes"
import SideBar from "@src/components/SideBar"
import NotFound from "@src/components/NotFound"
import Header from "@src/components/Header"
import App from "./App"

// mock user info start
import { setCookie, getCookie } from "@src/utils"
// const mockSetInfo = () => {
//     let info = {
//         name: "React",
//         avatar: "xxx",
//     }
//     setCookie("USER", JSON.stringify(info), 2)
// }
// const user = getCookie("USER")
// !user && mockSetInfo()
// mock user info end

// delete cookie
// setCookie("USER", null, 2)

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: JSON.parse(getCookie("USER")),
        }
        console.log(this.state)
    }
    getInfo = userInfo => {
        this.setState({ userInfo })
        console.log(userInfo)
    }
    signOut = () => {
        setCookie("USER", null, 2)
        this.setState({ userInfo: null })
        // console.log(location)
    }
    render() {
        let { userInfo } = this.state
        return (
            <Router>
                <React.Fragment>
                    <Switch>
                        {userInfo ? <SideBar /> : null}
                        {/* {userInfo ? <Header signOut={this.signOut} userInfo={userInfo} /> : null} */}

                        {routeList.map((item, index) => (
                            <Route
                                key={index}
                                path={item.path}
                                exact={item.exact}
                                component={item.component} />
                        ))}
                        <Route exact path="/login" component={Login} />
                        {/* <Route exact path="/app" component={App} /> */}
                        <Route exact path="/" render={() => (
                            <Redirect to="/login" />
                        )} />
                        <Route exact component={NotFound} />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

export default Main