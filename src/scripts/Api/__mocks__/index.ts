import { type ApiInterface, type Prefecture, type Composition } from '../';

export class Api implements ApiInterface {
  async getPrefectures(): Promise<Prefecture[]> {
    return [
      {
        prefCode: 1,
        prefName: '北海道',
      },
      {
        prefCode: 2,
        prefName: '青森県',
      },
      {
        prefCode: 3,
        prefName: '東京都',
      },
      {
        prefCode: 4,
        prefName: 'けつばん',
      },
    ];
  }

  async getComposition(prefCode: number): Promise<Composition> {
    return [
      {
        data: [{ value: 50 * prefCode, year: 1960 }],
        label: '総人口',
      },
      {
        data: [{ value: 10 * prefCode, year: 1960 }],
        label: '年少人口',
      },
      {
        data: [{ value: 20 * prefCode, year: 1960 }],
        label: '生産年齢人口',
      },
      {
        data: [{ value: 20 * prefCode, year: 1960 }],
        label: '老年人口',
      },
    ];
  }
}
