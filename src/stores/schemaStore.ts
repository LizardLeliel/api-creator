import { ref, computed, reactive, readonly, shallowReactive, type DeepReadonly } from 'vue';
import { defineStore } from 'pinia';

import { FieldType, Schema } from '@/models/schemas';
import { SAMPLE_SCHEMAS } from '@/data/sampleSchemas';

import type { UnwrapNestedRefs } from 'vue';


export const UseSchemaStore = defineStore('schemas', () => {
    // TODO: implement schemas as a key-value map, where the key is the name of the schema, so finding
    //  a schema is O(1) access.
    const schemas = shallowReactive<UnwrapNestedRefs<Schema>[]>(reactive(SAMPLE_SCHEMAS));
    
    // We keep a map for quick access for various operations but otherwise provide an array for users for display purpose
    const schemaMap: { [key: string]: UnwrapNestedRefs<Schema> } = {}; 
    for (let schema of schemas) {
        schemaMap[schema.name] = schema;
    }

    function getSchemas() {
        return readonly(schemas);
    }

    // As much as allowing users to modify schemas directly instead of using these wrapper functions
    //  would be much easier to understand, the functionality to change a schema's name, which
    //  must be unique, justifies the wrapper capabilities below.
    function createSchema(name: string, description?: string) {
        if (_getSchemaByName(name)) return undefined;
        
        let newSchema: Schema = new Schema(name, description);
        schemas.push(newSchema);
        schemaMap[newSchema.name] = newSchema;
        return readonly(newSchema);
    }

    function deleteSchema(name: string) {
        // schemas.index
        const foundSchemaIndex = schemas.findIndex((schema) => schema.name == name);
        if (foundSchemaIndex == -1) return undefined; 

        schemas.splice(foundSchemaIndex, 1);
        delete schemaMap[name];
        return true;
    }    

    // Returns READONLY - intended for public use
    function getSchemaByName(name: string): DeepReadonly<UnwrapNestedRefs<Schema>> | undefined {
        const _schema = _getSchemaByName(name);
        return _schema? readonly(_schema): undefined; 
    }

    // Returns Reactive - intended for private use
    function _getSchemaByName(name: string): UnwrapNestedRefs<Schema> | undefined {
        return schemaMap[name];
    }

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

    return { getSchemas, createSchema, deleteSchema, getSchemaByName, 
        addSimpleSchemaField, changeSchemaFieldRequired, changeSchemaFieldDescription, removeSchemaField,
    };
});