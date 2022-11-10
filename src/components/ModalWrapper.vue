<template>
    <div>
        <slot></slot>
    </div>
</template>



<script setup lang="ts">
    
</script>




<style scoped lang="scss">
    div {
        position: fixed;
        width: 50%;
        margin-left: 25%;
        margin-right: 25%;
        top: 78px;
        z-index: 9999;
        // border: 1px solid black;
        // color: red;

        overflow-y: scroll;

        max-height: 80%;
    }
</style>