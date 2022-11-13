import { ref, computed, reactive, readonly, shallowReactive, type DeepReadonly } from 'vue';
import { defineStore } from 'pinia';

import { FieldType, Schema } from '@/models/schemas';
import { SAMPLE_SCHEMAS } from '@/data/sampleSchemas';

import type { UnwrapNestedRefs, ShallowReactive } from 'vue';


export const UseSchemaStore = defineStore('schemas', () => {
    // TODO: implement schemas as a key-value map, where the key is the name of the schema, so finding
    //  a schema is O(1) access.
    const schemas: ShallowReactive<UnwrapNestedRefs<Schema>[]> = shallowReactive<UnwrapNestedRefs<Schema>[]>(reactive(SAMPLE_SCHEMAS));
    // const schemas: <ShallowRef = shallowReactive<UnwrapNestedRefs<Schema>[]>(reactive(SAMPLE_SCHEMAS));
    
    // We keep a map for quick access for various operations but otherwise provide an array for users for display purpose
    const schemaMap: { [key: string]: UnwrapNestedRefs<Schema> } = {}; 
    for (let schema of schemas) {
        schemaMap[schema.name] = schema;
    }

    function getSchemas(): DeepReadonly<UnwrapNestedRefs<Schema>[]> {
        return readonly(schemas);
    }

    // As much as allowing users to modify schemas directly instead of using these wrapper functions
    //  would be much easier to understand, the functionality to change a schema's name, which
    //  must be unique, justifies the wrapper capabilities below.
    function createSchema(name: string, description?: string): DeepReadonly<UnwrapNestedRefs<Schema>> {
        if (schemaExists(name)) {
            throw new ReferenceError(`Schema "{name}" already exists`);
        }
        
        let newSchema: UnwrapNestedRefs<Schema> = reactive(new Schema(name, description));
        schemas.push(newSchema);
        schemaMap[newSchema.name] = newSchema;
        return readonly(newSchema);
    }

    function deleteSchema(name: string): DeepReadonly<UnwrapNestedRefs<Schema>> {
        // schemas.index
        const foundSchemaIndex = schemas.findIndex((schema) => schema.name == name);
        if (foundSchemaIndex == -1) {
            throw new ReferenceError('Schema "{name}" does not exist.');
        } 

        const foundSchema = readonly(schemaMap[name]);

        schemas.splice(foundSchemaIndex, 1);
        delete schemaMap[name];
        return foundSchema;
    }    

    // Returns READONLY - intended for public use
    function getSchemaByName(name: string): DeepReadonly<UnwrapNestedRefs<Schema>> {
        const _schema = _getSchemaByName(name);
        return readonly(_schema); 
    }

    function schemaExists(name: string): boolean {
        return schemaMap[name]? true: false;
    }

    // Returns Reactive - intended for private use
    function _getSchemaByName(name: string): UnwrapNestedRefs<Schema> {
        const _schema = schemaMap[name];
        if (!_schema) {
            throw new ReferenceError(`Schema "{name}" does not exist.`);
        }
        return schemaMap[name];
    }

    function addSimpleSchemaField(schema: string, field: string, type: FieldType, description: string = '', required: boolean = true): DeepReadonly<UnwrapNestedRefs<Schema>> {
        const foundSchema = _getSchemaByName(schema);
        
        foundSchema.addSimpleField(field, type, description, required);
        return readonly(foundSchema);
    }
    
    function changeSchemaFieldRequired(schema: string, field: string, required: Boolean): DeepReadonly<UnwrapNestedRefs<Schema>> {
        const foundSchema = _getSchemaByName(schema);

        required? foundSchema.makeFieldRequied(field): foundSchema.makeFieldNotRequired(field);

        return readonly(foundSchema);
    }

    function changeSchemaFieldDescription(schema: string, field: string, description: string): DeepReadonly<UnwrapNestedRefs<Schema>> {
        const foundSchema = _getSchemaByName(schema);

        foundSchema.changeFieldDescription(field, description);
        return readonly(foundSchema);
    }

    function removeSchemaField(schema: string, field: string): DeepReadonly<UnwrapNestedRefs<Schema>> {
        const foundSchema = _getSchemaByName(schema);

        foundSchema.removeField(field);
        return readonly(foundSchema);
    }

    return { getSchemas, createSchema, deleteSchema, getSchemaByName, schemaExists,
        addSimpleSchemaField, changeSchemaFieldRequired, changeSchemaFieldDescription, removeSchemaField,
    };
});