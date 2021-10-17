import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import qs from 'querystring';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: true,
        kkboxToken: '',
        AJAXConfig: null,
        readyMusic: {},
        metaTitle: '',
        navTitle: ''
    },
    mutations: {
        KKBOXTOKEN(state, payload) {
            state.kkboxToken = payload;
        },
        AJAXCONFIG(state, payload) {
            state.AJAXConfig = payload;
        },
        LOADING(state, payload) {
            state.isLoading = payload;
        },
        READYMUSIC(state, payload) {
            state.readyMusic = payload;
        },
        SETTITLE(state, payload) {
            state.metaTitle = payload;
        },
        NAVTITLE(state, payload) {
            state.navTitle = payload;
        }
    },
    actions: {
        async getToken(context) {
            let oauthAPI = `https://cors-anywhere.herokuapp.com/https://account.kkbox.com/oauth2/token`;
            if(process.env.NODE_ENV === 'development') {
                oauthAPI = '/token';
            }
            const config = {
                headers: {
                    Accept: 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            /*臨時解決*/
            const oauth = {
                grant_type: 'client_credentials',
                client_id: '8878c9a302fda6667660ff2be911d948',
                client_secret: 'c832d7afb045b7f6c1016d68afacc3ee'
            };
            /**/
            context.commit('LOADING', true);
            let res = await axios.post(oauthAPI, qs.stringify(oauth), config);
            context.commit('KKBOXTOKEN', res.data);
            const AJAXConfig = {
                headers: {
                    Authorization: `${res.data.token_type} ${res.data.access_token}`
                }
            };
            context.commit('AJAXCONFIG', AJAXConfig);
            context.commit('LOADING', false);
        },


        getMetaTitle(context, title) {
            context.commit('SETTITLE', title);
        }
    },
    getters: {
        kkboxToken(state) {
            return state.kkboxToken;
        },
        isLoading(state) {
            return state.isLoading;
        },
        AJAXConfig(state) {
            return state.AJAXConfig;
        },
        readyMusic(state) {
            return state.readyMusic;
        },
        metaTitle(state) {
            return state.metaTitle;
        },
        navTitle(state){
            return state.navTitle;
        }
    },
    modules: {}
});
