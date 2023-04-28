<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import IconClose from './icons/IconClose.vue'
const notification = useNotificationStore()
</script>

<template>
  <transition>
    <div
      v-if="notification.message"
      class="notification"
      :class="notification.type"
      @click="notification.clear()"
    >
      <p class="notification__message">
        {{ notification.message }}
      </p>
      <button class="notification__close">
        <IconClose />
      </button>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 4rem;
  width: 90vw;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

  &__close {
    position: absolute;
    right: 2rem;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    outline: none;
  }
}
.error {
  background-color: rgb(219, 157, 157);
}
.alert {
  background-color: rgb(196, 219, 157);
}

@keyframes notification-in {
  0% {
    transform: translateY(-2rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.v-enter-active {
  animation: notification-in 0.2s ease;
}

.v-leave-active {
  animation: notification-in 0.2s ease reverse;
}
</style>
