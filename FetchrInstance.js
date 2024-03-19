const axios = require("axios");
const yaml = require("js-yaml");
const fs = require("fs-extra");

class FetchrInstance {

    api;
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

        this.api = axios.create({ baseURL: this.cfg.config.baseURL })
    }

    routes() {
        return Object.keys(this.cfg.routes).reduce((obj, routeName) => {
            const routeConfig = this.cfg.routes[routeName];

            obj[routeName] = async (...args) => {
                let url = routeConfig.endpoint

                if(routeConfig.params !== undefined) {
                    routeConfig.params.forEach((param, index) => {
                        url = url.replace(`{${param}}`, args[index]);
                    });
                }

                if(this.api === undefined) return;

                const result = await this.api({
                    method: routeConfig.method,
                    url: url
                });

                return result.data;
            };

            return obj;
        }, {});
    }
}

module.exports = {
    FetchrInstance
}