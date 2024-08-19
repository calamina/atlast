<script setup lang="ts">
import { ref, type Component, type Ref } from 'vue';
import { useMagicKeys, whenever } from '@vueuse/core'
import ActionOverlay from '@/components/ActionOverlay.vue'
import IconCancel from '@/components/icons/IconCancel.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const search = defineModel<string>({ required: true })
const props = defineProps<{
  component: Component
  placeholder: string
}>()


const keys = useMagicKeys()
const input: Ref<HTMLInputElement | null> = ref(null);

whenever(keys.shift_s, () => {
  if (document.activeElement === input.value) {
    search.value = ''
    input.value?.blur();
  }
  else {
    setTimeout(function () {
      input.value?.focus();
    }, 20);
  }
})
</script>

<template>
  <teleport to="#menu-search">
    <div class="media__search">
      <input ref="input" type="text" name="search" v-model="search" id="search" :placeholder="props.placeholder"
        autocomplete="off" />
      <!-- <span>[shift + s]</span> -->
      <IconSearch v-if="!search.length" class="button-icon" />
      <IconCancel v-if="!!search.length" class="button-icon" @click="search = ''" />
    </div>
  </teleport>
  <transition name="search" mode="out-in">
    <ActionOverlay v-if="!!search.length" class="overlay" :component="props.component" @exit="search = ''" />
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
    font-size: 1.1rem;
    border-radius: 3rem;
    height: 2.5rem;
    font-family: var(--font-bold);
    background-color: var(--white);

    &::placeholder {
      opacity: 0.8;
      color: var(--text-light);
    }
  }

  span {
    display: block;
    width: fit-content;
    white-space: nowrap;
    font-family: var(--font-bold);
    color: var(--text-light);
    padding-right: 0.25rem;
    padding-bottom: 0.15rem;
    font-size: 1rem;
    opacity: 0.5;
  }

  .button-icon {
    cursor: pointer;
    color: var(--text-light);
    padding: 0.6rem;
  }
}
</style>
