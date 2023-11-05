<script setup lang="ts">
import { computed, defineProps } from 'vue';
const props = defineProps<{
  modelValue?: string;
  label: string;
}>();

const emits = defineEmits<{
  'update:model-value': [value: string];
}>();

const vModel = computed({
  get: () => props.modelValue,
  set: (v: string | undefined) => {
    emits('update:model-value', v ?? '');
  },
});
</script>
<template>
  <label class="flex items-center space-x-2 hover:bg-blue-500/20 cursor-pointer p-1 rounded-sm">
    <input v-model="vModel" :value="label" type="radio" />
    <div class="text-sm">{{ label }}</div>
  </label>
</template>
