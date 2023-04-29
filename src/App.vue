<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationBar from '@/components/NotificationBar.vue'
import MenuBar from '@/components/MenuBar.vue'
</script>

<template>
  <NotificationBar class="notification" />

  <Suspense>
    <MenuBar />
  </Suspense>

  <Suspense>
    <router-view v-slot="{ Component }">
      <transition name="router" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </Suspense>
</template>

<style lang="scss" scoped>
.notification {
  z-index: 666;
}

.router-enter-active,
.router-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.router-enter-from {
  opacity: 0;
  transform: translateX(-5rem);
}
.router-leave-to {
  opacity: 0;
  transform: translateX(5rem);
}
</style>
