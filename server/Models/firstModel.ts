export class FirstModel {
    //the fields are example you have to change them as needed
    public id: number;
    public name: string;
    public node_id: number;
    public minimum_value: number;
    public maximum_value: number;
    public value:number;

    public constructor(something: FirstModel) {

        this.id = something.id;
        this.name = something.name;
        this.node_id = something.node_id;
        this.minimum_value = something.minimum_value;
        this.maximum_value = something.maximum_value;
        this.value = something.value;
    }
}

