<script setup lang="ts">
import { useMediaStore } from '@/stores/media';
import { storeToRefs } from 'pinia';
import IconBottom from '../icons/IconBottom.vue';
import IconTop from '../icons/IconTop.vue';

const { pagination } = storeToRefs(useMediaStore())
</script>

<template>
    <div>
        <button :disabled="pagination.page === 1" @click="pagination.page--"><IconTop /></button>
        <p>{{ pagination.page }}/{{ pagination.pageCount }}</p>
        <button :disabled="pagination.page === pagination.pageCount" @click="pagination.page++"><IconBottom /></button>
    </div>
</template>

<style lang="scss" scoped>
div {
    display: flex;
    flex-flow: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: .25rem 0;
    background-color: var(--background-darker);
    // border-radius: 2rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
}

p {
    font-family: var(--font-bold);
    opacity: 0.5;
    padding-bottom: 0.2rem;
    // font-size: 0.9rem;
}
</style>
