const {FetchrRequest} = require("./FetchrRequest");

class FetchrBuilder {
    method = "GET";
    mode = "cors";
    cache = "no-cache";
    credentials = "same-origin";
    headers = {};
    redirect = "follow";
    referrerPolicy = "no-referrer";
    body = null;
    url;

    constructor() {}

    setMethod(method) {
        this.method = method;
        return this;
    }

    setMode(mode) {
        this.mode = mode;
        return this;
    }

    setCache(cache) {
        this.cache = cache;
        return this;
    }

    setCredentials(credentials) {
        this.credentials = credentials;
        return this;
    }

    setHeaders(headers) {
        this.headers = headers;
        return this;
    }

    setRedirect(redirect) {
        this.redirect = redirect;
        return this;
    }

    setReferrerPolicy(referrerPolicy) {
        this.referrerPolicy = referrerPolicy;
        return this;
    }

    setBody(body) {
        this.body = body;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    build() {
        return new FetchrRequest(this.url, this.body, this.method, this.mode, this.cache, this.credentials, this.headers, this.redirect, this.referrerPolicy);
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
    FetchrBuilder
}