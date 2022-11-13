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
    

    import { UseSchemaStore } from '@/stores/schemaStore';

    const schemaStore = UseSchemaStore();

    const props = defineProps({
        schema:  { type: Schema, required: true },
    });

    const fieldCount = computed(() => props.schema.getFields().length);

    function deleteSchema() {
        // Todo: alerts are apparently bad design, and undos are preferable. However, implementing undo functionality
        //  is outside the scope of this project. Try replacing the alert with a custom modal that greys out the save
        //  for a few seconds to stop habitual clicking, require the user to click a button labelled "delete 24 objects?"
        const confirmation = confirm("Delete this Schema?");

        if (confirmation) {
            schemaStore.deleteSchema(props.schema.name);
        }
    }
</script>






<style scoped lang="scss">

button.schema-options {
    width: 100%;
    height: 40%;
    
    margin-top: 5%;
}

</style>