
export default {

    addKannelConnection({ commit }, connection) {
        commit('ADD_KANNEL_CONNECTION', connection); 
    }, 

    setCurrentConnection({ commit }, host ) {
        commit('SET_CURRENT_CONNECTION', host); 
    }, 
    
    removeKannelConnection({ commit }, host) {
        commit('REMOVE_KANNEL_CONNECTION', host)
    }, 

    pingAllConnections({ state }) {
        state.kannelConnectionsList.forEach(
            connection => connection.connect()
        ); 
    }

}
