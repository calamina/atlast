<script setup lang="ts">
import { useDateFormat } from '@vueuse/shared'
import { computed } from 'vue'

import { useLinkStore } from '@/stores/link'
import type { linkModel } from '@/models/link.model'

import categs from '@/utils/link-categs'

import IconDelete from '@/components/icons/IconDelete.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

const props = defineProps<{
  link: linkModel
}>()
const emits = defineEmits(['enableEdit'])

const linkstore = useLinkStore()

const categ = computed(() => {
  return categs.find((categ: any) => categ.name === props.link.category)
})

function deleteLink(id: number | undefined) {
  if (id) {
    linkstore.deleteUserLink(id)
  }
}
</script>

<template>
  <div class="link-wrapper">
    <!-- <div class="categ">
      <div type="button" class="button-icon">
        <component :is="categ!.component"></component>
      </div>
    </div> -->
    <div class="link">
      <div class="link__header">
        <!-- <div class="link__image" :style="`background-image: url(${link.favicon})`"></div> -->
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
    <p class="link__date">
      {{ useDateFormat(props.link.date, 'DD/MM/YY').value }}
    </p>
    <div class="actions">
      <button type="button" class="button-icon">
        <IconLike />
      </button>
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
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 0.5rem;
  border-radius: 2rem;
}

.categ {
  padding: 0.25rem;
  // background-color: #ddd;
}

.actions button {
  border-radius: 2rem;
}

.link {
  display: flex;
  flex-flow: column;
  padding: 0rem;
  align-self: flex-start;
  // flex: 1;

  &__header,
  &__footer,
  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // &__header {
  //   gap: 1.5rem;
  // }
  //
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
    text-transform: capitalize;
  }

  &__url,
  &__date {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    opacity: 0.7;
  }

  // &__image {
  //   background-position: 50%;
  //   background-repeat: no-repeat;
  //   background-size: contain;
  //   background-color: #ddd;
  //   border-radius: 0.5rem;
  //   border-radius: 100%;
  //   height: 1rem;
  //   width: 1rem;
  //   filter: grayscale(0.8);
  // }

  &__tags {
    padding: 0.05rem 0.5rem;
    background-color: #ddd;
    border-radius: 1rem;
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
