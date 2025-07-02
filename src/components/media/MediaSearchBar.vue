<script setup lang="ts">
import { ref, type Component, type Ref } from 'vue';
import { useMagicKeys, whenever } from '@vueuse/core'
import ActionOverlay from '@/components/ActionOverlay.vue'
import IconCancel from '@/components/icons/IconCancel.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const search = defineModel<string>({ required: true })
const { component, placeholder } = defineProps<{
  component: Component
  placeholder: string
}>()

const input: Ref<HTMLInputElement | null> = ref(null);

const { ctrl_s } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's' && e.type === 'keydown')
      e.preventDefault()
  },
})

whenever(ctrl_s, () => {
  if (document.activeElement === input.value) {
    search.value = ''
    input.value?.blur();
  }
  else {
    input.value?.focus();
  }
})
</script>

<template>
  <teleport to="#menu-search">
    <div class="media__search">
      <input ref="input" type="text" name="search" v-model="search" id="search" :placeholder="placeholder"
             autocomplete="off" />
      <div class="input-info">
        <span>ctrl + s</span>
        <IconSearch v-if="!search.length" class="button-icon" />
        <IconCancel v-if="!!search.length" class="button-icon" @click="search = ''" />
      </div>
    </div>
  </teleport>
  <transition name="search" mode="out-in">
    <ActionOverlay v-if="!!search.length" class="overlay" :component="component" />
  </transition>
</template>

<style lang="scss" scoped>
.media__search {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 2rem;
  width: 100%;
  height: 2.5rem;
  z-index: 800;
  background-color: var(--white);

  input[type='text'] {
    padding: 0 1rem;
    text-align: center;
    font-size: 1rem;
    border-radius: 3rem;
    height: 2.5rem;
    font-family: var(--font-bold);
    background-color: var(--white);

    &::placeholder {
      opacity: 0.8;
      color: var(--text-light);
    }

    &:focus {
      outline: 2px solid var(--background-darker);
    }
  }

  .input-info {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
  }

  span {
    display: block;
    width: fit-content;
    white-space: nowrap;
    font-family: var(--font-bold);
    color: var(--text-light);
    padding-right: 0.25rem;
    padding-bottom: 0.15rem;
    font-size: .9rem;
    opacity: 0.5;
  }

  .button-icon {
    color: var(--text-light);
    padding: 0.6rem;
    // cursor: pointer;
  }
}
</style>
