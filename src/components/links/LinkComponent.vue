<script setup lang="ts">
import { useDateFormat } from '@vueuse/shared'

import { useLinkService } from '@/services/link.service'

import type { linkModel } from '@/models/link.model'

import categs from '@/utils/link-categs'

import IconDelete from '@/components/icons/iconDelete.vue'
import IconLike from '@/components/icons/iconLike.vue'
import IconEdit from '@/components/icons/iconEdit.vue'
import { computed } from 'vue'

const props = defineProps<{
  link: linkModel
}>()
const emits = defineEmits(['enableEdit'])

const { deleteUserLink } = useLinkService()

const categ = computed(() => {
  return categs.find((categ: any) => categ.name === props.link.category)
})

function deleteLink(id: number | undefined) {
  if (id) {
    deleteUserLink(id)
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
            <!-- <IconLink class="text-icon" />  -->
            {{ props.link.url }}
          </p>
        </a>
        <!-- <p class="link__date">
          {{ useDateFormat(props.link.date, 'DD/MM/YY').value }}
        </p> -->
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
      <button type="button" class="button-icon"><IconLike /></button>
      <button type="button" class="button-icon" @click="$emit('enableEdit')">
        <IconEdit />
      </button>
      <button type="button" class="button-icon" @click="deleteLink(link.id)">
        <IconDelete />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categ,
.actions {
  background-color: #ddd;
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 0.5rem;
  border-radius: 2rem;
}

// .categ {
//   background-color: #c0a6cd;
// }

.actions button {
  border-radius: 2rem;
}

.actions {
  display: none;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.link-wrapper:hover .actions {
  display: flex;
}

.link {
  width: 100%;
  display: flex;
  // gap: 0.2rem;
  flex-flow: column;
  padding: 0rem;

  &__header,
  &__footer,
  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__header {
    // align-items: flex-start;
  }

  &__footer {
    margin-top: 0.1rem;
    justify-content: flex-start;
    gap: 0.25rem;
    // display: none;
  }

  &__link {
    display: flex;
    line-height: 1.4rem;
    flex-flow: column;
    text-decoration: none;
    color: black;
    flex: 1;
    gap: 0.1rem;
    max-width: 80%;
  }

  &__title {
    font-size: 1.25rem;
    text-transform: capitalize;
  }

  &__url {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-style: oblique;
    color: #999;
  }

  &__tags {
    padding: 0.05rem 0.5rem;
    // background-color: #c0a6cd;
    background-color: #ddd;
    border-radius: 1rem;
    width: fit-content;
    font-size: 0.85rem;
    opacity: 0.5;
    transition: opacity 0.3s;

    &::before {
      content: '#';
      // padding-right: 0.1rem;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__date {
    font-size: 0.85rem;
    color: #999;
    // padding-top: 0.3rem;
    width: fit-content;
  }
}
</style>
