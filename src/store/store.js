import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
             token:window.localStorage.getItem("token"),
             username:window.localStorage.getItem("username"),
             role:window.localStorage.getItem("role"),
    },
    getters:{
       
    }
})