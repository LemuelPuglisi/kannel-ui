export class CorsAnywhereProxy {

    constructor(corsProxyUrl) {
        this.corsProxyUrl = corsProxyUrl; 
    }

    get(url) {
        const corsProxiedUrl = this.proxyUrl(url); 
        return fetch(corsProxiedUrl, {headers: this.getRequiredCorsClientHeader()})
    }

    proxyUrl(url) {
        return this.corsProxyUrl + '/' + url;
    }

    getRequiredCorsClientHeader() {
        return {'origin': 'x-requested-with'}
    }

}

export class DummyProxy {

    get(url) {
        return fetch(url); 
    }

}