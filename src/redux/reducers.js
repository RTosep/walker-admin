import {
    combineReducers
} from 'redux'
import * as permissionRoute from "./permissionRoute"
import * as buttonColor from "./toggleButtonColor"
import * as sideTool from "./switchSideTool"
import * as sideBar from "./switchSideBar"
// only use default state
import * as buttonWave from "./buttonWave"

// collect default state and update all state to root/components
export const rootReducer = combineReducers({
    permissionRoute: permissionRoute.reducer,
    buttonColor: buttonColor.reducer,
    sideTool: sideTool.reducer,
    sideBar: sideBar.reducer,
    buttonWave: buttonWave.reducer,
})
// create default state for components
export const initialState = {
    permissionRoute: permissionRoute.initState,
    buttonColor: buttonColor.initialState,
    sideTool: sideTool.initState,
    sideBar: sideBar.initState,
    buttonWave: buttonWave.initState,
}

export default rootReducer