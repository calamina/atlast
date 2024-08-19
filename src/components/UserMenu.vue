<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useUserStore } from '@/stores/user';
import IconUserOff from './icons/IconUserOff.vue';
import IconUser from './icons/IconUser.vue';

const { logout } = useUserStore()
const menu = ref(null)
const isSubmenuVisible = ref(false)

onClickOutside(
  menu, _event => isSubmenuVisible.value = false
)

function disconnect() {
  isSubmenuVisible.value = false
  logout()
}

function openUserMenu() {
  isSubmenuVisible.value = !isSubmenuVisible.value
}
</script>
<template>
  <div class="user" ref="menu">
    <div class="menu-icon">
      <button class="button-icon" type="button" @click="openUserMenu()">
        <IconUser />
      </button>
    </div>
    <div class="submenu" v-if="isSubmenuVisible">
      <button class="button-icon" type="button" @click="disconnect()">
        <IconUserOff />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  border-left: 1px solid var(--border);
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0 0.5rem 1.25rem;
  grid-column: span 2;

  button {
    background-color: var(--background-darker);
    border-radius: 100%;
  }
}

.submenu {
  display: flex;
  align-items: flex-start;
  
  button {
    background-color: var(--white);
    border-radius: 100%;
  }
}

</style>