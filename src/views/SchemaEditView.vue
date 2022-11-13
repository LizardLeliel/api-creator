<template>
    <br />

    <!-- Todo: merge "SchemaEdit" and this file. -->
    <RouterLink to="/schemas"> <button class="return-btn btn btn-light"> <i class="bi-arrow-return-left"></i> Schemas </button> </RouterLink>

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
.return-btn {
    border: 2px solid lightgrey;
}
</style>