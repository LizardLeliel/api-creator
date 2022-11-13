<template>
    <br />

    <!-- Todo: merge "SchemaEdit" and this file. -->
    <RouterLink to="/schemas"> Back to main schemas page</RouterLink>

    <div> </div>
    <br />

    <SchemaEdit class="shadow p-3" :schema="<any> schema" />

</template>



<script setup lang="ts">
    import { UseSchemaStore } from '@/stores/schemaStore';

    import SchemaEdit from '@/components/SchemaEdit.vue';

    const props = defineProps({
        schemaName: { type: String, required: true }
    });


    // TODO: Fields shouldn't be so coupled with schemas. They should be able to be modified
    //  without knowing what schema they belong too.
    const schemaStore = UseSchemaStore();
    const schema = schemaStore.getSchemaByName(props.schemaName);

</script>




<style scoped lang="scss">

</style>