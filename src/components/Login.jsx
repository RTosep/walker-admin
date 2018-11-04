import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import NoticeMessage from "./NoticeMessage"
import { sessionStore } from "@src/utils"
import { CanvasBg } from "@src/canvas"
// global common style
import {
    levelOneZindex,
    ClearFix,
    themeRgbaColor,
} from "./common-style"
const loginBtnBg = "#00bcd4"
// login box
const LoginBgBox = styled(ClearFix)`
    position:fixed;
    width:100%;
    height:100%;
    z-index:${levelOneZindex};
    background-image: radial-gradient(ellipse farthest-corner at center top, ${themeRgbaColor} 0%, #000105 100%);
    cursor: move;
`;
// login form
const FormBox = styled.div`
    width:260px;
    height:200px;
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom: 0;
    margin:auto;
    cursor:pointer;
`;
const FormList = styled.div`
    position:relative;
    margin-bottom:12px;
    padding:6px 0;
    background:#fff;
    input{
        padding:6px 15px;
        font-size:14px;
        color:#aaa;
        width:100%;
        cursor:pointer;
        background:#fff;

        &:focus+.line{
            transform:scaleX(1);
        }
    }
    .line{
        position:absolute;
        width:100%;
        height:4px;
        background:${loginBtnBg};
        left:0;
        top:0;
        transform:scaleX(0);
        transition:transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    }
`;
const LoginBtn = styled.button`
    position:relative;
    overflow:hidden;
    width:100%;
    height:40px;
    line-height:40px;
    font-size:14px;
    background:${loginBtnBg};
`;

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            type: "text",
            userName: "",
            userPwd: "",
            // default state value
            message: null,
            messageType: null,
            animationName: null,
        }
        this.messageInfo = {
            success: {
                message: "Sign in success",
                animationName: null
            },
            warning: {
                message: "Username can not be empty !",
                animationName: "slideInLeft"
            },
            error: {
                message: "Password can not be blank !",
                animationName: "shake",
            },
        }
        // get Button wave from redux
        this.ButtonWave = this.props.buttonWave.ButtonWave
    }
    componentDidMount() {
        let info = sessionStore.fetch()
        const { history } = this.props
        if (info) {
            history.push("/")
        }
        // create canvas background with canva's id
        this.canvasBackground = new CanvasBg("canvasMoveBg")
    }
    updateUserName = e => {
        let userName = e.target.value
        this.setState({ userName })
    }
    updateUserPwd = e => {
        let userPwd = e.target.value
        this.setState({ userPwd })
    }
    // reset input type while on focusing to prevent browser remember password
    resetInputType = () => {
        let { type } = this.state
        let newType = type === "text" ? "password" : type
        this.setState({
            type: newType
        })
    }
    login = (e) => {
        let { userName, userPwd } = this.state
        let zhReg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
        // button wave effect
        this.ButtonWave.showWave(e)
        if (!userName) {
            return this.showMessage("warning")
        }
        if (userName && zhReg.test(userName)) {
            return this.setState({
                messageType: "error",
                message: "Username cannot contain Chinese !",
                animationName: "bounce",
            })
        }
        if (!userPwd) {
            return this.showMessage("error")
        }
        if (userName && userPwd) {
            const { history } = this.props
            let info = { userName, userPwd }
            // save to sessionStorage
            sessionStore.save(info)
            // back to home
            history.push("/")
            // back default type
            this.resetInputType()
        }
    }
    showMessage(messageType) {
        let { message, animationName } = this.messageInfo[messageType];
        this.setState({ messageType, message, animationName });
    }
    // remove notifications callback 
    removeNotification = () => {
        this.setState({ message: null, type: null })
    }
    render() {
        let { type, userName, userPwd, message, messageType, animationName } = this.state
        return (
            <LoginBgBox>
                {
                    message ?
                        <NoticeMessage message={message}
                            type={messageType}
                            animation={animationName}
                            removeAlert={this.removeNotification} /> : null
                }
                <canvas id="canvasMoveBg"></canvas>
                <FormBox>
                    <FormList>
                        <input className="user-name"
                            autoComplete="off"
                            type="text"
                            value={userName}
                            placeholder="Username"
                            maxLength="10"
                            onChange={this.updateUserName} />
                        <div className="line"></div>
                    </FormList>
                    <FormList>
                        <input className="user-pwd"
                            autoComplete="off"
                            type={type}
                            value={userPwd}
                            placeholder="Password"
                            maxLength="10"
                            onFocus={this.resetInputType}
                            onChange={this.updateUserPwd} />
                        <div className="line"></div>
                    </FormList>
                    <LoginBtn onClick={this.login}>Sign in</LoginBtn>
                </FormBox>
            </LoginBgBox>
        )
    }
}
// export default withRouter(Login)

const mapStateToProps = state => {
    return { ...state }
}

export default withRouter(connect(mapStateToProps)(Login))