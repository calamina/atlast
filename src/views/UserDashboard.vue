<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>
<template>
  <div>hey {{ user.connectedUser.username }} :)</div>
</template>
<style lang="scss" scoped></style>
