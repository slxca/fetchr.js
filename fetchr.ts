
export default class fetchr {

    func: any = {}

    public fetchr() {
        this.func["test"] = this.dynamicFunction("HelloWrld")
    }

    public routes() {
        return this.func;
    }

    private dynamicFunction(...data: any) {
        return function(hello: string = "") {
            return data + hello;
        }
    }
}