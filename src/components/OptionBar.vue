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
  <teleport to="#menu-options" v-if="displayOptions">
    <OptionButton @click="toggleSize()" info="Toggle size">
      <IconDetail />
    </OptionButton>
    <OptionButton @click="toggleImages()" info="Toggle images">
      <IconImage />
    </OptionButton>
    <OptionButton @click="toggleSidebar()" info="Toggle sidebar">
      <IconFilters />
    </OptionButton>
  </teleport>
</template>

<style lang="scss" scoped>
.optionBar {
  position: relative;
  display: flex;
  flex-flow: column;
  border-right: 1px solid var(--border);
  align-items: center;
}

@media (max-width: 1250px) {
  .optionBar {
    display: none;
  }
}
</style>
