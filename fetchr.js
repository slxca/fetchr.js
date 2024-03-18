const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');

class fetchr {

    constructor() {
        this.func = {};

        const data = yaml.load(fs.readFileSync('fetchr.yml', 'utf8'));
        for(const funcName in data.func) {
            const funcData = data.func[funcName];
            func[funcData] = this.dynamicFunction(funcData.return);
        }
    }

    dynamicFunction(returnValue) {
        return function() {
            return returnValue;
        }
    }
}

module.exports = fetchr;