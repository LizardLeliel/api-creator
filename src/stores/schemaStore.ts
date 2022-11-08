import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

import { Schema } from '../models/schemas';
import { USER_SCHEMA, POST_SCHEMA } from '../data/sampleSchemas';

export const SchemaStore = defineStore('schemas', () => {
    // const schemas = reactive([]);)
    const schemas = reactive<Schema[]>([USER_SCHEMA, POST_SCHEMA]);

    // function 
    function getSchemas() {
        return schemas;
    }

    function createSchema(label: string) {
        let newSchema: Schema = new Schema(label);
        schemas.push(newSchema);
        return newSchema;
        // schemas.push(new Schema(label));
    }

    return { schemas, getSchemas, createSchema };
});