import { createStore } from 'vuex'

import actions from './actions'; 
import mutations from './mutations'; 

export default createStore({
    state: {
        kannelConnectionsList: [], 
        currentConnection: null, 
    },
    getters: {
        
        connectionsCount(state) {
            return state.kannelConnectionsList.length(); 
        }, 

    }, 
    actions, 
    mutations
})