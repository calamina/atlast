<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { onClickOutside, useThrottleFn } from '@vueuse/core'
import IconUser from './icons/IconUser.vue';

import { db } from '@/stores/db';
import "dexie-export-import";
import { useTooltipStore } from '@/stores/tooltip';
import { useNotificationStore } from '@/stores/notification';
import strings from '@/utils/strings';
import IconDatabaseExport from './icons/IconDatabaseExport.vue';
import IconDatabaseImport from './icons/IconDatabaseImport.vue';
import IconDatabaseDelete from './icons/IconDatabaseDelete.vue';
import { useConfirmStore } from '@/stores/confirm';
import { useMediaStore } from '@/stores/media';
import { storeToRefs } from 'pinia';

const { getMedia } = useMediaStore()
const { allMedia, filteredList } = storeToRefs(useMediaStore())
const { confirmOrCancel } = useConfirmStore()
const { setTooltip, resetTooltip } = useTooltipStore()
const { addErrorNotification, addNotification } = useNotificationStore()

const menu = ref(null)
const fileInput = useTemplateRef('fileInput')
const isSubmenuVisible = ref(false)

onClickOutside(
  menu, _event => isSubmenuVisible.value = false
)

function openUserMenu() {
  isSubmenuVisible.value = !isSubmenuVisible.value
}

// MOVE FUNCTIONS TO DB STORE
async function exportDB() {
  const options = {
    prettyJson: true
  };
  await db.export(options)
    .then((blob) => {
      addNotification('Database exported successfully', strings.HAPPY);
      downloadBlob(blob, 'mediaDB.json')
    })
    .catch(error => {
      addErrorNotification('Failed to export database.' + strings.SAD);
      addNotification(error.message || 'An error occurred during export.');
    })
    .finally(() => {
      openUserMenu()
    })
}

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
}

async function importDB() {
  const file = fileInput.value?.files?.[0];
  if (!file) {
    return addErrorNotification('Please select a file to import' + strings.SAD)
  }
  if (file.type !== 'application/json') {
    return addErrorNotification('Please select a valid JSON file' + strings.SAD)
  }
  if (!db.isOpen()) {
    db.open()
  }

  const blob = new Blob([file], { type: 'application/json' })
  await db.import(blob)
    .then(() => {
      getMedia()
      addNotification('Database imported successfully', strings.HAPPY)
    })
    .catch(error => {
      addErrorNotification('Failed to import database.' + strings.SAD)
      addNotification(error.message || 'An error occurred during import.')
    })
    .finally(() => {
      openUserMenu()
    })
}

const deleteDB = useThrottleFn(() => {
  console.debug('deleteDB')
  confirmOrCancel('Are you sure you want to delete the database? This action cannot be undone.')
    .then((confirm: boolean) => {
      if (confirm) {
        db.delete()
          .then(() => {
            addNotification('Database deleted successfully', strings.HAPPY)
            allMedia.value = []
            filteredList.value = []
          })
          .catch((error: Error | any) => {
            addErrorNotification('Failed to delete database: ' + (error.message || 'An error occurred.'));
          })
          .finally(() => {
            openUserMenu()
          })
      }
    })
}, 500)
</script>
<template>
  <div class="user" ref="menu">
    <div class="menu-icon">
      <button class="button-icon" type="button" @click="openUserMenu()">
        <IconUser />
      </button>
    </div>
    <div class="submenu" v-if="isSubmenuVisible">
      <button class="button-icon" type="button" @click="exportDB()" @mouseover="setTooltip('Export database')"
        @mouseleave="resetTooltip()">
        <IconDatabaseExport />
      </button>
      <label for="file-upload" class="button-icon file-button" @mouseover="setTooltip('Import database')"
        @mouseleave="resetTooltip()">
        <IconDatabaseImport />
      </label>
      <input type="file" ref="fileInput" id="file-upload" accept=".json" @change="importDB()" />
      <button class="button-icon" type="button" @click="deleteDB()" @mouseover="setTooltip('Delete database')"
        @mouseleave="resetTooltip()">
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
    // background-color: var(--white);
    border-radius: 100%;
  }

  label {
    cursor: pointer;
  }
}
</style>