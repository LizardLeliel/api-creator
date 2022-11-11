<template>
    <div>
        <h2> Schema: {{schema.name}} </h2>

        <SchemaFieldEdit v-for="field in schema.getFields()" :field="field" />
        
        <div class="add-field ms-3">
            <button class="add-field-btn btn btn-dark" @click="openFieldAdd"> + Add Field </button>
        </div>
    </div>

    <teleport to="#modal-target">
        <ModalWrapper class="shadow" v-if="showAddField">
            <AddField @save="closeFieldEdit" @cancel="closeFieldEdit"> </AddField>
        </ModalWrapper>
    </teleport>


</template>



<script setup lang="ts">
    import { provide, ref } from 'vue';

    import { Schema } from '@/models/schemas';
    import SchemaFieldEdit from '@/components/SchemaFieldEdit.vue';
    import AddField from '@/components/AddField.vue';
    import ModalWrapper from '@/components/ModalWrapper.vue';

    const props = defineProps({
        schema:  { type: Schema, required: true },
    });

    // TODO: delete this later, when Schemas, fields, stores are refactored.
    provide('schema', props.schema);

    const showAddField = ref(false);

    function openFieldAdd() {
        showAddField.value = true;
    }

    function closeFieldEdit() {
        showAddField.value = false;
    }

</script>




<style scoped lang="scss">
    .add-field {
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-top: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);

        .add-field-btn {
            width: 100%;
            height: 3rem;
        }
    }

</style>