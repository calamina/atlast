<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useStateStore } from '@/stores/state';

import IconDetail from './icons/IconDetail.vue';
import IconImage from './icons/IconImage.vue';
import IconFilters from './icons/IconFilters.vue';
import OptionButton from './atomic/OptionButton.vue';

const { toggleSize, toggleSidebar, toggleImages } = useStateStore()
const { displayOptions } = storeToRefs(useStateStore())
</script>

<template>
  <teleport to="#menu-options">
    <transition name="menu">
      <div class="optionBar" v-if="displayOptions">
        <OptionButton @click="toggleSize()" info="Toggle size">
          <IconDetail />
        </OptionButton>
        <OptionButton @click="toggleImages()" info="Toggle images">
          <IconImage />
        </OptionButton>
        <OptionButton @click="toggleSidebar()" info="Toggle sidebar">
          <IconFilters />
        </OptionButton>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.optionBar {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  height: fit-content;
  border-radius: 2rem;
  background-color: var(--background-darker);
}

@media (max-width: 1250px) {
  .optionBar {
    background-color: var(--white);
  }
}
</style>
