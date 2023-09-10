<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  type: string
  name: string
}>()
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    :type="props.type"
    :name="props.name"
    :id="props.name"
    :placeholder="props.name"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)!.value)"
  />
  <label :for="props.name"
    ><p>{{ name }}</p></label
  >
</template>
<style lang="scss" scoped>
label {
  color: #000;
  font-variant: small-caps;
  margin-top: -1rem;
  font-style: italic;
  padding-left: 0.15rem;
  overflow: hidden;

  p {
    letter-spacing: 0.05rem;
    color: #000;
    animation: translateIn 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
  }
}

input[type='text'],
input[type='password'],
input[type='date'],
textarea,
select {
  background-color: transparent;
  font-size: 2.5rem;
  padding: 0;
  border-bottom: 1px solid #000;
  opacity: 1;
  color: #000;
  border-radius: 0;
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
