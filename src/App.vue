<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotificationStore } from './stores/notification'
import { useTooltipStore } from './stores/tooltip';
import { useConfirmStore } from './stores/confirm';
import NotificationsBar from '@/components/NotificationsBar.vue'
import MenuBar from '@/components/MenuBar.vue'
import ElementTooltip from './components/atomic/ElementTooltip.vue';
import ConfirmationComponent from './components/ConfirmationComponent.vue';

const { notifications } = useNotificationStore()
const { tooltip } = storeToRefs(useTooltipStore())
const { isRevealed } = storeToRefs(useConfirmStore())
</script>

<template>
  <transition name="notifications">
    <NotificationsBar v-if="notifications.length" />
  </transition>
  <MenuBar />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <transition name="tooltip">
    <ElementTooltip class="tooltip" v-if="tooltip" />
  </transition>
  <ConfirmationComponent v-if="isRevealed" />
</template>

<style lang="scss" scoped>
@media (max-width: 1250px) {
  .tooltip {
    display: none;
  }
}
</style>
