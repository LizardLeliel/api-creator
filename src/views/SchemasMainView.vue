<template>
    <h1> Schemas </h1>

    <div v-for="schema in schemas">
        <h2> Schema: {{ schema.name }} </h2>
        {{ JSON.stringify(schema.getFields()) }}
        <hr>
    </div>

    Schema Name: <input v-model="newSchemaName" type="text" /> <br>
    <button class="btn btn-dark" @click="addNewSchema">
        Create New Schema named "{{newSchemaName}}"
    </button> <br>
    
    <br>

    <template v-if="schemaSet == true">
        Field Name: <input v-model="newFieldName" type="text" /> <br>
        <button class="btn btn-dark" @click="updateLastSchema">
            Create string field "{{newFieldName}}" for schema "{{lastSchema.name}}"
        </button> <br>
    </template>

</template>



<script setup lang="ts">
    import { reactive, ref } from 'vue';

    import { FieldType, Schema } from '@/models/schemas';
    import { SchemaStore } from '@/stores/schemaStore';

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