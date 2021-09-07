
export default {

    addKannelInstance({ commit }, instance) {
        commit('ADD_KANNEL_INSTANCE', instance); 
    }, 

    setCurrentInstance({ commit }, host ) {
        commit('SET_CURRENT_INSTANCE', host); 
    }, 
    
    removeKannelInstance({ commit }, host) {
        commit('REMOVE_KANNEL_INSTANCE', host)
    }, 

    pingAllInstances({ state }) {
        state.kannelInstancesList.forEach(
            instance => instance.connect()
        ); 
    }

}
