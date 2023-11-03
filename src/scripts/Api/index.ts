import axios from 'axios';
import { getApiKey } from '@/scripts/Api/getApiKey';
import { wait } from '../util/wait';

const key = getApiKey();

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type Composition = Array<{
  label: string;
  data: Array<{ year: number; value: number }>;
}>;

type ApiReturn<T> = {
  message: null;
  result: T;
};

export class Api {
  private readonly axios = axios.create({
    headers: { 'X-API-KEY': key },
    baseURL: 'https://opendata.resas-portal.go.jp/api/v1/',
  });

  /**
   * 都道府県一覧を返す
   */
  async getPrefectures(): Promise<Prefecture[]> {
    const { data } = await this.axios.get<ApiReturn<Prefecture[]>>(`/prefectures`);
    return data.result;
  }

  /**
   * 引数で入力した都道府県の人口構成を返す
   * @param prefCodes 都道府県コードの配列
   */
  async getCompositions(
    prefCodes: number[],
  ): Promise<Array<{ prefCode: number; data: Composition }>> {
    if (prefCodes.length === 0) {
      return [];
    }
    const result: Array<{ prefCode: number; data: Composition }> = [];
    // API側に複数指定するクエリがないので、都道府県ごとにリクエストを送る
    for (let i = 0; i < prefCodes.length; i++) {
      const prefCode = prefCodes[i];
      const { data } = await this.axios.get<ApiReturn<{ data: Composition }>>(
        `/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      );
      result.push({ data: data.result.data, prefCode });

      // 一秒間の平均リクエスト回数は5回なので、200ms待つ
      await wait(200);
    }
    return result;
  }
}
