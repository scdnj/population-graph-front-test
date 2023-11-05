import { type Composition, type CompositionData } from '@/scripts/Api';
import CompositionChart from './CompositionChart.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof CompositionChart>;
type M = Meta<typeof CompositionChart>;

const meta: M = {
  component: CompositionChart,
  args: {},
  tags: ['autodocs'],
};

export default meta;

const composition: Composition = {
  総人口: [
    { value: 5039206, year: 1960 },
    { value: 5171800, year: 1965 },
    { value: 5184287, year: 1970 },
    { value: 5338206, year: 1975 },
    { value: 5575989, year: 1980 },
    { value: 5679439, year: 1985 },
    { value: 5643647, year: 1990 },
    { value: 5692321, year: 1995 },
    { value: 5683062, year: 2000 },
    { value: 5627737, year: 2005 },
    { value: 5506419, year: 2010 },
    { value: 5381733, year: 2015 },
    { value: 5224614, year: 2020 },
    { value: 5016554, year: 2025 },
    { value: 4791592, year: 2030 },
    { value: 4546357, year: 2035 },
    { value: 4280427, year: 2040 },
    { value: 4004973, year: 2045 },
  ],
  年少人口: [
    { value: 1681479, year: 1960 },
    { value: 1462123, year: 1965 },
    { value: 1309487, year: 1970 },
    { value: 1312611, year: 1975 },
    { value: 1298324, year: 1980 },
    { value: 1217959, year: 1985 },
    { value: 1034251, year: 1990 },
    { value: 898673, year: 1995 },
    { value: 792352, year: 2000 },
    { value: 719057, year: 2005 },
    { value: 657312, year: 2010 },
    { value: 608296, year: 2015 },
    { value: 555804, year: 2020 },
    { value: 511677, year: 2025 },
    { value: 465307, year: 2030 },
    { value: 423382, year: 2035 },
    { value: 391086, year: 2040 },
    { value: 360177, year: 2045 },
  ],
  生産年齢人口: [
    { value: 3145664, year: 1960 },
    { value: 3460359, year: 1965 },
    { value: 3575731, year: 1970 },
    { value: 3657884, year: 1975 },
    { value: 3823808, year: 1980 },
    { value: 3910729, year: 1985 },
    { value: 3924717, year: 1990 },
    { value: 3942868, year: 1995 },
    { value: 3832902, year: 2000 },
    { value: 3696064, year: 2005 },
    { value: 3482169, year: 2010 },
    { value: 3190804, year: 2015 },
    { value: 2945727, year: 2020 },
    { value: 2781175, year: 2025 },
    { value: 2594718, year: 2030 },
    { value: 2394230, year: 2035 },
    { value: 2140781, year: 2040 },
    { value: 1931265, year: 2045 },
  ],
  老年人口: [
    { value: 212063, year: 1960 },
    { value: 249318, year: 1965 },
    { value: 299069, year: 1970 },
    { value: 366651, year: 1975 },
    { value: 451727, year: 1980 },
    { value: 549487, year: 1985 },
    { value: 674881, year: 1990 },
    { value: 844927, year: 1995 },
    { value: 1031552, year: 2000 },
    { value: 1205692, year: 2005 },
    { value: 1358068, year: 2010 },
    { value: 1558387, year: 2015 },
    { value: 1664023, year: 2020 },
    { value: 1723702, year: 2025 },
    { value: 1731567, year: 2030 },
    { value: 1728745, year: 2035 },
    { value: 1748560, year: 2040 },
    { value: 1713531, year: 2045 },
  ],
};

/**
 * 全てのデータの人口を半分にする
 * @param composition
 */
const halfOf = (composition: Composition): Composition => {
  const halfData = (data: CompositionData[]) =>
    data.map((d) => ({ value: d.value / 2, year: d.year }));
  return {
    総人口: halfData(composition['総人口']),
    年少人口: halfData(composition['年少人口']),
    生産年齢人口: halfData(composition['生産年齢人口']),
    老年人口: halfData(composition['老年人口']),
  };
};

export const Default: Story = {
  args: {
    compositions: [
      { prefName: '北海道', composition },
      { prefName: '半分北海道', composition: halfOf(composition) },
    ],
  },
};
