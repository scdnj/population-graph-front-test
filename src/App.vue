<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Api, type Composition, type Prefecture } from '@/scripts/Api';
import Checkbox from './components/Checkbox/Checkbox.vue';
import CompositionChart from './components/CompositionChart/CompositionChart.vue';

const api = new Api();

const prefectures = ref<Prefecture[]>([]);

const checked = ref<{ [prefCode: number]: boolean }>({});

watch(
  checked,
  () => {
    checkedArray.value.forEach((prefCode) => {
      if (compositions.value[prefCode] === undefined) {
        void getComposition(prefCode).then((composition) => {
          compositions.value[prefCode] = composition;
        });
      }
    });
  },
  {
    deep: true,
  },
);

const checkedArray = computed(() => {
  return Object.entries(checked.value)
    .filter(([, v]) => v)
    .map(([k]) => +k);
});

const compositions = ref<{ [prefCode: number]: Composition }>({});

const compositionAndNames = computed(() => {
  return checkedArray.value.map((prefCode) => {
    const prefecture = prefectures.value.find((p) => p.prefCode === prefCode);
    return {
      prefName: prefecture?.prefName ?? '',
      composition: compositions.value[prefCode] ?? [],
    };
  });
});

onMounted(async () => {
  prefectures.value = await api.getPrefectures();
});

const getComposition = async (prefCode: number) => {
  const composition = await api.getComposition(prefCode);
  return composition;
};
</script>

<template>
  <div>
    <div class="flex flex-wrap text-lg font-bold">
      <div v-for="prefecture in prefectures" :key="prefecture.prefCode" class="w-24">
        <Checkbox v-model="checked[prefecture.prefCode]" :label="prefecture.prefName" class="p-1" />
      </div>
    </div>
    <CompositionChart :compositions="compositionAndNames" />
  </div>
</template>
