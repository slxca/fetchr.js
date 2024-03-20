


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
        return await fetch(this.url, this.options);
    }
}

export {
    FetchrRequest
}