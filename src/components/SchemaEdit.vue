<template>
    <div class="p-3">
        <h2> Schema: {{schema.name}} </h2>

        <div class="field-info" v-for="field in schema.getFields()">
            <h5> 
                Field name: {{ field.label }} 
                <span v-if="field.required == true" class="badge rounded-pill bg-dark"> Required </span>
                <span v-else class="badge rounded-pill bg-secondary"> Not Required </span>
            </h5>
            <div class="row">
                <div class="col-12"> Type: {{field.type}} </div>
            </div>
        </div> 
    </div>
</template>



<script setup lang="ts">
    // import { defineProps } from 'vue';
    import { Schema } from '../models/schemas';

    defineProps({
        schema:  { type: Schema, required: true },
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