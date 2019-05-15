import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import admin from './modules/admin'
import ojInfo from './modules/ojInfo'
import gateway from './modules/gateway'
import profile from './modules/profile'
import classrooms from './modules/classrooms'
import classroom from './modules/classroom'
import problemLists from './modules/problemLists'
import problemList from './modules/problemList'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        admin,
        ojInfo,
        gateway,
        profile,
        classrooms,
        classroom,
        problemLists,
        problemList,
    },
    getters,
})

export default store
