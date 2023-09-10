<script setup lang="ts">
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'

import { useUserStore } from '@/stores/user'
import { useLinkStore } from '@/stores/link'

import type { linkModel } from '@/models/link.model'

import LinkComponent from '@/components/links/LinkComponent.vue'
import LinkEditComponent from '@/components/links/LinkEditComponent.vue'
import categs from '@/utils/link-categs'
import IconAscending from '@/components/icons/IconAscending.vue'
import IconClose from '@/components/icons/IconClose.vue'

const linkstore = useLinkStore()

const show: Ref<number | null> = ref(null)
const user = useUserStore()

const displayFilters = ref(true)
const filterSearch = ref('')

const filters: Ref<any> = ref({ category: '', sort: 'createdAt' })

const toggleNewModal = ref(false)

onMounted(() => {
  if (linkstore.list.length === 0) {
    linkstore.getLinksByUser(user.connectedUser.username).then((result) => {
      linkstore.list = result
      linkstore.filteredList = result
    })
  }
})

watch(
  () => [filters.value, linkstore.list],
  () => {
    linkstore.getFilteredLinksByUser(user.connectedUser.username, filters.value).then((result) => {
      linkstore.filteredList = result
    })
  },
  { deep: true }
)

function editLink(index: number, link?: any) {
  if (link) {
    let url = link.url.replace(/^https?:\/\//i, '')
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

function checkCategPresent(categ: string) {
  return linkstore.list.find((link: any) => {
    return link.attributes.category === categ
  })
}

const filteredCategs: ComputedRef<any[]> = computed(() => {
  return categs.filter((categ: any) => checkCategPresent(categ.name))
})

function countCategLinks(categ: string): number {
  let count = 0
  linkstore.list.forEach((link: any) => {
    if (link.attributes.category === categ) count++
  })
  return count
}

function filterCategs(type: string) {
  return (filters.value.category = filters.value.category === type ? '' : type)
}

const filteredLinks: ComputedRef<linkModel[]> = computed(() => {
  let list: any[] = linkstore.filteredList
  list = list.map((link) => {
    const id = link.id
    link = link.attributes
    link.id = id
    return link
  })
  return list
})

const ctrl = useKeyModifier('Control')
onKeyStroke('f', (e) => {
  e.preventDefault()
  if (ctrl.value) {
    displayFilters.value = !displayFilters.value
  }
})
</script>

<template>
  <main>
    <transition name="filter" mode="out-in">
      <div class="filters" @click="show = null" v-if="displayFilters">
        <div class="filters__search">
          <input v-model="filterSearch" type="text" name="" id="" />
          <button type="button" class="filter__cancel button-icon" @click="filterSearch = ''">
            <IconCancel />
          </button>
        </div>
        <div class="filters__categories">
          <h3>Categories</h3>
          <div
            @click="filters.category = filterCategs('')"
            :class="{ filtersactive: filters.category === '' }"
            class="filters__category"
          >
            <button type="button" class="button-icon">
              <IconClose />
            </button>
            <p>All</p>
            <p>{{ linkstore.list.length }}</p>
          </div>
          <div
            v-for="(categ, index) in filteredCategs"
            @click="filters.category = filterCategs(categ.name)"
            :key="index"
            class="filters__category"
            :class="{ filtersactive: filters.category === categ.name }"
          >
            <button type="button" class="button-icon">
              <component :is="categ.component as any" />
            </button>
            <p>{{ categ.name as any }}</p>
            <p>{{ countCategLinks(categ.name as any) }}</p>
          </div>
        </div>
        <div class="filters__sort">
          <h3>Sort</h3>
          <div
            @click="filters.sort = 'createdAt'"
            class="filters__category"
            :class="{ filtersactive: filters.sort === 'createdAt' }"
          >
            <button type="button" class="button-icon">
              <IconAscending />
            </button>
            <p>Date</p>
            <p></p>
          </div>
          <div
            @click="filters.sort = 'title'"
            class="filters__category"
            :class="{ filtersactive: filters.sort === 'title' }"
          >
            <button type="button" class="button-icon">
              <IconAscending />
            </button>
            <p>Title</p>
            <p></p>
          </div>
          <div
            @click="filters.sort = 'category'"
            class="filters__category"
            :class="{ filtersactive: filters.sort === 'category' }"
          >
            <button type="button" class="button-icon">
              <IconAscending />
            </button>
            <p>Category</p>
            <p></p>
          </div>
        </div>
      </div>
    </transition>
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
            @confirmEdit="(link: linkModel) => editLink(index, link)"
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
  // justify-content: center;
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
  padding: 3rem 1rem;
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

// TRANSITIONS
.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

.list-leave-active {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
</style>
