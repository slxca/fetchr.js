const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');

class oRequest {
    constructor(configPath = ".o") {
        const config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
        this.url = config.config.url;
        this.models = config.models;

        // Bind model methods
        for (const modelName in this.models) {
            const model = this.models[modelName];
            this[modelName] = this._generateModelFunctions(modelName, model);
        }
    }

    _generateModelFunctions(modelName, model) {
        const functions = {};
        functions.getAll = async () => {
            const path = model.path ? `/${model.path}` : `/${modelName}`;
            const url = `${this.url}${path}`;
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                throw new Error(error.response.data);
            }
        };

        if (model.userId) {
            functions.get = async (userId) => {
                const url = `${this.url}/${modelName}/${userId}`;
                try {
                    const response = await axios.get(url);
                    return response.data;
                } catch (error) {
                    throw new Error(error.response.data);
                }
            };
        }

        return functions;
    }
}