<template>
    <h1> Schemas </h1>

    <hr />

    <div class="row no-gutters p-3">
        <SchemaDisplay class="col-6" v-for="schema of schemas" :schema="schema"> </SchemaDisplay>
    </div>

    <hr />

    <SchemaEdit class="shadow mb-3 p-3" v-for="schema of schemas" :schema="schema"> </SchemaEdit>

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

    <br>

    <button type="button" class="btn btn-dark mb-2" @click="arbitrarlyExpandFirstSchema">
        Change the first schema
    </button> <br>

    <button type="button" class="btn btn-dark mb-2" @click="arbitrarlyReduceFirstSchema">
        Delete "name" field from first schema
    </button> <br>

</template>



<script setup lang="ts">
    import { reactive, ref } from 'vue';

    import { FieldType, Schema } from '@/models/schemas';
    import { SchemaStore } from '@/stores/schemaStore';

    import SchemaEdit from '../components/SchemaEdit.vue';
    import SchemaDisplay from '../components/SchemaShortDisplay.vue';

    const schemasStore = SchemaStore();

    const schemas = schemasStore.getSchemas();

    let newSchemaName = ref('');
    let newFieldName = ref('');


    let lastSchema: any = ref(undefined);
    let schemaSet: any = ref(false);

    function addNewSchema() {
        lastSchema.value = schemasStore.createSchema(newSchemaName.value);
        schemaSet.value = true;
        newFieldName.value = '';
    }

    function updateLastSchema() {
        lastSchema.value.addSimpleField(newFieldName.value, FieldType.string);
    }

    function arbitrarlyExpandFirstSchema() {
        schemasStore.modifyFirstSchema();
    }

    function arbitrarlyReduceFirstSchema() {
        schemasStore.removeFirstSchemaName();
    }

</script>




<style scoped lang="scss">

</style>