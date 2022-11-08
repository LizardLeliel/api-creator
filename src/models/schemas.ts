
export enum FieldType {
    number = "number",
    string = "string",
    boolean = "boolean",
    email = "email",
    object = "object",
    array = "array",
}

export interface SchemaField {
    label: string;
    type: FieldType;
    subtype?: FieldType | Schema;
    required: boolean;
}

export class Schema {
    private fields: SchemaField[] = [];
    
    constructor(public name: string) { }


    // A lot of these are similiar but I feel this is best for readibility
    public addSimpleField(label: string, type: FieldType, required = false) {
        // TODO: check and make sure field doesn't already exist here

        this.fields.push({
            label,
            type,
            required
        });
    }

    public addArrayField(label: string, type: FieldType, subtype: FieldType, required = false) {
        this.fields.push({
            label,
            type,
            subtype,
            required
        });
    }

    public addObjectField(label: string, type: FieldType, subtype: Schema, required = false) { 
        this.fields.push({
            label,
            type,
            subtype,
            required
        });
    }

    public removeField(label: string) {
        // Todo: implement this
    }

    public getFields(): SchemaField[] {
        return this.fields;
    }
}
