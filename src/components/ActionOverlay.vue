<template>
  <div class="overlay-background">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.overlay-background {
  top: var(--fixed);
  background-color: var(--background);
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - var(--fixed));
  z-index: 800;
}
</style>
