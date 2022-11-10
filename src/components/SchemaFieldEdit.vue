<template>
    <div class="field-info">
        <h5 class="w-100 ps-1"> 
            <u>Field</u>: <span>{{ field.label }} </span>
            <!-- <u>Field</u>: <input class="write-field-name" type="text" v-model="editLabel" /> -->
            <!-- &nbsp; &nbsp; <button type="button" class="btn btn-dark" @click="updateName"> Save Name </button> -->

            <span class="position-absolute end-0" style="width: 200px;">
                &emsp; <input class="form-check-input" type="checkbox" v-model="editRequired"  /> &nbsp;
                
                <span v-if="field.required == true" class="badge rounded-pill bg-dark"> Required </span>
                <span v-else class="badge rounded-pill bg-secondary"> Not Required </span>
            </span>
        </h5>


        <p class="description-preview" v-if="!isEditingDescription" @click="toggleEditingDescription()"> {{ field.description }} </p>
        <div v-if="isEditingDescription">
            <textarea ref="editDescBox" class="write-description-name" :v-model="editDescription">{{ editDescription }}</textarea>

        </div>
        <div class="row ps-1">
            <div class="col-12"> Type: {{field.type}} </div>
        </div>
    </div> 
</template>



<script setup lang="ts">
    import { ref, inject, watch } from 'vue'; 
    import { Schema, SchemaFieldClass } from '@/models/schemas';

    import { SchemaStore } from '@/stores/schemaStore';

    const schemasStore = SchemaStore();

    const props = defineProps({
        field: { type: SchemaFieldClass, required: true }
    });

    const schema = <Schema>inject('schema');

    let editRequired = ref(props.field.required);
    let editDescription = ref(props.field.description);
    // let editLabel = ref(props.field.label);
    let editType = ref(props.field.type);

    let isEditingDescription = ref(false);

    const editDescBox = ref<HTMLTextAreaElement | null>(null);

    watch(editDescBox, (newValue, oldValue) => {
        if (newValue != null) {
            // TODO: Find out why "-1" is the magic number and how to make this more programmatic.
            // (Maybe "scrollheight" accounts for border but height doesn't?)
            (<HTMLTextAreaElement>newValue).style.height = (<HTMLTextAreaElement>newValue).scrollHeight + 1 + 'px';
        }
    })

    watch(editRequired, (newValue, oldValue) => {
        schemasStore.changeSchemaFieldRequired(schema.name, props.field.label, newValue);
    });

    function toggleEditingDescription() {
        isEditingDescription.value = !isEditingDescription.value;
    }
</script>




<style scoped lang="scss">
.description-preview {
    width: 80%;
    padding: .5rem;

    cursor: pointer;
    &:hover {
        text-decoration: underline dotted;
    }
}

.write-description-name {
    border: 0px;

    border-bottom: 1px solid lightgray;
    width: 80%;

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