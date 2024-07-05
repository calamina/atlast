<script setup lang="ts"></script>

<template>
  <main>
    <h1>hello (˶ᵔᵕᵔ˶)</h1>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  padding: 1rem 0;
  scrollbar-width: none;
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

.medias {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.25rem;
  width: 45rem;
}

.media__switch {
  display: flex;
  flex-flow: column;
  width: 45rem;
  gap: 0.25rem;
}

.media__search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--white);
  width: fit-content;
  padding: 0 0.5rem;
  border-radius: 3rem;
  width: 25rem;
  height: 3rem;
  z-index: 800;

  input[type='text'] {
    padding: 0 1rem;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 3rem;
    height: 3rem;
    font-family: var(--font-bold);
  }

  .button-icon {
    cursor: pointer;
  }
}

@media (max-width: 1250px) {
  main {
    grid-template-columns: 1fr;
  }

  .media__switch,
  .medias {
    width: 100%;
    padding: 0 0.25rem;
  }

  .media__search {
    width: 100%;
  }
}
</style>
