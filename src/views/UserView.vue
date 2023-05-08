<script setup lang="ts">
import { useLinkService } from '@/services/link.service'
import { computed, ref, watchEffect, type ComputedRef, type Ref } from 'vue'

import IconCancel from '@/components/icons/iconCancel.vue'

import { useUserStore } from '@/stores/user'
import { useLinkStore } from '@/stores/link'

import type { linkModel } from '@/models/link.model'

import LinkComponent from '@/components/links/LinkComponent.vue'
import LinkEditComponent from '@/components/links/LinkEditComponent.vue'
import categs from '@/utils/link-categs'
import IconClose from '@/components/icons/iconClose.vue'

const { getLinksByUser, addUserLink, editUserLink } = useLinkService()
const linkstore = useLinkStore()

const show: Ref<number | null> = ref(null)
const user = useUserStore()

const filterCateg = ref('')
const filterSearch = ref('')

const toggleNewModal = ref(false)

watchEffect(() => {
  getLinksByUser(user.connectedUser.username).then((result) => {
    linkstore.list = result
  })
})

function editLink(index: number, link?: any) {
  if (link) {
    link.tags = link.tagstring ? link.tagstring.split(' ') : null
    editUserLink(link).then((response) => {
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

function addLink(link: any) {
  link.tags = link.tagstring ? link.tagstring.split(' ') : null
  link.user = user.connectedUser.username
  addUserLink(link).then((response) => {
    if (!response.data.error) {
      toggleNewModal.value = false
    }
  })
}

function checkCategPresent(categ: string) {
  return linkstore.list.find((link: any) => {
    return link.attributes.category === categ
  })
}

const filteredCategs: ComputedRef<any> = computed(() => {
  return categs.filter((categ) => checkCategPresent(categ.name))
})

function countCategLinks(categ: string): number {
  let count = 0
  linkstore.list.forEach((link: any) => {
    if (link.attributes.category === categ) count++
  })
  return count
}

function filterCategs(type: string) {
  return (filterCateg.value = filterCateg.value === type ? '' : type)
}

const filteredLinks: ComputedRef<linkModel[]> = computed(() => {
  let list: any[] = linkstore.list
  if (filterCateg.value !== '') {
    list = list.filter((link: any) => link.attributes.category === filterCateg.value)
  }
  if (filterSearch.value !== '') {
    list = list.filter(
      (link: any) =>
        link.attributes.title.includes(filterSearch.value) ||
        (link.attributes.description && link.attributes.description.includes(filterSearch.value)) ||
        (link.attributes.url && link.attributes.url.includes(filterSearch.value))
    )
  }
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
    <div class="filters" @click="show = null">
      <button type="button" class="button--main" @click="toggleNewModal = true">New link</button>
      <div class="filters__search">
        <input v-model="filterSearch" type="text" name="" id="" />
        <button type="button" class="button-icon" @click="filterSearch = ''"><IconCancel /></button>
      </div>
      <div class="filters__categories">
        <div @click="filterCategs('')" class="filters__category">
          <button type="button" :class="{ filtersactive: filterCateg === '' }" class="button-icon">
            <IconClose />
          </button>
          <p>All</p>
          <p>{{ linkstore.list.length }}</p>
        </div>
        <div
          v-for="(categ, index) in filteredCategs"
          @click="filterCategs(categ.name)"
          :key="index"
          class="filters__category"
        >
          <button
            type="button"
            :class="{ filtersactive: filterCateg === categ.name }"
            class="button-icon"
          >
            <component :is="categ.component" />
          </button>
          <p>{{ categ.name }}</p>
          <p>{{ countCategLinks(categ.name) }}</p>
        </div>
      </div>
    </div>
    <div class="links" v-if="linkstore.list.length !== 0">
      <TransitionGroup name="list">
        <div v-for="(link, index) of filteredLinks" :key="link.id">
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
      <div v-if="linkstore.list.length === 0">
        <p>Empty list ... You could add a link :)</p>
      </div>
    </div>
    <Teleport to="body">
      <div class="modal-wrapper" v-if="toggleNewModal">
        <LinkEditComponent
          :link="{}"
          @confirmEdit="(link: linkModel) => addLink(link)"
          @cancelEdit="toggleNewModal = false"
        />
      </div>
    </Teleport>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 90vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5rem;
}

.filters {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 2rem;

  & .filters__categories {
    display: flex;
    flex-flow: column;
    width: 100%;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0.15rem 0;
    border-radius: 6px;

    & .filtersactive {
      background-color: #c0a6cd;
      border-radius: 100%;
    }
  }

  & .filters__category {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    cursor: pointer;

    & p {
      text-transform: capitalize;
    }

    & p:last-of-type {
      font-size: 0.9rem;
      margin-left: auto;
      color: #c0a6cd;
    }
  }

  & .filters__search {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  & input {
    margin-bottom: 0;
  }
}

.links {
  display: flex;
  flex-flow: column;
  gap: 2rem;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
}

.link-wrapper {
  width: 50vw;
  display: flex;
  gap: 1rem;
  transition: height 0.3s;
  background-color: #fff;
}

.filters__info {
  display: flex;
  align-items: center;
  gap: 5rem;
}

.modal-wrapper {
  position: absolute;
  width: 100%;
  height: 100vh;
  padding-bottom: 10rem;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s ease;
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
