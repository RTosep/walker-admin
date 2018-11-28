/*
 *  react-loadable: load Async component
 *  Loadable(loader,loading) 
 *  loader: load component
 *  loading: default loading effect
 */
import Loadable from "react-loadable"
import Loading from "../components/Loading"

const DashboardHome = Loadable({
    loader: () => import("../views/dashboard"),
    loading: Loading,
})

const ProfileHome = Loadable({
    loader: () => import("../views/profile"),
    loading: Loading,
})

const TableHome = Loadable({
    loader: () => import("../views/table"),
    loading: Loading,
})

const ChartsHome = Loadable({
    loader: () => import("../views/charts"),
    loading: Loading,
})

const NoticeHome = Loadable({
    loader: () => import("../views/notice"),
    loading: Loading,
})
const routeList = [
    {
        path: "/home/dashboard",
        exact: true,
        icon: "dashboard",
        sidebarName: "Dashboard",
        component: DashboardHome,
        permission: 4,
    },
    {
        path: "/home/profile",
        exact: true,
        icon: "profile",
        sidebarName: "User Profile",
        component: ProfileHome,
        permission: 3,
    },
    {
        path: "/home/table",
        exact: true,
        icon: "table",
        sidebarName: "Table List",
        component: TableHome,
        permission: 2,
    },
    {
        path: "/home/charts",
        exact: true,
        icon: "charts",
        sidebarName: "Charts",
        component: ChartsHome,
        permission: 1,
    },
    {
        path: "/home/notice",
        exact: true,
        icon: "notice",
        sidebarName: "Notifications",
        component: NoticeHome,
        permission: 1,
    },
]

export default routeList