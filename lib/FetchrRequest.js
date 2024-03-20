


class FetchrRequest {
    method;
    mode;
    cache;
    credentials;
    headers;
    redirect;
    referrerPolicy;
    body;
    url;

    options;

    constructor(url, body = null, method = "GET", mode = "cors", cache = "no-cache", credentials = "same-origin", headers = {}, redirect = "follow", referrerPolicy = "no-referrer") {
        this.url = url;
        this.body = body;
        this.method = method;
        this.mode = mode;
        this.cache = cache;
        this.credentials = credentials;
        this.headers = headers;
        this.redirect = redirect;
        this.referrerPolicy = referrerPolicy;
    }

    prepareHeaders() {
        this.options = {
            method: this.method,
            mode: this.mode,
            cache: this.cache,
            credentials: this.credentials,
            headers: this.headers,
            redirect: this.redirect,
            referrerPolicy: this.referrerPolicy,
        };

        if (this.body !== null) {
            this.options.body = JSON.stringify(this.body);
        }
    }

    async send() {
        this.prepareHeaders();

        try {
            return await fetch(this.url, this.options);
        } catch (e) {
            switch(e.cause.code) {
                case "ECONNREFUSED":
                    console.error("[Fetchr] Connection refused. Check your internet connection and the server status.");
                    break;
                case "ENOTFOUND":
                    console.error("[Fetchr] Host not found. Check the URL and try again.");
                    break;
                case "ECONNRESET":
                    console.error("[Fetchr] Connection reset. Check your internet connection and the server status.");
                    break;
                case "ECONNABORTED":
                    console.error("[Fetchr] Connection aborted. Check your internet connection and the server status.");
                    break;
                case "ETIMEDOUT":
                    console.error("[Fetchr] Connection timed out. Check your internet connection and the server status.");
                    break;
                default:
                    console.error(e);
                    console.error("[Fetchr] Error while sending request. Read https://s-luca.com/fetchr/docs#request")
                    break;
            }
        }
    }

    toJson() {
        return {
            method: this.method,
            mode: this.mode,
            cache: this.cache,
            credentials: this.credentials,
            headers: this.headers,
            redirect: this.redirect,
            referrerPolicy: this.referrerPolicy,
            body: this.body,
            url: this.url
        }
    }
}

module.exports = {
    FetchrRequest
}