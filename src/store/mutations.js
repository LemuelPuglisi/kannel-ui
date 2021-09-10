function matchConnections(c1, c2) {
    return c1.host == c2.host && c1.port == c2.port; 
}

export default {

    ADD_KANNEL_CONNECTION (state, connection) {
        state.kannelConnectionsList.push(connection)
    }, 

    SET_CURRENT_CONNECTION (state, connection) {
        const match = (c) => matchConnections(c, connection); 
        state.currentConnection = state.kannelConnectionsList.find(match)
    }, 

    REMOVE_CURRENT_CONNECTION (state) {
        state.currentConnection = null; 
    }, 

    REMOVE_KANNEL_CONNECTION (state, connection) {
        const dontMatch = (c) => !matchConnections(c, connection); 
        state.kannelConnectionsList = state.kannelConnectionsList.filter(dontMatch);
        if (state.currentConnection && matchConnections(state.currentConnection, connection)) {
            state.currentConnection = null; 
        }
    }

}