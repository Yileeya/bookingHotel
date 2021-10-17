import Vue from "vue";
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '',
        component: () => import('../components/Layouts/AppLayout'),
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('../components/HomePage')
            },
            {
                path: 'rooms/:roomName',
                name: 'room',
                component: () => import('../components/RoomPage')
            }
        ],
    },
];


const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
});

export default router;

