<!-- This file may be redundant with the component "Schema Edit"; factoring that component into this page may be necessary-->

<template>
    <br />

    <RouterLink to="/schemas"> Back to main schemas page</RouterLink>

    <div> </div>
    <br />

    <SchemaEdit class="shadow p-3" :schema="schema" />

</template>



<script setup lang="ts">
    import { SchemaStore } from '@/stores/schemaStore';

    import SchemaEdit from '@/components/SchemaEdit.vue';

    const props = defineProps({
        schemaName: { type: String, required: true }
    });


    const schemasStore = SchemaStore();
    const schema = schemasStore.getSchemaByName(props.schemaName);

</script>




<style scoped lang="scss">

</style>