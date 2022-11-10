<template>
    <div class="field-info">
        <h5 class="w-100"> 
            Field name: {{ field.label }} 

            <span class="position-absolute end-0" style="width: 200px;">
                &emsp; <input class="form-check-input" type="checkbox" v-model="editRequired"  /> &nbsp;
                
                <span v-if="field.required == true" class="badge rounded-pill bg-dark"> Required </span>
                <span v-else class="badge rounded-pill bg-secondary"> Not Required </span>
            </span>
        </h5>


        <div class="row">
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
    let editLabel = ref(props.field.label);
    let editType = ref(props.field.type);

    watch(editRequired, (newValue, oldValue) => {
        schemasStore.changeSchemaFieldRequired(schema.name, props.field.label, newValue);
    });
</script>




<style scoped lang="scss">
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