<script setup lang="ts">
import { useNotificationStore } from './stores/notification'
import NotificationsBar from '@/components/NotificationsBar.vue'
import MenuBar from '@/components/MenuBar.vue'
import ElementTooltip from './components/atomic/ElementTooltip.vue';
import { useTooltipStore } from './stores/tooltip';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useFavicon } from '@vueuse/core';

const { notifications } = useNotificationStore()
const {tooltip} = storeToRefs(useTooltipStore())

onMounted(() => 
  useFavicon("../public/atlast.svg")
)
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
</template>
