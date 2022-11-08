<template>
    <h1> Schemas </h1>

    <div v-for="schema in schemas">
        {{ JSON.stringify(schema.getFields()) }}
        <hr>
    </div>

    <button class="btn btn-dark" @click="addNewSchema">
        New Schema?!?
    </button>

</template>



<script setup lang="ts">
    import { FieldType, Schema } from '@/models/schemas';
    import { SchemaStore } from '@/stores/schemaStore';

    const schemasStore = SchemaStore();
    console.log(schemasStore.getSchemas());

    const schemas = schemasStore.getSchemas();
    // console.log(SchemaStore.getSChe)

    function addNewSchema() {
        schemasStore.createSchema('topics');
    }

</script>




<style scoped lang="scss">

</style>