const KANNEL_ADMIN_STD_PORT = 13000;

import { parseXml } from "../utils/XmlToJs";

export default class KannelInstance {

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
            .then(response => response.text())
            .then(rawXml => {
                this.status = 'active'; 
                this.info = parseXml(rawXml)['gateway'];   
            })
            .catch(error => {
                this.status = 'dead';
                console.log(error) 
            })
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