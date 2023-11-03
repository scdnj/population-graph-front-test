import axios from 'axios';
import { getApiKey } from '@/scripts/Api/getApiKey';

const key = getApiKey();

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

type ApiReturn<T> = {
  message: null;
  result: { data: T };
};

export class Api {
  axios = axios.create({
    headers: { 'X-API-KEY': key },
    baseURL: 'https://opendata.resas-portal.go.jp/api/v1/',
  });

  async getPrefectures(): Promise<Prefecture[]> {
    const { data } = await this.axios.get<ApiReturn<Prefecture[]>>(`/prefectures`);
    return data.result.data;
  }
}
