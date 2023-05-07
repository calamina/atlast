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
  background-color: #fff;
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
