<template>
    <div class="card">
        <div class="card-header">
            New Field
        </div>

        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="fieldLabel">Schema Name: <small>required</small></label>
                    <input class="form-control" v-model="schemaName" 
                        @change="labelHasChanged"
                        :class="{'is-invalid': showNameInvalid && !validName }"
                        type="text" id="fieldLabel" />
                    <div class="invalid-feedback">
                        {{ invalidNameReason }}
                    </div>
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

    import { UseSchemaStore } from '@/stores/schemaStore';

    // Setup stuff
    const schemaStore = UseSchemaStore();

    const emit = defineEmits(['save', 'cancel']);

    const schemaName = ref('');
    const schemaDescription = ref('');

    const unchangedName = ref(false);
    const showNameInvalid = ref(false);
    const invalidNameReason = ref('');

    function labelHasChanged() {
        unchangedName.value = true;
    }

    watch(unchangedName, (newValue, oldvalue) => {
        showNameInvalid.value = true;
    });

    const validName = computed(() => {
        const notEmpty = schemaName.value != '';
        if (!notEmpty) {
            invalidNameReason.value = "Please type a name."
            return false;
        }

        const hasValidCharacters = /^[a-zA-Z]\w*$/.test(schemaName.value);
        if (!hasValidCharacters) {
            // Todo: is there a valid reason why it can't start with a number?
            invalidNameReason.value = "Name can not contain spaces or special characters, and must not start with a number."
            return false;
        }

        const uniqueName = schemaStore.getSchemaByName(schemaName.value) == undefined;
        if (!uniqueName) {
            invalidNameReason.value = "Name is already taken."
            return false;
        }

        return notEmpty && hasValidCharacters && uniqueName;
    });

    
    function cancel() {
        emit('cancel');
    }

    function save() {
        if (validName) {
            schemaStore.createSchema(schemaName.value, schemaDescription.value);

            emit('save');
        }
        else {
            // What would be appropriate here??
        }
    }

</script>




<style scoped lang="scss">

</style>