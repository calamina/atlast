<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  type: string
  name: string
  showLabel: boolean
}>()
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <input
      :value="props.modelValue"
      :type="props.type"
      :name="props.name"
      :id="props.name"
      :placeholder="props.name"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)!.value)"
    />
    <label :for="props.name" v-if="props.showLabel">
      <p>{{ name }}</p>
    </label>
  </div>
</template>
<style lang="scss" scoped>
label {
  color: #000;
  margin-top: -1rem;
  padding-left: 0.15rem;
  overflow: hidden;

  p {
    font-family: 'contaxBold', 'Arial', sans-serif;
    animation: translateIn 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
  }
}

input[type='text'],
input[type='password'],
input[type='date'],
textarea,
select {
  background-color: #fff;
  font-size: 1.2rem;
  padding: 0;
  opacity: 1;
  color: #000;
  border-radius: 1rem;
  height: 3rem;
  padding: 0.25rem 1rem;
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
