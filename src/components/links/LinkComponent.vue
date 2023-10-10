<script setup lang="ts">
import { computed } from 'vue'

import { useLinkStore } from '@/stores/link'
import type { LinkModel } from '@/models/link.model'

import categs from '@/utils/link-categs'

import IconDelete from '@/components/icons/IconDelete.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

const emits = defineEmits(['enableEdit'])
const props = defineProps<{
  link: LinkModel
}>()

const linkstore = useLinkStore()

const categ = computed(() => {
  return categs.find((categ: { name: string }) => categ.name === props.link.category)
})

function deleteLink(id: number | undefined) {
  if (id) {
    linkstore.deleteUserLink(id)
  }
}
</script>

<template>
  <div class="link-wrapper">
    <div class="categ">
      <div type="button" class="button-icon">
        <component :is="categ!.component"></component>
      </div>
    </div>
    <div class="link">
      <div class="link__header">
        <a class="link__link" :href="props.link.url" target="_blank">
          <p class="link__title">{{ props.link.title }}</p>
          <p class="link__url">
            {{ props.link.url }}
          </p>
        </a>
      </div>
      <p v-if="props.link.description" class="link__description">
        {{ props.link.description }}
      </p>
      <div v-if="props.link.tags" class="link__footer">
        <button class="link__tags" v-for="tag in props.link.tags" :key="tag">
          {{ tag }}
        </button>
      </div>
    </div>
    <div class="actions">
      <button type="button" class="button-icon icon">
        <IconLike />
      </button>
      <button type="button" class="button-icon icon" @click="$emit('enableEdit')">
        <IconEdit />
      </button>
      <button type="button" class="button-icon icon" @click="deleteLink(link.id)">
        <IconDelete />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link-wrapper {
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  padding: 1rem;
  transition: padding 0.3s;
  background-color: #efefef;
}

.link-wrapper:hover .actions {
  display: flex;
}

.categ,
.actions {
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 0.5rem;
  border-radius: 2rem;
}

.icon {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.55rem;
  border-radius: 100%;
}

.categ {
  padding: 0.25rem;
  background-color: #ddd;
}

.actions {
  display: none;
  position: absolute;
  right: 0;
  top: 0.75rem;
}

.actions button {
  border-radius: 2rem;
}

.link {
  display: flex;
  flex-flow: column;
  padding: 0rem;
  align-self: flex-start;

  &__header,
  &__footer,
  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__footer {
    margin-top: 0.1rem;
    justify-content: flex-start;
    gap: 0.25rem;
  }

  &__link {
    display: flex;
    line-height: 1.4rem;
    flex-flow: column;
    text-decoration: none;
    color: black;
    flex: 1;
    gap: 0.1rem;
  }

  &__title {
    font-size: 1.25rem;
    font-family: var(--font-bold);
    text-transform: capitalize;
  }

  &__url,
  &__date {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1rem;
    opacity: 0.7;
    font-style: oblique;
  }

  &__tags {
    padding: 0.05rem 0.5rem;
    background-color: #ddd;
    color: #000000;
    width: fit-content;
    font-size: 0.85rem;
    opacity: 0.5;
    transition: opacity 0.3s;

    &::before {
      content: '#';
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
