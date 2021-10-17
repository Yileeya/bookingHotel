import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const token = "qr4ShvLVYtnQJa5xAik4WreLDdqTWdtuFmeiHrN2con0kfcfpOXAbLi2ZdeF";
export default new Vuex.Store({
    state: {
        isLoading: false,
        AJAXConfig: {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        },
        RoomId: '',
        navTitle: ''
    },
    mutations: {
        AJAXCONFIG(state, payload) {
            state.AJAXConfig = payload;
        },
        LOADING(state, payload) {
            state.isLoading = payload;
        },
        ROOMID(state, payload) {
            state.RoomId = payload;
        },
        NAVTITLE(state, payload) {
            state.navTitle = payload;
        }
    },
    actions: {
        async getToken(context) {
            const AJAXConfig = {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            context.commit('AJAXCONFIG', AJAXConfig);
        },
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        AJAXConfig(state) {
            return state.AJAXConfig;
        },
        RoomId(state){
            return state.RoomId;
        },
        navTitle(state){
            return state.navTitle;
        }
    },
    modules: {}
});
