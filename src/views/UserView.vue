<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { UserModel } from '@/models/user.model'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'
import UserComponent from '@/components/user/UserComponent.vue'
import UserMock from '@/components/user/UserMock.vue'
import UserFilters from '@/components/user/UserFilters.vue'
import UserSearch from '@/components/user/UserSearch.vue'
import ActionOverlay from '@/components/ActionOverlay.vue'
import IconCancel from '@/components/icons/IconCancel.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

// const route = useRoute()
const { filteredList } = storeToRefs(useUserStore())
const { getUsers, updateSearch } = useUserStore()
const { loading } = storeToRefs(useLoadingStore())

let search = ref('')

onMounted(() => {
  if (filteredList?.value.length === 0) {
    getUsers().then((result) => {
      filteredList.value = result
    })
  }
})

const filteredUsers: ComputedRef<UserModel[]> = computed(() => {
  return filteredList?.value?.map((user: UserModel) => {
    return user
  })
})

watch(search, () => {
  updateSearch(search.value)
  search.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})
</script>

<template>
  <main>
    <teleport to="#menu-search">
      <div class="media__search">
        <input
          type="text"
          name="search"
          v-model="search"
          id="search"
          placeholder="Search users"
          autocomplete="off"
        />
        <IconSearch v-if="!search.length" class="button-icon" />
        <IconCancel v-if="!!search.length" class="button-icon" @click="search = ''" />
      </div>
    </teleport>
    <UserFilters />
    <transition name="fade" mode="out-in">
      <div class="medias" v-if="loading">
        <!-- <MediaMock v-for="i of filteredList?.length" :key="i" /> -->
        <UserMock v-for="i of 5" :key="i" />
      </div>
      <div class="medias" v-else-if="filteredList?.length !== 0">
        <UserComponent v-for="user of filteredUsers" :user="user" :key="user.id" />
      </div>
      <div class="medias" v-else>
        <UserMock v-for="i of 2" :key="i" />
      </div>
    </transition>
    <transition name="search" mode="out-in">
      <ActionOverlay
        v-if="!!search.length"
        class="overlay"
        :component="UserSearch"
        @exit="search = ''"
      />
    </transition>
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

.media__search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
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

  .medias {
    width: 100%;
    padding: 0 0.25rem;
  }

  .media__search {
    width: 100%;
  }
}
</style>
