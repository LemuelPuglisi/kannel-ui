import { CorsAnywhereProxy, DummyProxy } from '../class/CrossOriginHttp';
import KannelConnection from '../class/KannelConnection';

export default {

    addKannelConnection({ commit }, params) {
        
        const proxy = params.proxy
            ? new CorsAnywhereProxy(params.proxy)
            : new DummyProxy(); 

        const connection = new KannelConnection(proxy, params.host, params.pass, params.port);
        commit('ADD_KANNEL_CONNECTION', connection);
    },

    setCurrentConnection({ commit }, connection) {
        commit('SET_CURRENT_CONNECTION', connection);
    },

    removeCurrentConnection({ commit }) {
        commit('REMOVE_CURRENT_CONNECTION'); 
    }, 

    removeKannelConnection({ commit }, connection) {
        commit('REMOVE_KANNEL_CONNECTION', connection)
    },

    pingAllConnections({ state }) {
        state.kannelConnectionsList.forEach(
            connection => connection.connect()
        );
    }

}
