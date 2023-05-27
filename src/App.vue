<script setup lang="ts">
import { ref, shallowRef, type Component, type Ref, type ShallowRef } from 'vue'
import { RouterView } from 'vue-router'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { useUserStore } from './stores/user'
import router from '@/router/index'

import MediaSearch from './views/MediaSearch.vue'

import NotificationBar from '@/components/NotificationBar.vue'
import MenuBar from '@/components/MenuBar.vue'
import ActionOverlay from './components/ActionOverlay.vue'
import LinkNewComponent from './components/links/LinkNewComponent.vue'

const searchActive: Ref<boolean> = ref(false)
const searchComponent: ShallowRef<null | Component> = shallowRef(null)

const user = useUserStore()

function toggleSearchModal(component: Component) {
  if (searchComponent.value !== component && searchActive.value) {
    searchComponent.value = component
  } else {
    searchActive.value = !searchActive.value
    searchComponent.value = component
  }
  // searchComponent.value = component
  document.documentElement.style.overflow === 'hidden'
    ? (document.documentElement.style.overflow = 'auto')
    : (document.documentElement.style.overflow = 'hidden')
}

const ctrl = useKeyModifier('Control')
onKeyStroke(['s', 'm', 'l', 'u'], (e: any) => {
  if (ctrl.value) {
    e.preventDefault()
    if (e.key === 's') toggleSearchModal(MediaSearch)
    if (e.key === 'u') toggleSearchModal(LinkNewComponent)
    if (e.key === 'm') router.push('/media')
    if (e.key === 'l') router.push('/links')
  }
})
</script>

<template>
  <NotificationBar class="notification" />

  <Suspense>
    <transition name="search" mode="out-in">
      <ActionOverlay
        v-if="searchActive && searchComponent"
        class="overlay"
        :component="searchComponent"
        :key="searchComponent.name"
        @toggleSearch="toggleSearchModal"
      />
    </transition>
  </Suspense>

  <Suspense>
    <MenuBar
      v-if="user.connectedUser"
      @openLinks="toggleSearchModal(LinkNewComponent)"
      @openMedia="toggleSearchModal(MediaSearch)"
    />
    <!-- <MenuBar v-if="user.connectedUser" @toggleSearch="toggleSearchModal" /> -->
  </Suspense>

  <Suspense>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </Suspense>
</template>

<style lang="scss" scoped>
.notification {
  z-index: 666;
}

.overlay {
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
