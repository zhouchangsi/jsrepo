import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        component: () => import("../views/mysql-manger/loginRegister")
    },
    {
        path: "/mysql",
        component: () => import("../views/mysql-manger/index"),
        children: [
            {
                path: "admin",
                component: () => import("../views/mysql-manger/menus/admin")
            },
            {
                // /mysql-manager/users-manager
                path: "bill",
                component: () => import("../views/mysql-manger/menus/bill")
            },
            {
                path: "punishment",
                component: () => import("../views/mysql-manger/menus/punishment")
            },
            {
                path: "room",
                component: () => import("../views/mysql-manger/menus/room")
            },
            {
                path: "student",
                component: () => import("../views/mysql-manger/menus/student")
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
