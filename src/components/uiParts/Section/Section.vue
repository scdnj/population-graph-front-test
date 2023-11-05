<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{ title: string }>();
</script>
<template>
  <section :aria-label="title">
    <h2 class="text-left">{{ title }}</h2>
    <slot />
  </section>
</template>
