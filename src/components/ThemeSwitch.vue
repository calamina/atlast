<script setup lang="ts">
import { onClickOutside, onKeyStroke, useColorMode } from '@vueuse/core'
import { ref, watch } from 'vue'
import IconMoon from './icons/IconMoon.vue'
import IconMoonHalf from './icons/IconMoonHalf.vue'
import IconMoonHalfFilled from './icons/IconMoonHalfFilled.vue'
import IconMoonStars from './icons/IconMoonStars.vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import OptionButton from './atomic/OptionButton.vue'

const colorMode = useColorMode({ emitAuto: true })
const themeOpen = ref(false)
const theme = ref(null)
onClickOutside(theme, () => closeTheme())
onKeyStroke('Escape', () => closeTheme())

const closeTheme = () => themeOpen.value = false

const { activate, deactivate } = useFocusTrap(theme)
watch(themeOpen, () => themeOpen.value ? activate() : deactivate())

function setMode(mode: 'light' | 'dark' | 'auto') {
  colorMode.value = mode;
  // themeOpen.value = false
}
</script>
<template>
  <div ref="theme" class="theme">
    <OptionButton info="Theme picker" background="dark" :class="{ 'activetheme': themeOpen }"
                  @click="themeOpen = !themeOpen">
      <IconMoon />
    </OptionButton>
    <transition name="menu">
      <div v-if="themeOpen" class="theme-menu">
        <OptionButton info="system theme" :active="colorMode === 'auto'" @click="setMode('auto')">
          <IconMoonStars />
          <!-- System -->
        </OptionButton>
        <OptionButton info="light theme" :active="colorMode === 'light'" @click="setMode('light')">
          <IconMoonHalf />
          <!-- Light -->
        </OptionButton>
        <OptionButton info="dark theme" :active="colorMode === 'dark'" @click="setMode('dark')">
          <IconMoonHalfFilled />
          <!-- Dark -->
        </OptionButton>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.theme {
  justify-self: center;
}

.theme-menu {
  background-color: var(--background-darker);
  position: fixed;
  top: var(--fixed);
  display: flex;
  flex-flow: column;
  border-radius: 2rem;
}
</style>