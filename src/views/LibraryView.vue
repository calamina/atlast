<script setup lang="ts"></script>
<template>
  <div class="library">
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }">
      <transition name="library" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> -->
  </div>
</template>
<style lang="scss" scoped>
.library {
  margin-top: 5rem;
}

// .library-enter-active,
// .library-leave-active {
//   transition: opacity 0.3s ease, transform 0.3s ease;
// }

// .library-enter-from {
//   opacity: 0;
//   transform: translateY(-1rem);
// }
// .library-leave-to {
//   opacity: 0;
//   transform: translateY(1rem);
// }
</style>
