import axios from 'axios';
import { getApiKey } from '@/scripts/Api/getApiKey';
import { isStorybook } from '@/isStorybook';
import { Api as ApiMock } from './__mocks__';

type ApiReturn<T> = {
  message: null;
  result: T;
};

const key = getApiKey();

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type Composition = CompositionSubGroup[];

type CompositionSubGroup = {
  label: CompositionType;
  data: CompositionData[];
};

export type CompositionType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

export type CompositionData = { year: number; value: number };

export interface ApiInterface {
  getPrefectures: () => Promise<Prefecture[]>;
  getComposition: (prefCode: number) => Promise<Composition>;
}

class ApiImpl implements ApiInterface {
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
   * @param prefCode 都道府県コード
   */
  async getComposition(prefCode: number): Promise<Composition> {
    const { data } = await this.axios.get<ApiReturn<{ data: Composition }>>(
      `/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    );
    return data.result.data;
  }
}

const Api = isStorybook() ? ApiMock : ApiImpl;

export { Api };
