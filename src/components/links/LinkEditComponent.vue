<script setup lang="ts">
import type { linkModel } from '@/models/link.model'
import { ref } from 'vue'

import categs from '@/utils/link-categs'

import IconEdit from '@/components/icons/iconEdit.vue'
import IconDelete from '@/components/icons/iconDelete.vue'
import IconLike from '../icons/iconLike.vue'

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
        v-for="(categ, index) in categs"
        :key="index"
        type="button"
        class="button-icon"
        @click="linkEdit.category = categ.name"
        :class="{ active: linkEdit.category === categ.name }"
      >
        <component :is="categ.component"></component>
      </button>
    </div>
    <div class="link link-edit">
      <div>
        <p>title<span>*</span></p>
        <input type="text" v-model="linkEdit.title" />
      </div>
      <div>
        <p>url<span>*</span></p>
        <input type="text" v-model="linkEdit.url" />
      </div>
      <div>
        <p>description</p>
        <input type="text" v-model="linkEdit.description" name="description" />
      </div>
      <div>
        <p>tags (separate with space)</p>
        <input type="text" v-model="linkEdit.tagstring" />
      </div>
    </div>
    <div class="actions">
      <button type="button" class="button-icon"><IconLike /></button>
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
.link-wrapper {
  background-color: #ddd;
  border-radius: 2rem;
}
.link {
  width: 100%;
  display: flex;
  flex-flow: column;
  flex: 2;
  gap: 0.5rem;
  justify-content: space-between;
  // padding: 1rem;
}

.categ,
.actions {
  display: flex;
  flex-flow: column;
  height: fit-content;
  gap: 0.25rem;
  padding: 0.5rem 0.25rem;
}

.actions {
  flex-flow: row;
}

p {
  font-size: 0.9rem;
  padding-left: 0.1rem;
  font-variant: small-caps;
  color: #00000088;

  span {
    padding-left: 0.25rem;
    color: #000;
  }
}

.categ button {
  border-radius: 100%;
}

.categ .actions button {
  border-radius: 2rem;
}

.active {
  background-color: #c0a6cd;
}

input {
  // background-color: #eee;
  border-radius: 0;
  padding: 0rem 0.1rem 0;
  border-bottom: 1px solid #999;
}
</style>
