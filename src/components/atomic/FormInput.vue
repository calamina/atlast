<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  type: string
  name: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <input
      class="input"
      :value="props.modelValue"
      :type="props.type"
      :name="props.name"
      :id="props.name"
      :placeholder="props.name"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)!.value)"
    />
    <label class="label" :for="props.name">
      <p class="label__name">{{ name }}</p>
    </label>
  </div>
</template>
<style lang="scss" scoped>
.input {
  font-size: 1.1rem;
  background-color: #fff;
  color: #000;
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
    font-family: 'contaxBold', 'Arial', sans-serif;
    animation: translateIn 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
    color: #999;
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
