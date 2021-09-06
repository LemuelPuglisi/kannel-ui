import { createStore } from 'vuex'

import actions from './actions'; 
import mutations from './mutations'; 

export default createStore({
    state: {
        kannelInstancesList: [], 
        currentInstance: null, 
    },
    actions, 
    mutations
})