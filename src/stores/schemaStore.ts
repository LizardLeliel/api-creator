import { ref, computed, reactive, readonly } from 'vue';
import { defineStore } from 'pinia';

import { FieldType, Schema } from '../models/schemas';
import { USER_SCHEMA, POST_SCHEMA } from '../data/sampleSchemas';

export const SchemaStore = defineStore('schemas', () => {
    const schemas = reactive<Schema[]>([USER_SCHEMA, POST_SCHEMA]);

    function getSchemas() {
        return readonly(schemas);
    }

    function createSchema(label: string) {
        let newSchema: Schema = new Schema(label);
        schemas.push(newSchema);
        return reactive(newSchema);
    }

    function modifyFirstSchema() {
        schemas[0].addSimpleField('Registration Date', FieldType.string);
    }

    function removeFirstSchemaName() {
        schemas[0].removeField('name');
    }

    return { getSchemas, createSchema, modifyFirstSchema, removeFirstSchemaName };
});