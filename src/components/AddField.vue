<template>
    <div class="card">
        <div class="card-header">
            New Field
        </div>

        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="fieldLabel">Field Label</label>
                    <input class="form-control" type="text" id="fieldLabel" />
                </div>
                
                <div class="mb-3">
                    <label for="fieldDescription">Field Label</label>
                    <textarea class="form-control"  placeholder="Description..." id="fieldDecsription"> </textarea>
                </div>

                <div class="mb-3">
                    <label for="fieldType"> Type: </label>
                    <select class="form-control" id="fieldType">
                        <option value="1"> 1 </option>
                        <option value="2"> 2 </option>
                    </select>
                </div>

                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="fieldRequired" /> <label class="form-check-label" for="fieldRequired"> Required? </label> 
                </div>

            </form>

            <button class="btn btn-dark"> Save </button>
            <button class="ms-3 btn btn-light"> Cancel </button>
        </div>
    </div>
</template>



<script setup lang="ts">


</script>




<style scoped lang="scss">

</style>