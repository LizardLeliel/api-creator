<template>
    <div class="field-info">
        <h5 class="w-100 ps-1"> 
            <p class="mb-0"> 
                <u>Field</u>: <span>{{ field.label }} </span>
                
                <span class="position-absolute end-0" style="width: 200px;">
                    &emsp; <input class="form-check-input" type="checkbox" v-model="editRequired"  /> &nbsp;
                    
                    <span v-if="field.required == true" class="badge rounded-pill bg-dark"> Required </span>
                    <span v-else class="badge rounded-pill bg-secondary"> Not Required </span>
                </span>
            </p>

            <p class="mb-0"> <small> Type: {{field.type}} </small> </p> 
        </h5>

        
        <div class="row fit-content">
            <!-- If there is NO description... -->
            <div class="col-10" v-if="!isEditingDescription && descriptionIsEmpty">
                <p class="description-preview text-muted" @click="toggleEditingDescription">
                    Click to add a description... <i class="bi-pencil-fill"> </i>
                </p>
            </div>

            <div class="col-10" v-if="!isEditingDescription && !descriptionIsEmpty">
                <p class="description-preview" @click="toggleEditingDescription()"> 
                    {{ field.description }} <i class="bi-pencil-fill"></i>
                </p>
            </div>

            <div class="col-10" v-if="isEditingDescription">
                <textarea ref="editDescBox" class="write-description-name" v-model="editDescription"></textarea>
            </div>

            <div class="editButtonContainer col-2" v-if="isEditingDescription">
                <div class="buttonWrapper">
                    <button :disabled="descriptionChanged" :class="{ disabled: descriptionChanged }" class="btn btn-dark" type="button"
                        @click="saveDescriptionEdit"> 
                        Save 
                    </button>
                    <button class="btn btn-sceondary cancel-btn" type="button"
                        @click="cancelDescriptionEdit"> 
                        Cancel 
                    </button>
                </div>
            </div>
        </div>
            <button class="btn btn-danger" type="button" @click="deleteField">
                <i class="bi-trash3-fill"> </i>
            </button>
    </div> 
</template>



<script setup lang="ts">
    import { ref, inject, watch, computed } from 'vue'; 
    import { Schema, SchemaFieldClass } from '@/models/schemas';

    import { UseSchemaStore } from '@/stores/schemaStore';

    // Schema imports and props, and injects
    const schemaStore = UseSchemaStore();

    const props = defineProps({
        field: { type: SchemaFieldClass, required: true }
    });

    const schema = <Schema>inject('schema');

    // Data
    const editRequired = ref(props.field.required);
    const editDescription = ref(props.field.description);

    const isEditingDescription = ref(false);

    const editDescBox = ref<HTMLTextAreaElement | null>(null);

    defineExpose({
        isEditingDescription
    });

    // computed
    const descriptionChanged = computed(() => {
        return editDescription.value == props.field.description;
    });

    const descriptionIsEmpty = computed(() => {
        return editDescription.value.length == 0;
    })

    // watchers
    watch(editDescBox, newValue => {
        if (newValue != null) {
            const MAGIC_VERTICAL_ADJUST: number = +1;
            (<HTMLTextAreaElement>newValue).style.height = (<HTMLTextAreaElement>newValue).scrollHeight + MAGIC_VERTICAL_ADJUST+ 'px';
        }
    })

    watch(editRequired, newValue => {
        schemaStore.changeSchemaFieldRequired(schema.name, props.field.label, newValue);
    });

    // Callbacks
    function toggleEditingDescription() {
        isEditingDescription.value = !isEditingDescription.value;
    }

    function cancelDescriptionEdit() {
        isEditingDescription.value = false;
        editDescription.value = props.field.description;
    }

    function saveDescriptionEdit() {
        isEditingDescription.value = false;
        schemaStore.changeSchemaFieldDescription(schema.name, props.field.label, editDescription.value);
    }

    function deleteField() {
        const confirmation = confirm("Are you sure you want to delete this field?");

        if (confirmation) {
            schemaStore.removeSchemaField(schema.name, props.field.label);
        }
    }
</script>




<style scoped lang="scss">

.cancel-btn {
    border: 1px solid black;

    &:hover {
        background-color: lightgray;
        border: 1px solid black;
    }
}

.editButtonContainer {  
    .buttonWrapper {
        padding: 20px;

        button {
            width: 100%;
            margin-bottom: 16px;
        }
    }
}

.description-preview {
    padding: .5rem;

    cursor: pointer;
    &:hover {
        text-decoration: underline dotted black;
    }
}

.write-description-name {
    border: 0px;

    border-bottom: 1px solid lightgray;
    width: 100%;

    min-height: min-content;

    padding: .5rem;
    // padding: 0px;
    margin-bottom: calc(16px - 1px); // Keep the same margin as <p> but account for the border
    background-color: #f9f9f9;
}

.write-field-name {
    border: 0px;

    border-bottom: 1px solid lightgray;
    width: 33%;
}

.field-info {
    padding-top: 1rem;
    padding-bottom: 1rem;

    border-top: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);

    &:first {
        border-top: 0px;
    }

    h5 .badge {
        font-size: .8rem;
    }
}
</style>