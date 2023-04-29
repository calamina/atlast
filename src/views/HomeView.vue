<script setup lang="ts">
import { useLinkService } from '@/services/link.service'
import { onMounted, ref, type Ref } from 'vue'
import { useDateFormat } from '@vueuse/core'

const { getLinks } = useLinkService()
const links: Ref<any> = ref(null)

onMounted(() => {
  getLinks().then((result) => {
    links.value = result.data
    console.log(result.data)
  })
})
</script>

<template>
  <main class="link-wrapper">
    <div class="link" v-for="link of links" :key="link">
      <div class="link__header">
        <a class="link__url" :href="link.attributes.url"
          >{{ link.attributes.title }} @ <span>{{ link.attributes.url }}</span></a
        >
        <p class="link__categ">{{ link.attributes.category }}</p>
      </div>
      <p class="link__description">{{ link.attributes.description }}</p>
      <div class="link__footer">
        <p class="link__tags">test</p>
        <p class="link__date">
          {{ useDateFormat(link.attributes.createdAt, 'DD/MM/YYYY HH:mm').value }}
        </p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.link-wrapper {
  display: grid;
  gap: 1.5rem;
}
.link {
  display: flex;
  flex-flow: column;
  // gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px 0px, rgba(0, 0, 0, 0.05) 0px 0px 1px 0px;
  border-radius: 0.5rem;
  border: 1px solid #ddd;

  &__header,
  &__footer,
  &__description {
    padding: 1.5rem 2rem;
  }

  &__header,
  &__footer {
    display: flex;
    gap: 4rem;
    align-items: center;
    justify-content: space-between;
  }

  &__header {
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  &__footer {
    padding-top: 1rem;
    border-top: 1px solid #ddd;
  }

  &__url {
    color: black;
    text-decoration: none;

    span {
      color: #c0a6cd;
    }
  }

  &__tags {
    padding: 0.3rem 0.75rem;
    background-color: #c0a6cd;
    border-radius: 1rem;
    width: fit-content;
  }

  &__date {
    font-size: 0.8rem;
  }
}
</style>
