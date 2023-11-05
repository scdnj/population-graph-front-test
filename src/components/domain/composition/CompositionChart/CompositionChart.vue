<script setup lang="ts">
import { computed, ref } from 'vue';
import { Chart, type ChartOptions } from 'highcharts-vue';
import { type Options } from 'highcharts';
import { type CompositionType, type Composition } from '@/scripts/Api';
import RadioGroup from '@/components/uiParts/RadioGroup/RadioGroup.vue';
import { simplify } from '@/scripts/simplify';
const props = defineProps<{
  compositions: Array<{ prefName: string; composition: Composition }>;
}>();

const options = ref<Options & ChartOptions>({
  accessibility: {
    description: '都道府県別人口',
    point: {
      descriptionFormatter: (p) => {
        return `${p.x}年の${p.series.name}の${selectedCompositionType.value}は${p.y}人です。`;
      },
    },
  },
  // タイトルを無入力にするとy軸の名前が見えなくなるのでtransparentで入れておいている。
  title: {
    text: '都道府県別人口',
    style: {
      color: 'transparent',
    },
  },

  xAxis: {
    title: {
      text: '年度',
    },
    crosshair: {
      color: 'gray',
      dashStyle: 'DashDot',
    },
  },
  yAxis: {
    title: {
      text: '人口数',
      align: 'high',
      rotation: 0,
      textAlign: 'right',
      y: -20,
      offset: 10,
    },
    labels: {
      formatter: (v) => {
        return v.value.toLocaleString();
      },
    },
  },
  tooltip: {
    formatter: function () {
      return (
        '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y?.toLocaleString() + '人'
      );
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 700,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
          yAxis: {
            labels: {
              formatter: (v) => {
                return simplify(+v.value);
              },
            },
          },
        },
      },
    ],
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
  },
});

const selectedCompositionType = ref<CompositionType>('総人口');

const radioOptions: CompositionType[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

const series = computed(() => {
  return props.compositions.map(({ prefName, composition }) => {
    return {
      type: 'line',
      name: prefName,
      data:
        composition[selectedCompositionType.value].map((c) => ({
          x: c.year,
          y: c.value,
        })) ?? [],
    };
  });
});
</script>
<template>
  <Chart :options="{ ...options, series }"></Chart>
  <RadioGroup v-model="selectedCompositionType" :options="radioOptions" />
</template>
