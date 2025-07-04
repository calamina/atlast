<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useConfirmStore } from '@/stores/confirm';
import { onMounted, onUnmounted, ref } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const { confirm, cancel, dialogMessage } = useConfirmStore()

onKeyStroke('Escape', () => cancel())

const choice = ref('choice')
useFocusTrap(choice, { immediate: true })
</script>

<template>
    <div class="overlay">
        <div class="dialog">
            <p>{{ dialogMessage }}</p>
            <div class="buttons" ref="choice">
                <button id="cancel" class="button" @click="cancel">Cancel</button>
                <button class="button button-confirm" @click="confirm">Confirm</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-transparent);
}

.dialog {
    background-color: var(--white);
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 1rem;
}

p {
    font-family: var(--font-bold);
}

.buttons {
    display: flex;
    gap: 1rem;
}

button {
    font-family: var(--font-bold);
    padding: 0.25rem 1.25rem 0.3rem;
    border-radius: 2rem;
    background-color: var(--background);

    &.button-confirm {
        background-color: var(--highlight);
    }

    &:focus {
        outline-color: var(--text);
    }
}
</style>
