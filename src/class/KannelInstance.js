const KANNEL_ADMIN_STD_PORT = 13000;

export default class KannelInstance {

    constructor(host, password, port=KANNEL_ADMIN_STD_PORT) {
        this.host = host; 
        this.password = password;
        this.status = 'untested'; 
        this.port = port; 
    }

    getEndpoint(endpoint) {
        return `http://${this.host}:${this.port}/${endpoint}?`; 
    }

    addPassword(url) {
        return url + 'password=' + this.password; 
    }

    ping() {
        console.log('Pinging kannel host.'); 
        const rn = Math.ceil(Math.random(100) * 100); 
        console.log(rn)
        this.status = rn % 2 == 0 ? 'active' : 'dead'; 
    }

    getStatus() {
        const url = this.addPassword(this.getEndpoint('status.xml'))
        fetch(url)
            .then(data => console.log(data));
    }

}