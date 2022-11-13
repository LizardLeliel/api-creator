<!-- This file may be redundant with the component "Schema Edit"; factoring that component into this page may be necessary-->

<template>
    <br />

    <RouterLink to="/schemas"> Back to main schemas page</RouterLink>

    <div> </div>
    <br />

    <SchemaEdit class="shadow p-3" :schema="schema" />

</template>



<script setup lang="ts">
    import { UseSchemaStore } from '@/stores/schemaStore';

    import SchemaEdit from '@/components/SchemaEdit.vue';

    const props = defineProps({
        schemaName: { type: String, required: true }
    });


    // BIG TODO: Fields shouldn't be so coupled with schemas. They should be able to be modified
    //  without knowing what schema they belong too.
    // For now, continue with this approach to practice form validation.

    const schemaStore = UseSchemaStore();
    const schema: any = schemaStore.getSchemaByName(props.schemaName);

</script>




<style scoped lang="scss">

</style>