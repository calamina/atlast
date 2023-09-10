<script setup lang="ts">
import { computed, onMounted, watch, type ComputedRef } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import MediaComponent from '@/components/media/MediaComponent.vue'

const mediastore = useMediaStore()
const user = useUserStore()

onMounted(() => {
  if (mediastore.list.length === 0) {
    mediastore.getMediaByUser(user.connectedUser.username).then((result) => {
      mediastore.list = result
      mediastore.filteredList = result
    })
  }
})

watch(
  () => mediastore.list,
  () => {
    mediastore.filteredList = mediastore.list
  },
  { deep: true }
)

const filteredMedia: ComputedRef<any[]> = computed(() => {
  let list: any[] = mediastore.filteredList
  list = list.map((media) => {
    const id = media.id
    media = media.attributes
    media.id = id
    return media
  })
  return list
})
</script>

<template>
  <main>
    <div class="medias" v-if="mediastore.filteredList.length !== 0">
      <TransitionGroup name="list">
        <div v-for="media of filteredMedia" :key="media.id">
          <MediaComponent :media="media" />
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  position: relative;
  scrollbar-width: none;
}

.medias {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 3rem 0;
}

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
