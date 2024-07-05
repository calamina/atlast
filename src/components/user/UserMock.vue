<template>
  <div class="media">
    <div class="media__image"></div>
    <div class="media__content">
      <div class="media__title"></div>
      <div class="media__description"></div>
      <div class="media__footer">
        <div class="media__status"></div>
        <div class="media__categ"></div>
        <div class="media__categ"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media {
  position: relative;
  display: flex;
  flex-flow: row;
  width: 100%;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 1.5rem;
  background-color: var(--background);
  transform-origin: left;
  animation: enter 0.3s ease-in-out;

  &__image {
    height: 5.5rem;
    width: 5.5rem;
    border-radius: 1rem;
    background-color: var(--background-darker);
  }
  &__title {
    width: 10rem;
    height: 1.75rem;
    background-color: var(--background-darker);
  }
  &__description {
    width: 15rem;
    height: 1.25rem;
    background-color: var(--background-darker);
  }
  &__categ {
    height: 1.75rem;
    width: 6rem;
    background-color: var(--background-darker);
    border-radius: 1rem;
  }

  &__content {
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.3rem;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__status {
    height: 1.5rem;
    width: 1.5rem;
    padding: 0.25rem;
    border-radius: 1rem;
    background-color: var(--background-darker);
  }
}

// @keyframes enter {
//   0% {
//     transform: scale(0.8);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
</style>
