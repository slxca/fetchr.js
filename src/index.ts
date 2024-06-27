class Fetchr {

    private config: string;
    
    constructor(config: string = "./fetchr.yaml") {
        this.config = config;
    }
}

export default Fetchr;