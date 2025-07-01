<template>
  <div class="media">
    <div class="image"></div>
    <div class="content">
      <div class="title"></div>
      <div class="description"></div>
      <div class="footer">
        <div class="status"></div>
        <div class="categ"></div>
        <div class="categ"></div>
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
}

.image {
  height: 5.5rem;
  width: 5.5rem;
  border-radius: 1rem;
  background-color: var(--background-darker);
}

.title {
  width: 10rem;
  height: 1.75rem;
  background-color: var(--background-darker);
}

.description {
  width: 15rem;
  height: 1.25rem;
  background-color: var(--background-darker);
}

.categ {
  height: 1.75rem;
  width: 6rem;
  background-color: var(--background-darker);
  border-radius: 1rem;
}

.content {
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 0.3rem;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status {
  height: 1.5rem;
  width: 1.5rem;
  padding: 0.25rem;
  border-radius: 1rem;
  background-color: var(--background-darker);
}
</style>
