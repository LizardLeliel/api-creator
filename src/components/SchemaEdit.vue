<template>
    <div>
        <h2> Schema: {{(<typeof ref<Schema>><unknown>schema).name}} </h2>

        <SchemaFieldEdit ref="fieldEdits" v-for="field in (<any>schema).getFields()" :field="field" />
        
        <div class="add-field ms-3">
            <button class="add-field-btn btn btn-dark" @click="openFieldAdd"> + Add Field </button>
        </div>
    </div>


    <teleport to="#modal-target">
        <OpacityFadeTransition>
            <ModalWrapper class="shadow" v-if="showAddField">
                <AddField @save="closeFieldEdit" @cancel="closeFieldEdit"> </AddField>
            </ModalWrapper>
        </OpacityFadeTransition>
    </teleport>
</template>



<script setup lang="ts">
    import { provide, ref, computed, type UnwrapNestedRefs } from 'vue';
    import { onBeforeRouteLeave } from 'vue-router';

    import type { Schema } from '@/models/schemas';

    import SchemaFieldEdit from '@/components/SchemaFieldEdit.vue';
    import AddField from '@/components/AddField.vue';
    import ModalWrapper from '@/components/ModalWrapper.vue';

    import OpacityFadeTransition from '@/components/transitions/OpacityFade.vue';    

    const props = defineProps({
        schema:  { type: ref<Schema>, required: true },
    });

    // TODO: delete this later, when Schemas, fields, stores are refactored.
    provide('schema', props.schema);

    const showAddField = ref(false);

    const fieldEdits = ref([]);

    const noDescriptionsBeingEdited = computed(() => {
        return !fieldEdits.value.some(element => (<typeof SchemaFieldEdit> element).isEditingDescription);
    });

    function openFieldAdd() {
        showAddField.value = true;
    }

    function closeFieldEdit() {
        showAddField.value = false;
    }

    onBeforeRouteLeave((to, from) => {
        if (!noDescriptionsBeingEdited.value) {
            const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave?");

            if (!confirmLeave) {
                return false;
            }
        }

        return true;
    });

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