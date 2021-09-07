import { createStore } from 'vuex'

import actions from './actions'; 
import mutations from './mutations'; 

export default createStore({
    state: {
        kannelConnectionsList: [], 
        currentConnection: null, 
    },
    actions, 
    mutations
})