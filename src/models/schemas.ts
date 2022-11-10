export enum FieldType {
    number  = "number",
    string  = "string",
    boolean = "boolean",
    email   = "email",
    object  = "object",
    array   = "array",
}

export type ReducedFieldType = Omit<FieldType, FieldType.array | FieldType.object>;

// Todo: Refactor fields into its own class
export interface SchemaField {
    label:        string;
    description:  string;
    type:         FieldType;
    subtype?:     FieldType | Schema;
    required:     boolean;
}

// PropDefine can't take a TypeScript interface, so this is a wrapper until SchemaField is refactored
//  to its own class.
export class SchemaFieldClass implements SchemaField {
    label:        string = '';
    description:  string = '';
    type:         FieldType = FieldType.string;
    subtype?:     FieldType | Schema;
    required:     boolean = true;
}

export class Schema {
    private fields: SchemaField[] = [];
    
    // Todo: make name private with getters and setters, support renaming a schema.
    constructor(public readonly name: string, public readonly description?: string) { }

    public addSimpleField(label: string, type: FieldType, description='', required = true): SchemaField | undefined {
        if (this.getField(label)) return undefined;

        const newField: SchemaField = {
            label,
            description,
            type,
            required
        };

        this.fields.push(newField);
        return newField;
    }

    // Todo: rewrite to use exceptions so the multiple fail cases here can be determined.
    public changeFieldName(label: string, newLabel: string): SchemaField | undefined {
        const foundSourceField = this.getField(label);
        if (!foundSourceField) return undefined;

        const foundTargetField = this.getField(newLabel);
        if (foundTargetField) return undefined;

        foundSourceField.label = newLabel;
        return foundSourceField;
    }

    public changeFieldDescription(label: string, newDescription: string): SchemaField | undefined {
        const foundField = this.getField(label);
        if (!foundField) return undefined;

        foundField.description = newDescription;
        return foundField;
    }

    public makeFieldRequied(fieldName: string): true | undefined {
        const foundField = this.getField(fieldName);
        if (!foundField) return undefined;

        foundField.required = true;
        return true;
    };

    public makeFieldNotRequired(fieldName: string): true | undefined {
        const foundField = this.getField(fieldName);
        if (!foundField) return undefined;

        foundField.required = false;
        return true;
    }

    // It doesn't make sense to change a field's type; users should delete the field and create a new one.
    //  Since this software is intended for protopypal purposes, there's no need to fret migration headaches.
    // public changeFieldSimpleType(fieldName: string, newType: SchemaField) { }

    // Todo: implement these later
    // public addArrayField(label: string, type: FieldType, subtype: ReducedFieldType, required = false) { }
    // public addObjectField(label: string, type: FieldType, subtype: Schema, required = false) { }
    

    // Todo: make "not found" return result consistent. (Probably use exceptions?)
    public removeField(label: string): boolean {
        // Todo: implement this
        let foundIndex = this.fields.find((element) => element.label == label);

        if (foundIndex == undefined) {
            return false;
        } else {
            this.fields.splice(this.fields.indexOf(foundIndex), 1);
            return true;
        }

        // TODO: anything we need to do once we implement the ability to have fields link to other objects?
    }

    public getField(label: string): SchemaField | undefined {
        let foundIndex = this.fields.find((element) => element.label == label);
        return foundIndex;
    }

    public getFields(): SchemaField[] {
        return this.fields;
    }
}
