<script setup lang="ts">
import { onMounted } from 'vue';
import Checkbox from '@/components/uiParts/Checkbox/Checkbox.vue';
import CompositionChart from '@/components/domain/composition/CompositionChart/CompositionChart.vue';
import { useComposition } from '@/scripts/composables/useComposition';
import Section from '@/components/uiParts/Section/Section.vue';

const { fetchPrefectures, prefectures, checkedPrefectures, compositions } = useComposition();

onMounted(fetchPrefectures);
</script>

<template>
  <div>
    <Section title="都道府県">
      <div class="flex flex-wrap text-lg font-bold">
        <div v-for="prefecture in prefectures" :key="prefecture.prefCode" class="w-1/3 sm:w-24">
          <Checkbox
            v-model="checkedPrefectures[prefecture.prefCode]"
            :label="prefecture.prefName"
            class="sm:p-1 py-2 pl-1 m-1 sm:m-0 bg-blue-500/20"
          />
        </div>
      </div>
    </Section>
    <CompositionChart :compositions="compositions" />
  </div>
</template>
