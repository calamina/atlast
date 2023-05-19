<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationBar from '@/components/NotificationBar.vue'
import MenuBar from '@/components/MenuBar.vue'
import { ref } from 'vue'
import MediaSearch from './views/MediaSearch.vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { useUserStore } from './stores/user'

const searchActive = ref(false)

const user = useUserStore()

function toggleSearchModal() {
  searchActive.value = !searchActive.value
  document.documentElement.style.overflow === 'hidden'
    ? (document.documentElement.style.overflow = 'auto')
    : (document.documentElement.style.overflow = 'hidden')
}

const ctrl = useKeyModifier('Control')
onKeyStroke('s', (e) => {
  if (ctrl.value) {
    e.preventDefault()
    toggleSearchModal()
  }
})
</script>

<template>
  <NotificationBar class="notification" />

  <Suspense>
    <transition name="search" mode="out-in">
      <MediaSearch class="searchModal" v-if="searchActive" @toggleSearch="toggleSearchModal" />
    </transition>
  </Suspense>

  <Suspense>
    <MenuBar v-if="user.connectedUser" @toggleSearch="toggleSearchModal" />
  </Suspense>

  <Suspense>
    <router-view v-slot="{ Component }">
      <!-- <transition name="router" mode="out-in"> -->
      <component :is="Component" />
      <!-- </transition> -->
    </router-view>
  </Suspense>
</template>

<style lang="scss" scoped>
.notification {
  z-index: 666;
}

.searchModal {
  z-index: 444;
  position: absolute;
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

// searchbar transition
.search-enter-active,
.search-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.search-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}
.search-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
