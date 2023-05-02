<script setup lang="ts">
import { useLinkService } from '@/services/link.service'
import { computed, ref, watchEffect, type Ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import IconBook from '@/components/icons/iconBook.vue'
import IconWiki from '@/components/icons/iconWiki.vue'
import IconQuestion from '@/components/icons/iconQuestion.vue'
import IconTech from '@/components/icons/iconTech.vue'
import IconLike from '@/components/icons/iconLike.vue'
import IconEdit from '@/components/icons/iconEdit.vue'
import IconDelete from '@/components/icons/iconDelete.vue'
import IconLink from '@/components/icons/iconLink.vue'
import IconCheck from '@/components/icons/iconCheck.vue'
import IconCancel from '@/components/icons/iconCancel.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { useUserStore } from '@/stores/user'
import { useLinkStore } from '@/stores/link'

const { getLinksByUser, deleteUserLink, addUserLink } = useLinkService()
const linkstore = useLinkStore()

const show: Ref<number | null> = ref(null)
const user = useUserStore()

const newlink: Ref<any> = ref({})

const filterCateg = ref('')
const filterSearch = ref('')

const toggleNewModal = ref(false)

watchEffect(() => {
  getLinksByUser(user.connectedUser.username).then((result) => {
    linkstore.list = result
  })
})

function editLink(id: number, send?: boolean) {
  if (show.value === id) {
    show.value = null
  } else {
    show.value = id
  }
}

function deleteLink(id: number) {
  deleteUserLink(id)
  linkstore.list.splice(linkstore.list.findIndex(matchesEl), 1)
}

function matchesEl(el: any, id: number) {
  return el.attributes.id === id
}

function addLink() {
  newlink.value.tags = newlink.value.tags ? newlink.value.tags.split(' ') : null
  newlink.value.user = user.connectedUser.username
  addUserLink(newlink.value)
  newlink.value = {}
  toggleNewModal.value = false
}

function filterCategs(type: string) {
  filterCateg.value = type
}

const getLinks = computed(() => {
  let filteredLinks = linkstore.list
  if (filterCateg.value !== '') {
    filteredLinks = filteredLinks.filter(
      (link: any) => link.attributes.category === filterCateg.value
    )
  }
  if (filterSearch.value !== '') {
    filteredLinks = filteredLinks.filter(
      (link: any) =>
        link.attributes.title.includes(filterSearch.value) ||
        (link.attributes.description && link.attributes.description.includes(filterSearch.value)) ||
        (link.attributes.url && link.attributes.url.includes(filterSearch.value))
    )
  }
  return filteredLinks
})
</script>

<template>
  <main>
    <div class="filters">
      <button type="button" class="button--main" @click="toggleNewModal = true">Add link +</button>
      <div class="filterSearch">
        <input v-model="filterSearch" type="text" name="" id="" />
      </div>
      <div class="filters__categ">
        <button type="button" class="button-icon" @click="filterCategs('')"><IconClose /></button>
        <button type="button" class="button-icon" @click="filterCategs('etc')">
          <IconQuestion />
        </button>
        <button type="button" class="button-icon" @click="filterCategs('tech')">
          <IconTech />
        </button>
        <button type="button" class="button-icon" @click="filterCategs('wiki')">
          <IconWiki />
        </button>
        <button type="button" class="button-icon" @click="filterCategs('media')">
          <IconBook />
        </button>
      </div>
      <!-- <div class="filterLike">
        <button type="button" class="button-icon"><IconLike /></button>
      </div> -->
    </div>
    <div class="links">
      <div class="link-wrapper" v-for="(link, index) of getLinks" :key="index">
        <div class="categ">
          <button type="button" class="button-icon">
            <IconQuestion v-if="link.attributes?.category === 'etc'" />
            <IconBook v-if="link.attributes?.category === 'media'" />
            <IconWiki v-if="link.attributes?.category === 'wiki'" />
            <IconTech v-if="link.attributes?.category === 'tech'" />
          </button>
        </div>
        <div v-if="show !== index" class="link">
          <div class="link__header">
            <a class="link__link" :href="link.attributes?.url">
              <p class="link__title">{{ link.attributes?.title }}</p>
              <p class="link__url"><IconLink class="text-icon" /> {{ link.attributes?.url }}</p>
            </a>
            <p class="link__date">
              {{ useDateFormat(link.attributes?.date, 'DD/MM/YY').value }}
            </p>
          </div>
          <p v-if="link.attributes?.description" class="link__description">
            {{ link.attributes?.description }}
          </p>
          <div v-if="link.attributes?.tags" class="link__footer">
            <button class="link__tags" v-for="tag in link.attributes?.tags" :key="tag">
              {{ tag }}
            </button>
          </div>
        </div>
        <div v-else class="link link-edit">
          <div class="link__header">
            <div class="link__link">
              <input type="text" v-model="link.attributes.title" />
              <input type="text" v-model="link.attributes.url" />
            </div>
            <input type="date" v-model="link.attributes.date" />
          </div>
          <div class="link__description">
            <textarea ref="textarea" v-model="link.attributes.description" name="description" />
          </div>
          <div class="link__footer">
            <input type="text" v-model="link.attributes.tags" />
          </div>
        </div>
        <div v-if="show !== index" class="actions">
          <button type="button" class="button-icon"><IconLike /></button>
          <button type="button" class="button-icon" @click="editLink(index)">
            <IconEdit />
          </button>
          <button type="button" class="button-icon" @click="deleteLink(link.id)">
            <IconDelete />
          </button>
        </div>
        <div v-else class="actions">
          <button type="button" class="button-icon" @click="editLink(index, true)">
            <IconEdit />
          </button>
          <button type="button" class="button-icon" @click="editLink(index)">
            <IconDelete />
          </button>
        </div>
      </div>
      <Teleport to="body">
        <div class="modal-wrapper" v-if="toggleNewModal">
          <div class="link-wrapper link-new">
            <div class="categ">
              <button type="button" class="button-icon"><IconBook /></button>
              <button type="button" class="button-icon"><IconBook /></button>
              <button type="button" class="button-icon"><IconBook /></button>
              <button type="button" class="button-icon"><IconBook /></button>
              <button type="button" class="button-icon"><IconBook /></button>
            </div>
            <div class="link">
              <div class="link__header">
                <div class="link__link">
                  <input type="text" v-model="newlink.title" placeholder="title" />
                  <input type="text" v-model="newlink.url" placeholder="url" />
                </div>
                <input type="date" v-model="newlink.date" />
              </div>
              <div class="link__description">
                <textarea
                  ref="textarea"
                  v-model="newlink.description"
                  name="description"
                  placeholder="description"
                  class="resize-none"
                />
              </div>
              <div class="link__footer">
                <input type="text" v-model="newlink.tags" placeholder="tags" />
              </div>
              <select v-model="newlink.category">
                <option value="">etc</option>
                <option>tech</option>
                <option>wiki</option>
                <option>media</option>
              </select>
              <!-- <button type="submit" @submit.prevent @click="addLink()">create</button> -->
            </div>
            <div class="actions">
              <button type="button" class="button-icon" @click="addLink()">
                <IconCheck />
              </button>
              <button type="button" class="button-icon" @click="toggleNewModal = false">
                <IconCancel />
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
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

  & .filters__categ {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border: 1.5px solid #ddd;
    padding: 0.15rem 0;
    border-radius: 6px;
  }

  & input {
    margin-bottom: 0;
  }
}

.links {
  display: flex;
  flex-flow: column;
  gap: 2rem;
}

.link-wrapper {
  display: flex;
  gap: 1rem;
  transition: height 0.3s;
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

.categ {
  padding: 0.25rem;
  background-color: #c0a6cd;
}

// .actions {
//   border: 1.5px solid #ddd;
// }

.actions button {
  border-radius: 2rem;
}

.link {
  width: 50vw;
  display: flex;
  flex-flow: column;
  border-radius: 0.5rem;
  border-radius: 2rem;
  border: 1.5px solid #ddd;
  padding: 0.5rem 1rem 1rem;
  gap: 0.5rem;

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
    gap: 0.5rem;
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
// .link-edit {
//   border: 3px solid #c0a6cd;
// }

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
.link-new .link {
  background-color: #fff;
}
</style>
