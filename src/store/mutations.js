
export default {

    ADD_KANNEL_CONNECTION (state, connection) {
        state.kannelConnectionsList.push(connection)
    }, 

    SET_CURRENT_CONNECTION (state, host) {
        state.currentConnection = state.kannelConnectionsList.find( 
            inst => inst.host == host 
        )
    }, 

    REMOVE_KANNEL_CONNECTION (state, host) {
        state.kannelConnectionsList = state.kannelConnectionsList.filter(
            connection => connection.host != host 
        );
        if (state.currentConnection.host == host) {
            state.currentConnection = null; 
        }
    }

}