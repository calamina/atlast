<template>
  <div class="overlay-background">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.overlay-background {
  top: 0;
  background-color: var(--background);
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding-top: calc(var(--fixed) + 2px - 1.25rem);
  padding-right: 1.5rem;
  overflow-y: auto;
  z-index: -1;
}
</style>
