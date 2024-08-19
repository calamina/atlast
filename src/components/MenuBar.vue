<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

import { useMediaStore } from '@/stores/media'
import { useStateStore } from '@/stores/state'
import { useTooltipStore } from '@/stores/tooltip'

import UserMenu from './UserMenu.vue'
import MenuLink from './atomic/MenuLink.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconBook from './icons/IconBook.vue'
import IconLayout from './icons/IconLayout.vue'

const { connectedUser } = storeToRefs(useUserStore())
const { mediaSearch } = storeToRefs(useMediaStore())
const { displayActions } = storeToRefs(useStateStore())
const { toggleActions } = useStateStore();
const { setTooltip, resetTooltip } = useTooltipStore()
</script>

<template>
  <nav v-if="connectedUser">
    <div class="submenu">
      <div class="types" :class="{ mask: mediaSearch.length }">
        <MenuLink :route="'media'" :icon="IconBook" :name="'library'" />
        <MenuLink :route="'user'" :icon="IconUser" :name="'users'" />
        <!-- <MenuLink :route="'links'" :icon="IconLink" :name="'links'" /> -->
      </div>
    </div>
    <div class="sep" :class="{ mask: mediaSearch.length }">
      <button class="button-icon" @click="toggleActions" @mouseover="setTooltip('Show Options')" @mouseleave="resetTooltip()">
          <IconLayout />
        </button>
    </div>
    <div id="menu-search"></div>
    <UserMenu :class="{ mask: mediaSearch.length }" />
  </nav>
</template>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 500;
  width: 100vw;
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 5.5rem 1fr 5.5rem 1fr;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
  transition: 0.3s;
}

.submenu {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.types {
  display: flex;
  gap: 0.5rem;
  width: 18rem;
  padding-left: 1rem;
}

.button-icon {
  background-color: var(--background-darker);
  border-radius: 100%;
}

.sep {
  border-right: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .button-icon &:disabled {
    color: var(--active-plus);
  }
}

.mask {
  opacity: 0.3;
  pointer-events: none;
}

#menu-search {
  display: flex;
  min-width: 40vw;
  padding: 0 1rem;
}

@media (max-width: 1250px) {}
</style>
