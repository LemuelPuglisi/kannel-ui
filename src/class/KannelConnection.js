const KANNEL_ADMIN_STD_PORT = 13000;

import { parseXml } from "../utils/XmlToJs";

export default class KannelConnection {

    /**
     * Refactor this class using State pattern. 
     */

    constructor(http, host, password, port=KANNEL_ADMIN_STD_PORT) {
        this.http = http; 
        this.host = host; 
        this.password = password;
        this.status = 'untested'; 
        this.port = port;
        this.info = null; 
    }

    connect() {
        const statusUrl = this.getStatusEndpoint(); 
        this.http.get(statusUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Connection to host ' + this.host + ' fails.');
                }
                return response.text()
            })
            .then(rawXml => {
                console.log('still ok')
                this.status = 'active'; 
                this.info = parseXml(rawXml, ['smsc'])['gateway'];   
            })
            .catch(error => {
                console.log(error.message); 
                this.status = 'dead';
            })
    }

    suspend()  { this._supplyCommand('suspend'); }
    isolate()  { this._supplyCommand('isolate'); }
    resume()   { this._supplyCommand('resume');  }
    shutdown() { this._supplyCommand('shutdown') }
    softRestart() { this._supplyCommand('graceful-restart'); }
    hardRestart() { this._supplyCommand('restart');          }
    reloadLists() { this._supplyCommand('reload-lists');     }

    _supplyCommand(command) {
        if (this.status != 'active') return; 
        const suspendUrl = this.addPassword(this.getEndpoint(command)); 
        this.http.get(suspendUrl)
            .then(response => response.text())
            .then(response => {
                console.log(response);     
            })
    }
        
    instanceIsSuspended() {
        return  this.status != 'active' || 
                this.info.status.value.includes('suspended') ||
                this.info.status.value.includes('isolated'); 
    }


    getStatusEndpoint() {
        return this.addPassword(this.getEndpoint('status.xml')); 
    }

    getEndpoint(endpoint) {
        return `http://${this.host}:${this.port}/${endpoint}?`; 
    }

    addPassword(url) {
        return url + 'password=' + this.password; 
    }

}