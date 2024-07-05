<script setup lang="ts">
import { useMediaStore } from '@/stores/media';
import { storeToRefs } from 'pinia';
import IconPlus from '../icons/IconPlus.vue';
import IconMinus from '../icons/IconMinus.vue';

const { pagination } = storeToRefs(useMediaStore())
</script>

<template>
    <div>
        <button :disabled="pagination.page === 1" @click="pagination.page--"><IconMinus /></button>
        <p>{{ pagination.page }} / {{ pagination.pageCount }}</p>
        <button :disabled="pagination.page === pagination.pageCount" @click="pagination.page++"><IconPlus /></button>
    </div>
</template>

<style lang="scss" scoped>
div {
    padding-top: 2rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    background-color: var(--background-darker);
    border-radius: 2rem;
    
    &:disabled {
        background-color: transparent;
        opacity: 0.5;
        cursor: default;
    }
}

p {
    font-family: var(--font-bold);
    opacity: 0.5;
    padding-bottom: 0.2rem;
}
</style>
