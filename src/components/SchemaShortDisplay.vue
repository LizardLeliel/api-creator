<template>
    <div class="p-2">
        <div class="h-100 p-3 shadow">
            <div class="row h-100">
                <div class="col-8">
                    <h2> Schema: {{ schema.name }} </h2>
                    <p> Fields: {{ fieldCount }} </p>
                    <p> {{ schema.description }} </p>
                </div>
                <div class="col-4 h-100">
                    <RouterLink :to="'/schemas/' + schema.name">
                        <button type="button" class="schema-options btn btn-dark">
                            Edit
                        </button>
                    </RouterLink>
                    <button type="button" class="schema-options btn btn-danger" @click="deleteSchema">
                            Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
    import { computed } from 'vue';
    import { Schema } from '@/models/schemas';
    
    import { SchemaStore } from '@/stores/schemaStore';

    const schemasStore = SchemaStore();

    const props = defineProps({
        schema:  { type: Schema, required: true },
    });

    const fieldCount = computed(() => props.schema.getFields().length);

    function deleteSchema() {
        schemasStore.deleteSchema(props.schema.name);
    }
</script>






<style scoped lang="scss">

button.schema-options {
    width: 100%;
    height: 40%;
    
    margin-top: 5%;
}

</style>