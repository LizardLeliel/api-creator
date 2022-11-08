<template>
    <div class="p-3">
        <h2> Schema: {{schema.name}} </h2>

        <div class="border mb-3" v-for="field in schema.getFields()">
            <h5> Field name: {{ field.label }} </h5>
            <div class="row">
                <div class="col-6"> Type: {{field.type}} </div>
                <div class="col-6"> Required: {{ field.required? 'yes': 'no' }} </div>
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

</style>