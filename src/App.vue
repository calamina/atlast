<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationBar from '@/components/NotificationBar.vue'
import IconClose from './components/icons/IconClose.vue'
</script>

<template>
  <NotificationBar class="notification" />
  <nav>
    <div>
      <router-link to="/">home</router-link>
      <router-link to="user">auth</router-link>
    </div>
    <div>
      <a href="">username</a>
    </div>
  </nav>
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

nav {
  position: absolute;
  top: 4rem;
  width: 90vw;
  padding: 1.2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2rem;
  background-color: #ddd;

  & div {
    display: flex;
    flex-flow: row;
    gap: 2rem;
  }

  & a {
    color: #aaa;
    text-decoration: none;
    transition: color 0.3s;

    &.router-link-active {
      color: black;
    }
  }
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
