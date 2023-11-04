import axios from 'axios';
import { getApiKey } from '@/scripts/Api/getApiKey';
import { isStorybook } from '@/isStorybook';
import { Api as ApiMock } from './__mocks__';

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
