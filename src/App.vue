<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Api, type Composition, type Prefecture } from '@/scripts/Api';
import Checkbox from './components/Checkbox/Checkbox.vue';
import CompositionChart from './components/CompositionChart/CompositionChart.vue';

const api = new Api();

const prefectures = ref<Prefecture[]>([]);

const checked = ref<{ [prefCode: number]: boolean }>({});

const compositions = ref<Array<{ prefCode: number; data: Composition }>>([]);

const compositionAndNames = computed(() => {
  return compositions.value.map(({ prefCode, data }) => {
    const prefecture = prefectures.value.find((p) => p.prefCode === prefCode);
    return {
      prefName: prefecture?.prefName ?? '',
      composition: data,
    };
  });
});

onMounted(async () => {
  prefectures.value = await api.getPrefectures();
});

const getCompositions = async () => {
  const checkedPrefectures = Object.entries(checked.value)
    .filter(([, v]) => v)
    .map(([k]) => +k);
  compositions.value = await api.getCompositions(checkedPrefectures);
};
</script>

<template>
  <div>
    <div class="flex flex-wrap text-lg font-bold">
      <div v-for="prefecture in prefectures" :key="prefecture.prefCode" class="w-24">
        <Checkbox v-model="checked[prefecture.prefCode]" :label="prefecture.prefName" class="p-1" />
      </div>
    </div>
    <button class="font-bold" @click="getCompositions">click</button>
    <CompositionChart :compositions="compositionAndNames" />
  </div>
</template>
