<template>
  <div class="overlay-background">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.overlay-background {
  top: calc(var(--fixed) + 2px - 1.25rem);
  height: calc(100vh - 3rem);
  background-color: var(--background);
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  padding-right: 1.5rem;
  // top: 0;
  // padding-top: calc(var(--fixed) + 2px - 1.25rem);
  // z-index: -1;
}

@media (max-width: 1250px) {
  .overlay-background {
    top: calc(var(--fixed) + 2px - 1.75rem);
    width: calc(100% - 1rem);
    padding: 0;
  }
}
</style>
