import fs from "fs-extra";
import axios, {AxiosInstance} from "axios";
import yaml from 'js-yaml';

class fetchr {

    private api: AxiosInstance | undefined;
    private filePath: string | undefined;
    private file: any;
    private cfg: any;

    public fetchr(filePath: string = "fetchr.yml") {
        this.filePath = filePath;
        this.file = fs.readFileSync(filePath, "utf8");
        this.cfg = yaml.load(this.file);
        this.api = axios.create({ baseURL: this.cfg.config.baseURL })
    }

    public routes() {
        return Object.keys(this.cfg.routes).reduce((obj: any, routeName: any) => {
            const routeConfig = this.cfg.routes[routeName];

            obj[routeName] = async (...args: any) => {
                let url = routeConfig.endpoint;
                routeConfig.params.forEach((param: any, index: any) => {
                    url = url.replace(`{${param}}`, args[index]);
                });

                if(this.api == undefined) return;

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

export { fetchr };