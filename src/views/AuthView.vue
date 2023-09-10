<script setup lang="ts">
import UserLogin from '@/components/UserLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import { ref } from 'vue'

let loginRegister = ref(true)
</script>

<template>
  <main>
    <Transition mode="out-in">
      <UserLogin class="userForm" v-if="loginRegister" @toggleRegister="loginRegister = false" />
      <UserRegister class="userForm" v-else @toggleLogin="loginRegister = true" />
    </Transition>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 20rem;
  margin: 0 auto;
  height: 100vh;
}

// .button--primary {
//   width: unset;
//   font-size: 1.5rem;
//   font-weight: 100;
//   background-color: transparent;
//   color: #000;
//   border: 1px solid #000;
//   border-radius: 1.5rem;
//   padding: 0.4rem 1.5rem;
//   transition: background-color 0.2s, color 0.2s, width 0.2s;
//   overflow: hidden;

//   &:hover {
//     background-color: #000;
//     color: #eee;
//   }
// }

.button--primary {
  width: unset;
  font-size: 1.4rem;
  // box-shadow: rgba(95, 89, 138, 0.45) 0px 10px 100px 0px;

  font-weight: 100;
  background-color: transparent;
  color: #000;
  border: 1px solid #000;
  border-radius: 1.5rem;
  padding: 0.4rem 1.5rem;
  margin-top: 2rem;
  transition: background-color 0.2s, color 0.2s, width 0.2s;
  overflow: hidden;

  &:hover {
    background-color: #000;
    color: #fff;
  }
}

.button--secondary {
  width: unset;
  font-size: 1.2rem;
  background-color: transparent;
  color: #000;

  span {
    text-decoration: underline;
    color: #000;
  }
}
.button--tertiary {
  width: unset;
  margin-top: 1rem;
  font-size: 1rem;
  opacity: 0.6;
  background-color: transparent;
  color: #000;
  transition: background-color 0.2s, color 0.2s, width 0.2s;
}

@keyframes notification-in {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    opacity: 1;
  }
}

.v-enter-active {
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.v-leave-active {
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53) reverse;
}
</style>
