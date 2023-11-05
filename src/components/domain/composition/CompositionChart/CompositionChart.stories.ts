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

const composition = [
  {
    data: [
      {
        value: 5039206,
        year: 1960,
      },
      {
        value: 5171800,
        year: 1965,
      },
      {
        value: 5184287,
        year: 1970,
      },
      {
        value: 5338206,
        year: 1975,
      },
      {
        value: 5575989,
        year: 1980,
      },
      {
        value: 5679439,
        year: 1985,
      },
      {
        value: 5643647,
        year: 1990,
      },
      {
        value: 5692321,
        year: 1995,
      },
      {
        value: 5683062,
        year: 2000,
      },
      {
        value: 5627737,
        year: 2005,
      },
      {
        value: 5506419,
        year: 2010,
      },
      {
        value: 5381733,
        year: 2015,
      },
      {
        value: 5224614,
        year: 2020,
      },
      {
        value: 5016554,
        year: 2025,
      },
      {
        value: 4791592,
        year: 2030,
      },
      {
        value: 4546357,
        year: 2035,
      },
      {
        value: 4280427,
        year: 2040,
      },
      {
        value: 4004973,
        year: 2045,
      },
    ],
    label: '総人口',
  },
  {
    data: [
      {
        rate: 33.3,
        value: 1681479,
        year: 1960,
      },
      {
        rate: 28.2,
        value: 1462123,
        year: 1965,
      },
      {
        rate: 25.2,
        value: 1309487,
        year: 1970,
      },
      {
        rate: 24.5,
        value: 1312611,
        year: 1975,
      },
      {
        rate: 23.2,
        value: 1298324,
        year: 1980,
      },
      {
        rate: 21.4,
        value: 1217959,
        year: 1985,
      },
      {
        rate: 18.3,
        value: 1034251,
        year: 1990,
      },
      {
        rate: 15.7,
        value: 898673,
        year: 1995,
      },
      {
        rate: 13.9,
        value: 792352,
        year: 2000,
      },
      {
        rate: 12.7,
        value: 719057,
        year: 2005,
      },
      {
        rate: 11.9,
        value: 657312,
        year: 2010,
      },
      {
        rate: 11.3,
        value: 608296,
        year: 2015,
      },
      {
        rate: 10.6,
        value: 555804,
        year: 2020,
      },
      {
        rate: 10.1,
        value: 511677,
        year: 2025,
      },
      {
        rate: 9.7,
        value: 465307,
        year: 2030,
      },
      {
        rate: 9.3,
        value: 423382,
        year: 2035,
      },
      {
        rate: 9.1,
        value: 391086,
        year: 2040,
      },
      {
        rate: 8.9,
        value: 360177,
        year: 2045,
      },
    ],
    label: '年少人口',
  },
  {
    data: [
      {
        rate: 62.4,
        value: 3145664,
        year: 1960,
      },
      {
        rate: 66.9,
        value: 3460359,
        year: 1965,
      },
      {
        rate: 68.9,
        value: 3575731,
        year: 1970,
      },
      {
        rate: 68.5,
        value: 3657884,
        year: 1975,
      },
      {
        rate: 68.5,
        value: 3823808,
        year: 1980,
      },
      {
        rate: 68.8,
        value: 3910729,
        year: 1985,
      },
      {
        rate: 69.5,
        value: 3924717,
        year: 1990,
      },
      {
        rate: 69.2,
        value: 3942868,
        year: 1995,
      },
      {
        rate: 67.4,
        value: 3832902,
        year: 2000,
      },
      {
        rate: 65.6,
        value: 3696064,
        year: 2005,
      },
      {
        rate: 63.2,
        value: 3482169,
        year: 2010,
      },
      {
        rate: 59.2,
        value: 3190804,
        year: 2015,
      },
      {
        rate: 56.3,
        value: 2945727,
        year: 2020,
      },
      {
        rate: 55.4,
        value: 2781175,
        year: 2025,
      },
      {
        rate: 54.1,
        value: 2594718,
        year: 2030,
      },
      {
        rate: 52.6,
        value: 2394230,
        year: 2035,
      },
      {
        rate: 50,
        value: 2140781,
        year: 2040,
      },
      {
        rate: 48.2,
        value: 1931265,
        year: 2045,
      },
    ],
    label: '生産年齢人口',
  },
  {
    data: [
      {
        rate: 4.2,
        value: 212063,
        year: 1960,
      },
      {
        rate: 4.8,
        value: 249318,
        year: 1965,
      },
      {
        rate: 5.7,
        value: 299069,
        year: 1970,
      },
      {
        rate: 6.8,
        value: 366651,
        year: 1975,
      },
      {
        rate: 8.1,
        value: 451727,
        year: 1980,
      },
      {
        rate: 9.6,
        value: 549487,
        year: 1985,
      },
      {
        rate: 11.9,
        value: 674881,
        year: 1990,
      },
      {
        rate: 14.8,
        value: 844927,
        year: 1995,
      },
      {
        rate: 18.1,
        value: 1031552,
        year: 2000,
      },
      {
        rate: 21.4,
        value: 1205692,
        year: 2005,
      },
      {
        rate: 24.6,
        value: 1358068,
        year: 2010,
      },
      {
        rate: 28.9,
        value: 1558387,
        year: 2015,
      },
      {
        rate: 31.8,
        value: 1664023,
        year: 2020,
      },
      {
        rate: 34.3,
        value: 1723702,
        year: 2025,
      },
      {
        rate: 36.1,
        value: 1731567,
        year: 2030,
      },
      {
        rate: 38,
        value: 1728745,
        year: 2035,
      },
      {
        rate: 40.8,
        value: 1748560,
        year: 2040,
      },
      {
        rate: 42.7,
        value: 1713531,
        year: 2045,
      },
    ],
    label: '老年人口',
  },
];

export const Default: Story = {
  args: {
    compositions: [
      {
        prefName: '北海道',
        composition,
      },
      {
        prefName: '半分北海道',
        composition: composition.map((d) => {
          return {
            ...d,
            data: d.data.map((d) => {
              return {
                ...d,
                value: d.value / 2,
              };
            }),
          };
        }),
      },
    ],
  },
};
