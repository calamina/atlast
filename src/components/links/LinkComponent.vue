<script setup lang="ts">
import { useDateFormat } from '@vueuse/shared'

import { useLinkService } from '@/services/link.service'

import type { linkModel } from '@/models/link.model'

import IconQuestion from '@/components/icons/iconQuestion.vue'
import IconDelete from '@/components/icons/iconDelete.vue'
import IconLink from '@/components/icons/iconLink.vue'
import IconLike from '@/components/icons/iconLike.vue'
import IconEdit from '@/components/icons/iconEdit.vue'
import IconBook from '@/components/icons/iconBook.vue'
import IconWiki from '@/components/icons/iconWiki.vue'
import IconTech from '@/components/icons/iconTech.vue'
import IconDesign from '@/components/icons/iconDesign.vue'

const props = defineProps<{
  link: linkModel
}>()
const emits = defineEmits(['enableEdit'])

const { deleteUserLink } = useLinkService()

function deleteLink(id: number | undefined) {
  if (id) {
    deleteUserLink(id)
  }
}
</script>

<template>
  <div class="link-wrapper">
    <div class="categ">
      <button type="button" class="button-icon">
        <IconQuestion v-if="props.link.category === 'etc'" />
        <IconDesign v-if="props.link.category === 'design'" />
        <IconBook v-if="props.link.category === 'media'" />
        <IconWiki v-if="props.link.category === 'wiki'" />
        <IconTech v-if="props.link.category === 'tech'" />
      </button>
    </div>
    <div class="link">
      <div class="link__header">
        <a class="link__link" :href="'http://' + props.link.url" target="_blank">
          <p class="link__title">{{ props.link.title }}</p>
          <p class="link__url"><IconLink class="text-icon" /> {{ props.link.url }}</p>
        </a>
        <p class="link__date">
          {{ useDateFormat(props.link.date, 'DD/MM/YY').value }}
        </p>
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
  background-color: #eee;
  display: flex;
  flex-flow: column;
  height: fit-content;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.25rem;
  border-radius: 2rem;
}

.categ {
  padding: 0.25rem;
  background-color: #c0a6cd;
}

.actions button {
  border-radius: 2rem;
}

.actions {
  display: none;
}

.link-wrapper:hover .actions {
  display: flex;
}

.link {
  // width: 50vw;
  width: 100%;
  display: flex;
  flex-flow: column;
  border-radius: 2rem;
  border: 1.5px solid #ddd;
  padding: 0.5rem 1rem 1rem;

  &__header,
  &__footer,
  &__description {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  &__header {
    align-items: flex-start;
  }

  &__description {
    padding: 0 0.5rem;
  }

  &__footer {
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 0.5rem 0.25rem;
  }

  &__link {
    display: flex;
    flex-flow: column;
    text-decoration: none;
    color: black;
    flex: 1;
  }

  &__title {
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  &__url {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-style: oblique;
    color: #999;
  }

  &__description {
    padding-bottom: 1rem;
  }

  & textarea {
    resize: none;
    overflow: hidden;
  }

  &__tags {
    padding: 0.3rem 0.75rem;
    background-color: #c0a6cd;
    background-color: #ddd;
    border-radius: 1rem;
    width: fit-content;
    font-size: 0.85rem;
  }

  &__date {
    font-size: 0.85rem;
    color: #999;
    padding-top: 0.3rem;
    width: fit-content;
  }
}
</style>
