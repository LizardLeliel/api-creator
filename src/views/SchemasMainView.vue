<template>
    <h1> Schemas </h1>

    <hr />

    <SchemaDisplay class="shadow mb-3" v-for="schema of schemas" :schema="schema"> </SchemaDisplay>

    Schema Name: <input v-model="newSchemaName" type="text" /> <br>
    <button type="button" class="btn btn-dark mb-2" @click="addNewSchema">
        Create New Schema named "{{newSchemaName}}"
    </button> <br>
    
    <br>

    <template v-if="schemaSet == true">
        Field Name: <input v-model="newFieldName" type="text" /> <br>
        <button type="button" class="btn btn-dark mb-2" @click="updateLastSchema">
            Create string field "{{newFieldName}}" for schema "{{lastSchema.name}}"
        </button> <br>
    </template>

</template>



<script setup lang="ts">
    import { reactive, ref } from 'vue';

    import { FieldType, Schema } from '@/models/schemas';
    import { SchemaStore } from '@/stores/schemaStore';

    import SchemaDisplay from '../components/SchemaDisplay.vue';

    const schemasStore = SchemaStore();
    const schemas = schemasStore.getSchemas();

    let newSchemaName = ref('');
    let newFieldName = ref('');


    var lastSchema: any = ref(undefined);
    let schemaSet: any = ref(false);
    function addNewSchema() {
        lastSchema.value = schemasStore.createSchema(newSchemaName.value);
        schemaSet.value = true;
        newFieldName.value = '';
    }

    function updateLastSchema() {
        lastSchema.value.addSimpleField(newFieldName.value, FieldType.string);
    }

</script>




<style scoped lang="scss">

</style>