<template>
    <div class="card">
        <div class="card-header">
            New Field
        </div>

        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="fieldLabel">Schema Name: <small>(<RequiredIcon :valid="validName" />required)</small></label>
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

    import { UseSchemaStore } from '@/stores/schemaStore';

    import RequiredIcon from '@/components/RequiredIcon.vue';

    // Setup
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
            // Note: it could start with a number, but for demonstration/practice purposes, I'm disallowing it.
            invalidNameReason.value = "Name can not contain spaces or special characters, and must not start with a number."
            return false;
        }

        const uniqueName = !schemaStore.schemaExists(schemaName.value);
        if (!uniqueName) {
            invalidNameReason.value = "Name is already taken."
            return false;
        }

        return true;
    });

    
    function cancel() {
        emit('cancel');
    }

    function save() {
        if (validName) {
            schemaStore.createSchema(schemaName.value, schemaDescription.value);

            emit('save');
        }
    }

</script>




<style scoped lang="scss">

</style>