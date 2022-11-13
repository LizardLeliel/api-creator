<template>
    <div class="outer">
        <div class="inner">
            <slot> </slot>
        </div>
    </div>
</template>



<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';

    onMounted(() => {
        document.body.style.overflow = 'hidden';
        
    });
    
    onUnmounted(() => {
        document.body.style.overflow = 'auto';
    })
</script>




<style scoped lang="scss">
    div.outer {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background-color: #6666;

        z-index: 9998;
    }

    div.inner {
        position: fixed;
        width: 50%;

        margin-left: calc(25% + 50px);
        margin-right: calc(25% + 50px);
        margin-top: 50px;
        margin-bottom: 50px;
        
        top: 78px;
        z-index: 9999;
        max-height: 80%;
        overflow-y: scroll;

    }
</style>