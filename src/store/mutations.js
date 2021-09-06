
export default {

    ADD_KANNEL_INSTANCE (state, instance) {
        state.kannelInstancesList.push(instance)
    }, 

    SET_CURRENT_INSTANCE (state, host) {
        state.currentInstance = state.kannelInstancesList.find( 
            inst => inst.host == host 
        )
    }, 

    REMOVE_KANNEL_INSTANCE (state, host) {
        state.kannelInstancesList = state.kannelInstancesList.filter(
            instance => instance.host != host 
        );
    }

}