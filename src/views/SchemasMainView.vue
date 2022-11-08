<template>
    <h1> Schemas </h1>

    <div v-for="schema in schemas">
        {{ JSON.stringify(schema.getFields()) }}
        <hr>
    </div>

    <button class="btn btn-dark" @click="addNewSchema">
        New Schema?!?
    </button>

    <button class="btn btn-dark" @click="updateLastSchema">
        Schema gets new field?!?
    </button>

</template>



<script setup lang="ts">
    import { reactive } from 'vue';

    import { FieldType, Schema } from '@/models/schemas';
    import { SchemaStore } from '@/stores/schemaStore';

    const schemasStore = SchemaStore();
    console.log(schemasStore.getSchemas());

    const schemas = schemasStore.getSchemas();

    var lastSchema: any;

    function addNewSchema() {
        lastSchema = schemasStore.createSchema('topics');
    }

    function updateLastSchema() {
        lastSchema.addSimpleField('name', FieldType.string);
    }

</script>




<style scoped lang="scss">

</style>