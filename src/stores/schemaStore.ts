import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

import { Schema } from '../models/schemas';
import { USER_SCHEMA, POST_SCHEMA } from '../data/sampleSchemas';

export const SchemaStore = defineStore('schemas', () => {
    const schemas = reactive<Schema[]>([USER_SCHEMA, POST_SCHEMA]);

    function getSchemas() {
        return schemas;
    }

    function createSchema(label: string) {
        let newSchema: Schema = new Schema(label);
        schemas.push(newSchema);
        return reactive(newSchema);
    }

    return { schemas, getSchemas, createSchema };
});