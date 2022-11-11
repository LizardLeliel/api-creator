<template>
    <div class="card">
        <div class="card-header">
            New Field
        </div>

        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="fieldLabel">Schema Name:</label>
                    <input class="form-control" v-model="schemaName" 
                        @change="labelHasChanged"
                        :class="{'is-invalid': showNameInvalid && !validName }"
                        type="text" id="fieldLabel" />
                </div>
                
                <div class="mb-3">
                    <label for="schemaDescription">Description:</label>
                    <textarea class="form-control" v-model="schemaDescription" placeholder="Description..." id="schemaDescription"> </textarea>
                </div>

            </form>

            <button class="btn btn-dark" :class="{ 'disabled': !validName }" :disabled="!validName"
                @click="save"> 
                Save 
            </button>
            <button class="ms-3 btn btn-light" @click="cancel"> Cancel </button>
        </div>
    </div>

</template>



<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { type Schema, FieldType, type SchemaFieldClass } from '@/models/schemas';

    import { SchemaStore } from '@/stores/schemaStore';

    // Setup stuff
    const schemasStore = SchemaStore();

    const emit = defineEmits(['save', 'cancel']);

    const schemaName = ref('');
    const schemaDescription = ref('');

    const unchangedName = ref(true);
    const showNameInvalid = ref(false);

    function labelHasChanged() {
        unchangedName.value = true;
    }

    watch(unchangedName, (newValue, oldvalue) => {
        showNameInvalid.value = true;
    });

    const validName = computed(() => {
        const notEmpty = schemaName.value != '';
        const hasValidCharacters = /^[a-zA-Z]\w*$/.test(schemaName.value);
        // const uniqueName = schema.getField(fieldNa)
        return notEmpty && hasValidCharacters;
    });

    
    function cancel() {
        emit('cancel');
    }

    function save() {
        emit('save');
    }

</script>




<style scoped lang="scss">

</style>