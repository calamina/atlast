<script setup lang="ts">
import IconLink from '@/components/icons/iconLink.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const library = [
  { type: 'links', number: '10', color: '' },
  { type: 'media', number: '20', color: '' },
  { type: 'notes', number: '30', color: '' }
]
</script>
<template>
  <div class="dashboard">
    <div>hey {{ user.connectedUser.username }} :)</div>
    <div class="item-wrapper">
      <div v-for="(item, index) in library" :key="index" :class="item.type" class="item">
        <div class="item__header">
          <h2>{{ item.type }}</h2>
          <button type="button" class="item__button button-icon" :class="item.type + '__button'">
            <IconLink />
          </button>
        </div>
        <p class="item__count">{{ item.number }} in library</p>
        <button class="item__add" :class="item.type + '__add'">add new +</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dashboard {
  width: 100%;
  padding: 6rem 1rem 0;
}

.item-wrapper {
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
}
.item {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #ddd;
  padding: 1rem;
  border-radius: 1rem;
  width: 15rem;

  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    justify-content: space-between;
    text-transform: capitalize;
  }

  &__button {
    border-radius: 1rem;
  }

  &__count {
    font-size: 0.85rem;
    opacity: 0.6;
  }

  &__add {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
    border-radius: 0.5rem;
  }
}

.links {
  background-color: #dfcfe8;
  &__button,
  &__add {
    background-color: #c0a6cd;
  }
}
.media {
  background-color: rgb(147, 207, 174);
  &__button,
  &__add {
    background-color: rgb(98, 167, 129);
  }
}
.notes {
  background-color: rgb(218, 152, 173);
  &__button,
  &__add {
    background-color: rgb(177, 91, 119);
  }
}
</style>
