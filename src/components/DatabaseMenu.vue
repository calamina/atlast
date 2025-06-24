<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core'
import "dexie-export-import";

import { useTooltipStore } from '@/stores/tooltip';
import { useMediaStore } from '@/stores/media';
import { useFileUtils } from '@/utils/file-utils';
import IconUser from './icons/IconUser.vue';
import IconDatabaseExport from './icons/IconDatabaseExport.vue';
import IconDatabaseImport from './icons/IconDatabaseImport.vue';
import IconDatabaseDelete from './icons/IconDatabaseDelete.vue';

const { importMediaDB, exportMediaDB, deleteMediaDB } = useMediaStore()
const { setTooltip, resetTooltip } = useTooltipStore()
const { checkJsonFile } = useFileUtils()

const menu = ref(null)
const fileInput = useTemplateRef('fileInput')
const isSubmenuVisible = ref(false)

onClickOutside(menu, _event => isSubmenuVisible.value = false)

function toggleUserMenu() {
  isSubmenuVisible.value = !isSubmenuVisible.value
}

async function exportDB() {
  await exportMediaDB().finally(() => toggleUserMenu())
}

async function importDB() {
  const file = fileInput.value?.files?.[0];
  checkJsonFile(file).then((resolvedFile) =>
    importMediaDB(resolvedFile).finally(() => toggleUserMenu())
  )
}

async function deleteDB() {
  await deleteMediaDB().finally(() => toggleUserMenu())
}
</script>
<template>
  <div class="user" ref="menu">
    <div class="menu-icon">
      <button class="button-icon" type="button" @click="toggleUserMenu()" aria-label="User menu"
        @mouseover="setTooltip('User menu')" @mouseleave="resetTooltip()">
        <IconUser />
      </button>
    </div>
    <div class="submenu" v-if="isSubmenuVisible">
      <button class="button-icon" type="button" @click="exportDB()" @mouseover="setTooltip('Export database')"
        @mouseleave="resetTooltip()" aria-label="Export database">
        <IconDatabaseExport />
      </button>
      <label for="file-upload" class="button-icon file-button" @mouseover="setTooltip('Import database')"
        @mouseleave="resetTooltip()" aria-label="Import database" tabindex="0">
        <IconDatabaseImport />
      </label>
      <input type="file" ref="fileInput" id="file-upload" accept=".json" @change="importDB()" />
      <button class="button-icon" type="button" @click="deleteDB()" @mouseover="setTooltip('Delete database')"
        @mouseleave="resetTooltip()" aria-label="Delete database">
        <IconDatabaseDelete />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  border-left: 1px solid var(--border);
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0 0.5rem 1.25rem;
  grid-column: span 2;
  width: fit-content;

  button {
    background-color: var(--background-darker);
    border-radius: 100%;
  }
}

.submenu {
  position: fixed;
  top: var(--fixed);
  flex-flow: column;
  gap: 0.5rem;
  height: fit-content;
  border-radius: 2rem;
  background-color: var(--background-darker);

  button,
  label {
    border-radius: 100%;
  }

  label {
    cursor: pointer;
  }
}
</style>