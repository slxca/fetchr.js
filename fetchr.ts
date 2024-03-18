import axios from "axios";
import yaml from "js-yaml";
import fs from "fs";

class fetchr {

    func = {}

    constructor() {

        const data = yaml.load(fs.readFileSync('.fetchr.yml', 'utf8'));
    }

    dynamicFunction(...data: any) {
        return function(hello: any) {
            return "returnValue";
        }
    }
}