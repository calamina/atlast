<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core'

import { useMediaStore } from '@/stores/media';
import { useFileUtils } from '@/utils/file-utils';
import IconDatabaseExport from './icons/IconDatabaseExport.vue';
import IconDatabaseImport from './icons/IconDatabaseImport.vue';
import IconDatabaseDelete from './icons/IconDatabaseDelete.vue';
import OptionButton from './atomic/OptionButton.vue';
import IconCube from './icons/IconCube.vue';

const { importMediaDB, exportMediaDB, deleteMediaDB } = useMediaStore()
const { checkJsonFile } = useFileUtils()

const menu = ref(null)
const fileInput = useTemplateRef('fileInput')
const isSubmenuVisible = ref(false)

onClickOutside(menu, _event => isSubmenuVisible.value = false)

function toggleDataMenu() {
  isSubmenuVisible.value = !isSubmenuVisible.value
}

async function exportDB(): Promise<void> {
  await exportMediaDB().finally(() => toggleDataMenu())
}

async function importDB(): Promise<void> {
  const file = fileInput.value?.files?.[0];
  await checkJsonFile(file)
    .then((resolvedFile) => importMediaDB(resolvedFile))
    .then(() => toggleDataMenu())
}

async function deleteDB(): Promise<void> {
  await deleteMediaDB().finally(() => toggleDataMenu())
}
</script>
<template>
  <div class="data" ref="menu">
    <div class="menu-icon">
      <OptionButton @click="toggleDataMenu()" info="Data menu" background="dark">
        <IconCube />
      </OptionButton>
    </div>
    <div class="submenu" v-if="isSubmenuVisible">
      <OptionButton @click="exportDB()" info="Export database">
        <IconDatabaseExport />
      </OptionButton>
      <label for="file-upload" class="button-icon file-button" v-tooltip="'Import database'"
        aria-label="Import database" tabindex="0">
        <IconDatabaseImport />
      </label>
      <input type="file" ref="fileInput" id="file-upload" accept=".json" @change="importDB()" />
      <OptionButton @click="deleteDB()" info="Delete database">
        <IconDatabaseDelete />
      </OptionButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data {
  border-left: 1px solid var(--border);
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0 0.5rem 1.25rem;
  grid-column: span 2;
  width: fit-content;
}

.submenu {
  position: fixed;
  top: var(--fixed);
  flex-flow: column;
  gap: 0.5rem;
  height: fit-content;
  border-radius: 2rem;
  background-color: var(--background-darker);
}

label {
  border-radius: 100%;
  cursor: pointer;
}
</style>