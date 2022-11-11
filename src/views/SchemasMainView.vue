<template>
    <h1> Schemas </h1>

    <hr />

    <div class="row no-gutters p-3">
        <SchemaDisplay class="col-6" v-for="schema of schemas" :schema="schema"> </SchemaDisplay>
    </div>

    <hr />

    <div class="row no-gutters p-3">
        <div class="p-2 col-6">
            <div class="p-3 shadow" style="height: 180px;">
                <div class="row h-100">
                    <div class="col-8">
                        <h2> Create New Schema</h2>
                    </div>
                    <div class="col-4 h-100">
                        <button type="button" class="btn btn-dark h-100 w-100" @click="createSchema">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <teleport to="#modal-target">
        <ModalWrapper class="shadow" v-if="showAddSchema">
            <AddSchema @save="closeAddSchema" @cancel="closeAddSchema" />
        </ModalWrapper>
    </teleport>

</template>



<script setup lang="ts">
    import { ref } from 'vue';

    import { FieldType, Schema } from '@/models/schemas';
    import { SchemaStore } from '@/stores/schemaStore';

    import SchemaDisplay from '@/components/SchemaShortDisplay.vue';

    import ModalWrapper from '@/components/ModalWrapper.vue';
    import AddSchema from '@/components/AddSchema.vue';

    const schemasStore = SchemaStore();
    const schemas = schemasStore.getSchemas();

    let newSchemaName = ref('');
    let newFieldName = ref('');
    let showAddSchema = ref(false);

    // TODO: Delete this, this was for playing purposes
    let lastSchema: any = ref(undefined);
    let schemaSet: any = ref(false);

    function addNewSchema() {
        lastSchema.value = schemasStore.createSchema(newSchemaName.value);
        schemaSet.value = true;
        newFieldName.value = '';
    }

    function updateLastSchema() {
        schemasStore.addSimpleSchemaField(lastSchema.value.name, newFieldName.value, FieldType.string);
    }

    function createSchema() {
        showAddSchema.value = true;
    }

    function closeAddSchema() {
        showAddSchema.value = false;
    }

</script>




<style scoped lang="scss">

</style>