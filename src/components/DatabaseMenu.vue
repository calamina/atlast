<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

import { useMediaStore } from '@/stores/media';
import { useFileUtils } from '@/utils/file-utils';

import OptionButton from './atomic/OptionButton.vue';
import IconDatabaseExport from './icons/IconDatabaseExport.vue';
import IconDatabaseImport from './icons/IconDatabaseImport.vue';
import IconDatabaseDelete from './icons/IconDatabaseDelete.vue';
import IconCube from './icons/IconCube.vue';

const { importMediaDB, exportMediaDB, deleteMediaDB } = useMediaStore()
const { checkJsonFile } = useFileUtils()

const menu = ref(null)
const fileInput = useTemplateRef('fileInput')
const menuOpen = ref(false)

onClickOutside(menu, () => closeMenu())
onKeyStroke('Escape', () => closeMenu())

const { activate, deactivate } = useFocusTrap(menu)
watch(menuOpen, () => menuOpen.value ? activate() : deactivate())

const closeMenu = () => menuOpen.value = false
const toggleDataMenu = () => menuOpen.value = !menuOpen.value

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
    <transition name="menu">
      <div class="submenu" v-if="menuOpen">
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
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.data {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

@media (max-width: 1250px) {
  .data {
    padding: 0;
  }

  .submenu {
    background-color: var(--white);
    top: 4rem;
  }

  label {
    height: 1.75rem;
    width: 1.75rem;
    padding: 0.25rem;
  }
}
</style>