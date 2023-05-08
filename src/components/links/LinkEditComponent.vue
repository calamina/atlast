<script setup lang="ts">
import type { linkModel } from '@/models/link.model'
import { ref, type Ref } from 'vue'

import IconEdit from '@/components/icons/iconEdit.vue'
import IconDelete from '@/components/icons/iconDelete.vue'
import IconBook from '@/components/icons/iconBook.vue'
import IconWiki from '@/components/icons/iconWiki.vue'
import IconQuestion from '@/components/icons/iconQuestion.vue'
import IconTech from '@/components/icons/iconTech.vue'
import IconDesign from '@/components/icons/iconDesign.vue'

//
// vue object props refs get mutated :(
//
const props = defineProps<{
  link: linkModel
}>()
const emits = defineEmits(['confirmEdit', 'cancelEdit'])

let linkEdit: any = ref({
  id: props.link.id,
  title: props.link.title,
  url: props.link.url,
  description: props.link.description,
  tagstring: props.link.tags?.join(' '),
  category: props.link.category ?? 'etc'
})
</script>
<template>
  <div class="link-wrapper">
    <div class="categ">
      <button
        type="button"
        class="button-icon"
        @click="linkEdit.category = 'etc'"
        :class="{ active: linkEdit.category === 'etc' }"
      >
        <IconQuestion />
      </button>
      <button
        type="button"
        class="button-icon"
        @click="linkEdit.category = 'media'"
        :class="{ active: linkEdit.category === 'media' }"
      >
        <IconBook />
      </button>
      <button
        type="button"
        class="button-icon"
        @click="linkEdit.category = 'wiki'"
        :class="{ active: linkEdit.category === 'wiki' }"
      >
        <IconWiki />
      </button>
      <button
        type="button"
        class="button-icon"
        @click="linkEdit.category = 'tech'"
        :class="{ active: linkEdit.category === 'tech' }"
      >
        <IconTech />
      </button>
      <button
        type="button"
        class="button-icon"
        @click="linkEdit.category = 'design'"
        :class="{ active: linkEdit.category === 'design' }"
      >
        <IconDesign />
      </button>
    </div>
    <div class="link link-edit">
      <div class="link__header">
        <div class="link__link">
          <p>title<span>*</span></p>
          <input type="text" v-model="linkEdit.title" />
          <p>url<span>*</span></p>
          <input type="text" v-model="linkEdit.url" />
        </div>
      </div>
      <div class="link__description">
        <p>description</p>
        <!-- <textarea ref="textarea" v-model="linkEdit.description" name="description" /> -->
        <input type="text" v-model="linkEdit.description" name="description" />
      </div>
      <div class="link__footer">
        <p>tags (separate with space)</p>
        <input type="text" v-model="linkEdit.tagstring" />
      </div>
    </div>
    <div class="actions">
      <button type="button" class="button-icon" @click="$emit('confirmEdit', linkEdit)">
        <IconEdit />
      </button>
      <button type="button" class="button-icon" @click="$emit('cancelEdit', props.link)">
        <IconDelete />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
.link {
  background-color: #fff;
  flex: 1;
}

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

p {
  font-size: 0.9rem;
  padding-left: 0.1rem;
  // text-transform: capitalize;
  font-variant: small-caps;
  color: #00000088;

  span {
    padding-left: 0.25rem;
    color: #c0a6cd;
    // font-size: 1rem;
  }
}

.categ {
  padding: 0.25rem;

  & button {
    border-radius: 100%;
  }
}

.categ .actions button {
  border-radius: 2rem;
}

.active {
  background-color: #c0a6cd;
}

.link__description,
.link__footer {
  flex-flow: column;
  align-items: flex-start;
  padding-bottom: 0;
  gap: 0;
}

.link__header {
  padding-bottom: 0;
}
</style>
