import CrossOriginHttp from '../class/CrossOriginHttp';
import KannelConnection from '../class/KannelConnection';

const TEMPORARY_CORS_PROXY_URL = 'http://localhost:8181'

export default {

    addKannelConnection({ commit }, params) {
        const proxy = new CrossOriginHttp(TEMPORARY_CORS_PROXY_URL);
        const connection = new KannelConnection(proxy, params.host, params.pass, params.port);
        commit('ADD_KANNEL_CONNECTION', connection);
    },

    setCurrentConnection({ commit }, host) {
        commit('SET_CURRENT_CONNECTION', host);
    },

    removeCurrentConnection({ commit }) {
        commit('REMOVE_CURRENT_CONNECTION'); 
    }, 

    removeKannelConnection({ commit }, host) {
        commit('REMOVE_KANNEL_CONNECTION', host)
    },

    pingAllConnections({ state }) {
        console.log('pinging all connections.')
        state.kannelConnectionsList.forEach(
            connection => connection.connect()
        );
    }

}
