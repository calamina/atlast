<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { useTooltipStore } from '@/stores/tooltip';
import { storeToRefs } from 'pinia';

const { tooltip } = storeToRefs(useTooltipStore())
const { x, y } = useMouse()
</script>

<template>
    <p>{{ tooltip}}</p>
</template>

<style scoped lang="scss">
p {
    z-index: 1000;
    position: absolute;
    width: fit-content;
    left: v-bind('x + 20 + "px"');
    top: v-bind('y - 15 + "px"');
    background-color: #ddd;
    color: #666;
    font-size: 0.9rem;
    font-family: var(--font-bold);
    padding: 0.25rem 1.25rem 0.4rem;
    border-radius: 1rem;
}
</style>
