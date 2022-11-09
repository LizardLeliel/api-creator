import { ref, computed, reactive, readonly, shallowReactive } from 'vue';
import { defineStore } from 'pinia';

import { FieldType, Schema } from '../models/schemas';
import { USER_SCHEMA, POST_SCHEMA } from '../data/sampleSchemas';

import type { UnwrapNestedRefs } from 'vue';


export const SchemaStore = defineStore('schemas', () => {
    // TODO: implement schemas as a key-value map, where the key is the name of the schema, so finding
    //  a schema is O(1) access.
    const schemas = shallowReactive<UnwrapNestedRefs<Schema>[]>([reactive(USER_SCHEMA), reactive(POST_SCHEMA)]);

    // Todo: implement this as computer, which turns the key-value map to an array. 
    function getSchemas() {
        return readonly(schemas);
    }

    function createSchema(label: string) {
        let newSchema: Schema = new Schema(label);
        schemas.push(newSchema);
        return readonly(newSchema);
    }

    // Returns READONLY - intended for public use
    function getSchemaByName(name: string) {
        return readonly(_getSchemaByName(name));
    }

    // Returns Reactive - intended for private use
    function _getSchemaByName(name: string): any {
        return schemas.find(element => element.name == name);
    }

    // function changeSchemaFieldRequired(name: string, field: string, required: boolean) {

    // As much as allowing users to modify schemas directly instead of using these wrapper functions
    //  would be much easier to understand, the functionality to change a schema's name, which
    //  must be unique, justifies these wrapper functions.
    function addSimpleSchemaField(schema: string, field: string, type: FieldType, description: string = '', required: boolean = true): true | undefined {
        const foundSchema = _getSchemaByName(schema);
        if (!foundSchema) return undefined;
        
        // const newSchema = reactive(new Schema(schema, type, description));
        foundSchema.addSimpleField(field, type, description, required);
        return true;
    }
    
    function changeSchemaFieldRequired(schema: string, field: string, required: Boolean) {
        const foundSchema = _getSchemaByName(schema);
        if (!foundSchema) return undefined;

        return required? foundSchema.makeFieldRequied(field): foundSchema.makeFieldNotRequired(field);
    }

    function changeSchemaFieldDescription(schema: string, field: string, description: string) {
        const foundSchema = _getSchemaByName(schema);
        if (!foundSchema) return undefined;

        return foundSchema.changeFieldDescription(field, description);
    }

    function removeSchemaField(schema: string, field: string) {
        const foundSchema = _getSchemaByName(schema);
        if (!foundSchema) return undefined;

        return foundSchema.removeField(field);
    }

    // Todo: delete this two testing/development functions
    function modifyFirstSchema() {
        addSimpleSchemaField(schemas[0].name, 'mood', FieldType.string);
    }

    function removeFirstSchemaName() {
        removeSchemaField(schemas[0].name, 'name');
    }

    return { getSchemas, createSchema, getSchemaByName,
        addSimpleSchemaField, changeSchemaFieldRequired, changeSchemaFieldDescription, removeSchemaField,
        modifyFirstSchema, removeFirstSchemaName 
    };
});