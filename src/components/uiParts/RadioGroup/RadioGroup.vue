<script setup lang="ts">
import { computed, defineProps } from 'vue';
import Radio from '../Radio/Radio.vue';
const props = defineProps<{
  modelValue: string;
  options: string[];
  label?: string;
}>();
const emits = defineEmits<{
  'update:model-value': [value: string];
}>();
const vModel = computed({
  get: () => props.modelValue,
  set: (v: string) => {
    emits('update:model-value', v);
  },
});
</script>
<template>
  <fieldset role="radiogroup">
    <legend>{{ label }}</legend>
    <Radio v-for="option in options" :key="option" v-model="vModel" :label="option" class="mb-1" />
  </fieldset>
</template>
