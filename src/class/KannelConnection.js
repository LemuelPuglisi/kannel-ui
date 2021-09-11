const KANNEL_ADMIN_STD_PORT = 13000;

import { parseXml } from "../utils/XmlToJs";

export default class KannelConnection {

    /**
     * Refactor this class using State pattern. 
     */

    constructor(http, host, password, port = KANNEL_ADMIN_STD_PORT) {
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
                this.status = 'active';
                this.info = parseXml(rawXml, ['smsc'])['gateway'];
            })
            .catch(error => {
                console.log(error.message);
                this.status = 'dead';
            })
    }

    suspend() { this._supplyCommand('suspend'); }
    isolate() { this._supplyCommand('isolate'); }
    resume() { this._supplyCommand('resume'); }
    shutdown() { this._supplyCommand('shutdown') }
    softRestart() { this._supplyCommand('graceful-restart'); }
    hardRestart() { this._supplyCommand('restart'); }
    reloadLists() { this._supplyCommand('reload-lists'); }


    _supplyCommand(command, query = {}) {
        if (this.status != 'active') return null;
        const url = this._buildEndpoint(command, query);
        return new Promise((resolve, reject) => {
            this.http.get(url.toString())
                .then(response => {
                    if (!response.ok) reject(response.text())
                    return response.text()
                })
                .then(response => {
                    console.log(response);
                    resolve(response); 
                })
                .catch(error => reject(error)); 
        })
    }

    _buildEndpoint(command, query = {}) {
        const url = new URL(this.addPassword(this.getEndpoint(command)));
        Object.entries(query).forEach(pair => {
            const [key, value] = pair; 
            if (key) url.searchParams.append(key, value)
        });
        return url;
    }

    instanceIsSuspended() {
        return this.status != 'active' ||
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

    getSmscs() {
        return this.info.smscs.smsc.map((smsc) => {
            const [status, uptime] = smsc.status.value.split(" ");
            const [protocol, host, port, user] = smsc.name.value.split(":");
            return {
                id: smsc.id.value,
                protocol: protocol,
                host: host,
                port: port,
                user: user,
                adminId: smsc["admin-id"].value,
                status: status,
                uptime: uptime,
                failed: smsc.failed.value,
                queued: smsc.queued.value,
                sentSms: smsc.sms.sent.value,
                receivedSms: smsc.sms.received.value,
                sentDlr: smsc.dlr.sent.value,
                receivedDlr: smsc.dlr.received.value,
            };
        });
    }

    stopSmsc(id) {
        return new Promise((resolve, reject) => {
            this._supplyCommand('stop-smsc', {smsc: id})
                .then(responseMessage => {
                    console.log('debugging', responseMessage)
                    if (responseMessage.includes('Could not')) {
                        reject(responseMessage)
                    }
                    resolve(responseMessage); 
                })
                .catch(error => reject(error))
        })
    }

    startSmsc(id) {
        return new Promise((resolve, reject) => {
            this._supplyCommand('start-smsc', {smsc: id})
                .then(responseMessage => {
                    console.log('debugging', responseMessage)
                    if (responseMessage.includes('Could not')) {
                        reject(responseMessage)
                    }
                    resolve(responseMessage); 
                })
                .catch(error => reject(error))
        })
    }

}