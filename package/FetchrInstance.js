const {FetchrBuilder} = require("./lib/FetchrBuilder");
const yaml = require("js-yaml");
const fs = require("fs-extra");
class FetchrInstance {
    filePath;
    file;
    cfg;

    constructor(filePath = "fetchr.yml") {
        this.filePath = filePath;
        this.file = fs.readFileSync(filePath, "utf8");

        try {
            this.cfg = yaml.load(this.file);
        } catch (e) {
            console.error(e);
            console.error("Error while loading config file. Read https://s-luca.com/fetchr/docs#config")
        }
    }

    routes() {
        const routeList = {};

        // The reduce function should operate on routeList, not on a new empty object
        Object.keys(this.cfg.routes).reduce((routeList, routeName) => {
            const routeConfig = this.cfg.routes[routeName];

            routeList[routeName] = async (...args) => {
                let url = routeConfig.endpoint;

                if(routeConfig.params !== undefined) {
                    routeConfig.params.forEach((param, index) => {
                        console.log(param, index, args[index])
                        url = url.replace(`{${param}}`, args[index]);
                    });
                }

                const builder = new FetchrBuilder()
                    .setUrl(this.cfg.config.baseURL + url)
                    .setBody(routeConfig.body ?? null)
                    .setCache(routeConfig.cache ?? "no-cache")
                    .setCredentials(routeConfig.credentials ?? "same-origin")
                    .setHeaders({...this.cfg.defaultHeaders || {}, ...routeConfig.headers || {}} ?? {})
                    .setMode(routeConfig.mode ?? "cors")
                    .setRedirect(routeConfig.redirect ?? "follow")
                    .setReferrerPolicy(routeConfig.referrerPolicy ?? "no-referrer")
                    .setMethod(routeConfig.method ?? "GET")
                    .build();

                try {
                    const response = await builder.send();
                    if(this.cfg.config.debug) console.log(response);
                    return response;
                } catch (e) {

                    if(this.cfg.config.errors) console.error(e);

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
            };

            return routeList;
        }, routeList);

        return routeList;
    }
}

module.exports = {
    FetchrInstance
}