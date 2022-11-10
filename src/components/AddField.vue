<template>
    <div class="card">
        <div class="card-header">
            New Field
        </div>

        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="fieldLabel">Field Label:</label>
                    <input class="form-control" v-model="fieldLabel" 
                        @change="labelHasChanged"
                        :class="{'is-invalid': showLabelInvalid && !validName }"
                        type="text" id="fieldLabel" />
                </div>
                
                <div class="mb-3">
                    <label for="fieldDescription">Description:</label>
                    <textarea class="form-control" v-model="fieldDescription" placeholder="Description..." id="fieldDecsription"> </textarea>
                </div>

                <div class="mb-3">
                    <label for="fieldType"> Type: </label>
                    <select class="form-control" v-model="fieldType" id="fieldType">
                        <option v-for="type in fieldTypes" :value="type"> 

                            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                        </option>
                    </select>
                </div>

                <div class="form-check mb-3">
                    <input class="form-check-input" v-model="fieldRequired" type="checkbox" id="fieldRequired" /> 
                    <label class="form-check-label" for="fieldRequired"> Required? </label> 
                </div>

            </form>

            <button class="btn btn-dark" :class="{ 'disabled': !validName }" :disabled="!validName"> Save </button>
            <button class="ms-3 btn btn-light"> Cancel </button>
        </div>
    </div>
</template>



<script setup lang="ts">
    import { inject, ref, computed, watch } from 'vue';
    import { type Schema, FieldType, type SchemaFieldClass } from '@/models/schemas';

    import { SchemaStore } from '@/stores/schemaStore';

    // Setup stuff
    const schemasStore = SchemaStore();

    const emit = defineEmits(['saved', 'cancel']);

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
        // const invalidCharacters = /^[^\w]\s*$/.test(fieldLabel.value)   //fieldLabel.
        const validCharacters = /^[a-zA-Z]\w*$/.test(fieldLabel.value);
        const uniqueName = schema.getField(fieldLabel.value) == undefined;
        return notEmpty && validCharacters && uniqueName;
    });

    // Emited events
    function cancel() {
        emit('cancel');
    }

    function save() {
        schemasStore.addSimpleSchemaField(schema.name,
            fieldLabel.value,
            <FieldType> fieldType.value,
            fieldDescription.value,
            fieldRequired.value,
        );
        emit('saved');
    }


    
</script>




<style scoped lang="scss">

</style>