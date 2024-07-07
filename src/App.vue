<script setup lang="ts">
import { useNotificationStore } from './stores/notification'
import NotificationsBar from '@/components/NotificationsBar.vue'
import MenuBar from '@/components/MenuBar.vue'
import ElementTooltip from './components/atomic/ElementTooltip.vue';
import { useTooltipStore } from './stores/tooltip';
import { storeToRefs } from 'pinia';
import ConfirmationComponent from './components/ConfirmationComponent.vue';
import { useConfirmStore } from './stores/confirm';

const { notifications } = useNotificationStore()
const {tooltip} = storeToRefs(useTooltipStore())
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
  <ElementTooltip v-if="tooltip" />
  <ConfirmationComponent v-if="isRevealed" />
</template>
