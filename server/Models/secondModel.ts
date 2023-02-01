export class SecondModel {
    //the fields are example you have to change them as needed
    public id: number;
    public device_type: number;
    public name: string;
    public start_value: number;
    public end_value: number;
    public start_date: Date;
    public end_date: Date;

    public constructor(something: SecondModel) {

        this.id = something.id;
        this.device_type = something.device_type;
        this.name = something.name;
        this.start_value = something.start_value;
        this.end_value = something.end_value;
        this.start_date = something.start_date;
        this.end_date = something.end_date;
    }
}