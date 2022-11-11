<template>
    <div class="outer">
        <div class="inner">
            <slot></slot>
        </div>
    </div> 
</template>



<script setup lang="ts">
    
</script>




<style scoped lang="scss">
    div.outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: #6666;

        z-index: 9998;
    }

    div.inner {
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