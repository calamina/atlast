<script setup lang="ts">
import { computed, onMounted, ref, type Component, type ComputedRef, type Ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useMediaStore } from '@/stores/media'

import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearchBar from '@/components/media/MediaSearchBar.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import { mediaCategs } from '@/data/media-categs'
import { mediaStatus } from '@/data/media-status'
import type { StatusNameModel } from '@/models/status.model'
import type { CategNameModel } from '@/models/categ.model'

const { mediaSearch, allMedia } = storeToRefs(useMediaStore())
const { getMedia } = useMediaStore()

onMounted(() => getMedia().then(() => {
  initStatus()
  initCategs()
}))

interface dataModel {
  name: StatusNameModel | CategNameModel
  component: Component
  total: number
}

const statusData: Ref<dataModel[]> = ref([])
const categData: Ref<dataModel[]> = ref([])

const statusMax: ComputedRef<number> = computed(() =>
  Math.max(...statusData.value.map((s) => s.total))
)
const categMax: ComputedRef<number> = computed(() =>
  Math.max(...categData.value.map((s) => s.total))
)

const getSize = (total: number, max: number) => {
  return total / max * 100 + "%"
}

const initStatus = () => {
  mediaStatus.forEach((status) => {
    statusData.value.push({
      name: status.name,
      component: status.component,
      total: allMedia.value.filter((m) => m.status === status.name).length
    })
  })
}

const initCategs = () => {
  mediaCategs.forEach((categ) => {
    categData.value.push({
      name: categ.name,
      component: categ.component,
      total: allMedia.value.filter((m) => m.categ === categ.name).length
    })
  })
}
</script>

<template>
  <main>
    <MediaSearchBar v-model="mediaSearch" placeholder="Search medias" :component="MediaSearch" />
    <MediaFilters />
    <p></p>
    <div class="charts">

      <div class="KEK">
        <div class="chart-wrapper">
          <div v-for="status of statusData" :key="status.name ?? ''" class="chart">
            <div class="chart-bar-wrapper">
              <div class="chart-bar"
                :style="{ backgroundColor: mediaStatus.find((m) => m.name === status.name)?.color, height: getSize(status.total, statusMax) }">
                <span class="chart-bar-count"
                  :style="{ backgroundColor: status.total === 0 ? 'var(--background-transparent-plus)' : 'transparent' }">{{
                    status.total }}</span>
              </div>
            </div>
            <component class="icon" :is="mediaStatus.find((m) => m.name === status.name)?.component" />
            <p class="label">{{ status.name }}</p>
          </div>
        </div>
        <h3>Status</h3>
      </div>

      <div class="KEK">
        <div class="chart-wrapper">
          <div v-for="status of statusData" :key="status.name ?? ''" class="chart">
            <div class="chart-bar-wrapper">
              <div class="chart-bar-background"></div>
              <div class="chart-bar"
                :style="{ backgroundColor: mediaStatus.find((m) => m.name === status.name)?.color, height: getSize(status.total, statusMax) }">
                <span class="chart-bar-count">{{ status.total }}</span>
              </div>
            </div>
            <component class="icon" :is="mediaStatus.find((m) => m.name === status.name)?.component" />
            <p class="label">{{ status.name }}</p>
          </div>
        </div>
        <h3>Status</h3>
      </div>

      <div class="KEK">
        <div class="chart-wrapper">
          <div v-for="categ of categData" :key="categ.name ?? ''" class="chart">
            <div class="chart-bar-wrapper">
              <span>{{ categ.total }}</span>
              <div class="chart-bar"
                :style="{ backgroundColor: '#efefef', height: categ.total / categMax * 100 + '%' }">
              </div>
            </div>
            <component class="icon" :is="mediaCategs.find((m) => m.name === categ.name)?.component" />
            <p class="label">{{ categ.name }}</p>
          </div>
        </div>
        <h3>Categories</h3>
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  scrollbar-width: none;
  justify-content: center;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 5;
  transition: 0.3s;
  min-height: 90vh;
  padding-bottom: 2rem;
}

.charts {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  min-width: 100%;
  gap: 1rem;
  min-width: max(40vw, 45rem);
}

.KEK {
  width: 100%;
}

.chart-wrapper {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 2.5rem 0 1rem 0;
  // padding: 3rem 0 1rem 0;
  background-color: var(--white);
  border-radius: 2rem;
  gap: 2rem;
  // height: 12rem;
}

.chart-wrapper-tight {
  padding: 1rem;
  gap: 0;
}

.chart {
  width: fit-content;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.chart-row {
  flex-flow: row;
}

.chart-bar-wrapper {
  position: relative;
  height: 6rem;
  // height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
}

.chart-bar {
  position: relative;
  z-index: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 2rem;
  width: 1.5rem;

}

.chart-bar-background {
  position: absolute;
  z-index: 0;
  bottom: 0;
  width: 1.5rem;
  height: 100%;
  background-color: var(--background-transparent-plus);
  border-radius: 2rem;
}

.chart-bar-count {
  position: absolute;
  z-index: 2;
  top: -1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  padding-bottom: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5rem;
  border-radius: 2rem;
  // background-color: var(--background-transparent-plus);
}

h3 {
  padding-left: 1rem;
  padding-top: 0.25rem;
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  font-family: "contax_pro_66_med_italicIt", "Arial", sans-serif;
  color: var(--active-plus);
}

.icon {
  display: flex;
  flex-shrink: 0;
  margin-top: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
}

@media (max-width: 1250px) {
  .charts {
    min-width: 0;
  }
}
</style>
