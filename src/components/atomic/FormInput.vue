<script setup lang="ts">
const props = defineProps<{
  type: string
  name: string
  required?: boolean
}>()

const value = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <input class="input" :value="value" :type="props.type" :name="props.name" :id="props.name" :placeholder="props.name"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)!.value)" :required="required" />
    <label class="label" :for="props.name">
      <p class="label__name">{{ name }}
        <!-- <span class="label__required" v-if="required">{{ '*' }}</span> -->
      </p>
    </label>
  </div>
</template>
<style lang="scss" scoped>
.input {
  font-size: 1.1rem;
  background-color: var(--white);
  color: var(--text);
  border-radius: 2rem;
  height: 3rem;
  padding: 0.25rem 1rem;
}

.label {
  display: flex;
  padding-left: 1rem;
  font-size: 0.9rem;
  overflow: hidden;

  &__name {
    font-family: var(--font-bold);
    animation: translateIn 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
    color: var(--active-plus);
    }
    
    &__required {
      font-family: var(--font-bold);
      color: var(--active-plus);
  }
}

@keyframes translateIn {
  0% {
    transform: translateY(-2rem);
  }

  50% {
    transform: translateY(-2rem);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
