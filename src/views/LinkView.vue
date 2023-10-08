<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'

import { useUserStore } from '@/stores/user'
import { useLinkStore } from '@/stores/link'

import type { LinkModel } from '@/models/link.model'

import LinkComponent from '@/components/links/LinkComponent.vue'
import LinkEditComponent from '@/components/links/LinkEditComponent.vue'

const linkstore = useLinkStore()

const show: Ref<number | null> = ref(null)
const user = useUserStore()

onMounted(() => {
  if (linkstore.list.length === 0) {
    linkstore.getLinksByUser(user.connectedUser.username).then((result) => {
      linkstore.list = result
      linkstore.filteredList = result
    })
  }
})

function editLink(index: number, link?: LinkModel) {
  if (link) {
    let url = link.url?.replace(/^https?:\/\//i, '')
    link.tags = link.tagstring ? link.tagstring.split(' ') : null
    link.favicon = `https://www.google.com/s2/favicons?domain=${url}&sz=512`
    linkstore.editUserLink(link).then((response) => {
      if (!response.data.error) {
        show.value = null
      }
    })
  } else if (show.value === index) {
    show.value = null
  } else {
    show.value = index
  }
}

const filteredLinks: ComputedRef<LinkModel[]> = computed(() => {
  let list: LinkModel[] = linkstore.filteredList
  list = list.map((link) => {
    const id = link.id
    link = link.attributes
    link.id = id
    return link
  })
  return list
})
</script>

<template>
  <main>
    <div class="links" v-if="linkstore.filteredList.length !== 0">
      <TransitionGroup name="list">
        <div class="link__switch" v-for="(link, index) of filteredLinks" :key="link.id">
          <LinkComponent
            v-if="show !== index"
            :link="link"
            :key="link.id"
            @enableEdit="editLink(index)"
          />
          <LinkEditComponent
            v-else
            :link="link"
            :key="link.title"
            @cancelEdit="editLink(index)"
            @confirmEdit="(link: LinkModel) => editLink(index, link)"
          />
        </div>
      </TransitionGroup>
    </div>
    <div v-else>
      <p>Empty list ... You could add a link :)</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
  height: 4rem;
  line-height: 4rem;
  padding-left: 0.75rem;
}

h3 {
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 0.15rem;
  font-family: 'contaxItalic', 'Arial', sans-serif;
}

main {
  position: relative;
  width: 100vw;
  overflow: auto;
  scrollbar-width: none;
  display: flex;
  flex-flow: row;
  position: relative;
  padding: 2rem 0;
  justify-content: center;
}

.filters {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  padding: 0 1rem;
  width: 20rem;

  & .filters__categories {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }

  & .filtersactive {
    background-color: #c0a6cd;
  }

  & .filters__category {
    display: flex;
    align-items: center;
    border-radius: 0.25rem;
    padding-right: 0.75rem;
    cursor: pointer;

    & p {
      text-transform: capitalize;
    }

    & p:last-of-type {
      font-size: 0.9rem;
      margin-left: auto;
      opacity: 0.5;
    }
  }

  & .filters__search {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  & .filter__cancel {
    position: absolute;
    padding: 0.65rem;
    right: -0.5rem;
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  & input {
    margin-bottom: 0;
    padding-right: 2rem;
  }
}

.links {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 50rem;
  height: fit-content;
  align-items: center;
}

.link__switch {
  flex: 1;
  width: 100%;
}

.filters__info {
  display: flex;
  align-items: center;
  gap: 5rem;
}
</style>
