<script setup lang="ts">
import { computed, defineProps } from 'vue';
type CheckType = boolean | 'loading';
const props = defineProps<{ modelValue?: CheckType; label?: string }>();
const emits = defineEmits<{ 'update:model-value': [value: boolean] }>();

const vModel = computed({
  get: () => props.modelValue === true,
  set: (v: boolean) => {
    emits('update:model-value', v);
  },
});
</script>
<template>
  <label :aria-checked="modelValue === true" class="flex items-center text-sm space-x-2">
    <input
      v-model="vModel"
      type="checkbox"
      :disabled="modelValue === 'loading'"
      :class="modelValue === 'loading' && 'opacity-0 w-0 h-0'"
    />
    <div
      v-if="modelValue === 'loading'"
      class="w-4 h-4 rounded-full bg-gray-500 animate-pulse"
    ></div>
    <div>
      {{ label }}
    </div>
  </label>
</template>
