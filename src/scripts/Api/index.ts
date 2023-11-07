import axios from 'axios';
import { getApiKey } from '@/scripts/Api/getApiKey';
import { isStorybook } from '@/isStorybook';
import { Api as ApiMock } from './__mocks__';
import { getBasePath } from './getBasePath';

type ApiReturn<T> = {
  message: null;
  result: T;
};

const key = getApiKey();

type Error403 = {
  description: string;
  message: string;
  statusCode: '403';
};

type Error404 = {
  description: string;
  message: string;
  statusCode: '404';
};
// | '404';
// 本当はこのパターンもあるけどstringで返ってくるものは他でcatchしてるので一旦省略

type Error429 = { message: null };

type Error400 = '400';

type Error500 = '500';

type ApiErrorResponses = Error403 | Error404 | Error429 | Error400 | Error500;

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

type ApiComposition = ApiReturn<{ boundaryYear: number; data: CompositionSubGroup[] }>;

type CompositionSubGroup = {
  label: CompositionType;
  data: CompositionData[];
};

export type CompositionType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

export type CompositionData = { year: number; value: number };

export type Composition = { [P in CompositionType]: CompositionData[] };
export interface ApiInterface {
  getPrefectures: () => Promise<Prefecture[]>;
  getComposition: (prefCode: number) => Promise<Composition>;
}

const deepEqual = (a: unknown, b: unknown): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

type ErrorStatus = 400 | 403 | 404 | 429 | 500;
class ApiErrorImpl extends Error {
  statusCode: ErrorStatus;
  description: string;
  constructor(status: ErrorStatus) {
    super(status.toString());
    this.statusCode = status;
    if (status === 400) {
      this.description = 'パラメータの設定が間違っています。開発者にお問い合わせください';
    } else if (status === 403) {
      this.description = 'APIキーが間違っています。開発者にお問い合わせください';
    } else if (status === 404) {
      this.description = 'データが見つかりませんでした。開発者にお問い合わせください';
    } else if (status === 429) {
      this.description = 'リクエストが多すぎます。しばらくしてから再度お試しください';
    } else if (status === 500) {
      this.description = 'サーバーエラーが発生しています。しばらくしてから再度お試しください';
    } else {
      this.description = '想定していないエラーが発生しました。開発者にお問い合わせください';
    }
  }
}

export type ApiError = ApiErrorImpl;

function catchError<T>(e: T | ApiErrorResponses): asserts e is T {
  if (typeof e === 'string') {
    throw new ApiErrorImpl(Number(e) as 400 | 500 | 404);
  } else if (deepEqual(e, { message: null })) {
    throw new ApiErrorImpl(429);
  } else if ((e as unknown as Error403).statusCode === '403') {
    throw new ApiErrorImpl(403);
  } else if ((e as unknown as Error404).statusCode === '404') {
    throw new ApiErrorImpl(404);
  }
}

class ApiImpl implements ApiInterface {
  private readonly axios = axios.create({
    headers: key !== undefined ? { 'X-API-KEY': key } : {},
    baseURL: getBasePath(),
  });

  /**
   * 都道府県一覧を返す
   */
  async getPrefectures(): Promise<Prefecture[]> {
    const { data } = await this.axios.get<ApiReturn<Prefecture[]> | ApiErrorResponses>(
      `/prefectures`,
    );
    catchError(data);

    return data.result;
  }

  /**
   * 引数で入力した都道府県の人口構成を返す
   * @param prefCode 都道府県コード
   */
  async getComposition(prefCode: number): Promise<Composition> {
    const { data } = await this.axios.get<ApiComposition | ApiErrorResponses>(
      `/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    );
    catchError(data);
    return {
      総人口: getCompositionData(data, '総人口'),
      年少人口: getCompositionData(data, '年少人口'),
      生産年齢人口: getCompositionData(data, '生産年齢人口'),
      老年人口: getCompositionData(data, '老年人口'),
    };
  }
}

const getCompositionData = (data: ApiComposition, label: CompositionType): CompositionData[] => {
  const returnValue = data.result.data.find((d) => d.label === label)?.data;
  if (returnValue === undefined) {
    throw new Error(label + 'のデータが見つかりませんでした');
  }
  return returnValue;
};

const Api = isStorybook() ? ApiMock : ApiImpl;

export { Api };
