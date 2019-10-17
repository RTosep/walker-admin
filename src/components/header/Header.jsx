import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import HeaderMenu from './HeaderMenu'
// utils
import { sessionStore } from '../../utils'
// global common style
import {
    levelOneZindex,
    ClearFix,
    headerAndLogoHeight,
    sideBarWidth,
    closedSideBarLeft,
    themeRgbaColor,
    whiteColor,
} from '../common-style'
// Header left value while closing sideBar
const closedLeft = sideBarWidth - closedSideBarLeft
const openWidth = `calc(100% - ${sideBarWidth}px)`
const closeWidth = `calc(100% - ${closedLeft}px)`

// common scoped style
const HeaderBox = styled(ClearFix)`
    position:fixed;
    z-index:${levelOneZindex};
    transition:all .4s;
    left:${props => props.isOpenedSideBar ? sideBarWidth + "px" : closedLeft + "px"};
    top:0;
    background:${themeRgbaColor};
    width: ${props => props.isOpenedSideBar ? openWidth : closeWidth};
    height:${headerAndLogoHeight}px;
    color:#fff;
    box-shadow:0 6px 10px -2px rgba(0,0,0,0.5);
`;

// scoped style
const iconBoxWidth = 32;
const marginTop = (headerAndLogoHeight - iconBoxWidth) / 2;
const UserInfoBox = styled.div`
    float:right;
    margin-right:14px;
    margin-top:${marginTop}px;
`;

const UserIconBox = styled(ClearFix)`
    display:inline-block;
    vertical-align:middle;
    width:${iconBoxWidth}px;
    height:${iconBoxWidth}px;
    position:relative;
    cursor:pointer;
    margin-left:10px;
    
    .user-icon{
        width:22px;
        height:22px;
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        margin:auto;
        background-size:100% 100%;
        background-image:url("/images/user-center.svg");
        z-index:${levelOneZindex};
    }
    .unread-count{
        position:absolute;
        width:16px;
        height:16px;
        background:#e4393c;
        text-align:center;
        line-height:16px;
        color:${whiteColor};
        font-size:10px;
        border-radius:50%;
        top:0;
        right:0;
        z-index:${levelOneZindex + 1};
    }
`;

// toggle slide down menu button
const UserToggleBtn = styled.button`
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:${levelOneZindex + 2};
    overflow:hidden;
`;
class Header extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            userName: null,
            // isOpenMenu: true,
            isOpenMenu: false,
        }
        // this.ButtonWave = new ButtonWaveEffect()
        console.log(this.props, `Header props`)
    }
    componentDidMount() {
        const info = sessionStore.fetch()
        const { history } = this.props
        if (!info) {
            // back to login
            history.push('/login')
        } else {
            const { userName } = info
            this.setState({ userName })
        }
    }

    signOut = () => {
        sessionStore.remove()
        this.props.history.push('/login')
    }

    switchSlideDownMenu = (event) => {
        const { isOpenMenu } = this.state
        this.setState({ isOpenMenu: !isOpenMenu })
        // use global function with event from redux
        // this.props.ButtonWave.showWave(event)
    }

    render() {
        const { userName, isOpenMenu } = this.state
        const { isOpenedSideBar, activeBgColor } = this.props
        return (
            <HeaderBox isOpenedSideBar={isOpenedSideBar}>
                {
                    userName ? <UserInfoBox data-index="1">
                        <span>Welcome {userName}</span>
                        <UserIconBox>
                            <div className="user-icon"></div>
                            <div className="unread-count">3</div>
                            <UserToggleBtn onClick={this.switchSlideDownMenu} />
                        </UserIconBox>
                        {/* slide down menu */}
                        {isOpenMenu ? <HeaderMenu activeBgColor={activeBgColor} signOut={this.signOut} /> : null}
                    </UserInfoBox> : null
                }
            </HeaderBox>
        )
    }
}


export default withRouter(Header)