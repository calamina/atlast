<template>
  <form class="form" action="" @submit.prevent>
    <slot />
  </form>
</template>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}
</style>
