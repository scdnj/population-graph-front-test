<script setup lang="ts">
import { onMounted } from 'vue';
import Checkbox from '@/components/uiParts/Checkbox/Checkbox.vue';
import CompositionChart from '@/components/domain/composition/CompositionChart/CompositionChart.vue';
import { useComposition } from '@/scripts/composables/useComposition';

const { fetchPrefectures, prefectures, checkedPrefectures, compositions } = useComposition();

onMounted(fetchPrefectures);
</script>

<template>
  <div>
    <div class="flex flex-wrap text-lg font-bold">
      <div v-for="prefecture in prefectures" :key="prefecture.prefCode" class="w-24">
        <Checkbox
          v-model="checkedPrefectures[prefecture.prefCode]"
          :label="prefecture.prefName"
          class="p-1"
        />
      </div>
    </div>
    <CompositionChart :compositions="compositions" />
  </div>
</template>
