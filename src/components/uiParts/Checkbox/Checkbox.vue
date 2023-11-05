<script setup lang="ts">
import { computed, defineProps } from 'vue';
const props = defineProps<{ modelValue?: boolean; label?: string }>();
const emits = defineEmits<{ 'update:model-value': [value: boolean] }>();

const vModel = computed({
  get: () => props.modelValue,
  set: (v: boolean) => {
    emits('update:model-value', v);
  },
});
</script>
<template>
  <label class="flex items-center text-sm space-x-2">
    <input v-model="vModel" type="checkbox" />
    <div>
      {{ label }}
    </div>
  </label>
</template>
