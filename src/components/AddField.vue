<template>
    <div class="card">
        <div class="card-header">
            New Schema
        </div>

        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="fieldLabel">Field Label: <small>(Required)</small></label>
                    <input class="form-control" v-model="fieldLabel" 
                        @change="labelHasChanged"
                        :class="{'is-invalid': showLabelInvalid && !validName }"
                        type="text" id="fieldLabel" />
                    <div class="invalid-feedback">
                        {{ invalidNameReason }}
                    </div>
                </div>
                
                <div class="mb-3">
                    <label for="fieldDescription">Description:</label>
                    <textarea class="form-control" v-model="fieldDescription" placeholder="Description..." id="fieldDescription"> </textarea>
                </div>

                <div class="mb-3">
                    <label for="fieldType"> Type: <small>(Required)</small> </label>
                    <select class="form-control" :class="{ 'text-secondary': fieldType == '' }" v-model="fieldType" id="fieldType">
                        <option class="text-light" value="" selected disabled> Please select a field type </option>
                        <option v-for="type in fieldTypes" :value="type" :key="type"> 

                            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                        </option>
                    </select>
                </div>

                <div class="form-check mb-3">
                    <input class="form-check-input" v-model="fieldRequired" type="checkbox" id="fieldRequired" /> 
                    <label class="form-check-label" for="fieldRequired"> Required? </label> 
                    <!-- The way the logic works that its currently impossible for this to be shown, but its included anyways -->
                    <!--  for future-proofing -->
                    <div class="invalid-feedback">
                        {{ invalidNameReason }}
                    </div>
                </div>

            </form>

            <button class="btn btn-dark" :class="{ 'disabled': !validForm }" :disabled="!validForm"
                @click="save"> 
                Save 
            </button>
            <button class="ms-3 btn btn-light" @click="cancel"> Cancel </button>
        </div>
    </div>
</template>



<script setup lang="ts">
    import { inject, ref, computed, watch } from 'vue';
    import { type Schema, FieldType, type SchemaFieldClass } from '@/models/schemas';

    import { UseSchemaStore } from '@/stores/schemaStore';

    // Setup stuff
    const schemaStore = UseSchemaStore();

    const emit = defineEmits(['save', 'cancel']);

    const schema: Schema = <Schema>inject('schema');

    // Data
    // Todo: is there a more programatic way of description potential field keys?
    const fieldTypes: FieldType[] = [
        FieldType.number,
        FieldType.string,
        FieldType.boolean,
        FieldType.email,
        // FieldType.object,
        // FieldType.array,
    ];
    
    const fieldLabel = ref('');
    const fieldDescription = ref('');
    const fieldType = ref('');
    const fieldRequired = ref(false);

    const invalidNameReason = ref('');
    const invalidTypeReason = ref('');

    const unchangedLabel = ref(true);
    const showLabelInvalid = ref(false);

    function labelHasChanged() {
        unchangedLabel.value = false;
    }

    // Temporary check
    watch(unchangedLabel, (newVal, oldVal) => {
        showLabelInvalid.value = true;
    });

    // Computed Values
    const validName = computed(() => {

        const notEmpty = fieldLabel.value != '';
        // Todo: Is there potential for bugs? Is this side-effecty? Is there a better way to do this?
        if (!notEmpty) {
            invalidNameReason.value = "Please type a label."
            return false;
        }
        
        const validCharacters = /^[a-zA-Z]\w*$/.test(fieldLabel.value);
        if (!validCharacters) {
            // Todo: is there a valid reason why it can't start with a number?
            invalidNameReason.value = "Label can not contain spaces or special characters, and must not start with a number."
            return false;
        }
        
        const uniqueName = schema.getField(fieldLabel.value) == undefined;
        if (!uniqueName) {
            invalidNameReason.value = "Label is already taken."
            return false;
        }

        return true;
    });

    const validType = computed(() => {
        const fieldTypeSelected = fieldTypes.indexOf(<FieldType> fieldType.value) != -1;
        if (!fieldTypeSelected) {
            invalidTypeReason.value = "Please select the field's type";
            return false;
        } 
        return true;  
    });

    const validForm = computed(() => {
        return validName.value && validType.value;
    });

    // Emited events
    function cancel() {
        emit('cancel');
    }

    function save() {
        schemaStore.addSimpleSchemaField(schema.name,
            fieldLabel.value,
            <FieldType> fieldType.value,
            fieldDescription.value,
            fieldRequired.value,
        );
        emit('save');
    }
    
</script>




<style scoped lang="scss">

</style>