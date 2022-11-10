<template>
    <div>
        <h2> Schema: {{schema.name}} </h2>

        <SchemaFieldEdit v-for="field in schema.getFields()" :field="field">
        
        </SchemaFieldEdit>
    </div>
</template>



<script setup lang="ts">
    import { provide } from 'vue';

    import { Schema } from '@/models/schemas';
    import SchemaFieldEdit from '@/components/SchemaFieldEdit.vue';

    const props = defineProps({
        schema:  { type: Schema, required: true },
    });

    // TODO: delete this later, when Schemas, fields, stores are refactored.
    provide('schema', props.schema);
</script>




<style scoped lang="scss">


</style>