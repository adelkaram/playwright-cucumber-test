export class Tenant {
    private id: number;
    private query: string;
    constructor(id:number){
        this.id = id;
        this.query = '?tenant_id=';
    }

    get ID(){
        return this.id;
    }
    get queryString(){
        return this.query;
    }
}