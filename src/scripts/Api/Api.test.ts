import { Api } from './';
import _axios from 'axios';
jest.mock('axios');
jest.useFakeTimers({ advanceTimers: true });

const axios = _axios as jest.MockedObject<typeof _axios>;
axios.create.mockImplementation(() => axios);

// https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.htmlより
const mockApiError = (status: 400 | 403 | 404 | 429 | 500 | 404_2) => {
  const mock = (data: unknown) => {
    axios.get.mockResolvedValueOnce({ data, status: 200 });
  };
  switch (status) {
    case 400:
      mock('400');
      break;
    case 403:
      mock({
        description: '',
        message: 'Forbidden.',
        statusCode: '403',
      });
      break;
    case 404:
      mock({
        description: 'The requested URL /404 was not found on this server.',
        message: "404. That's an error.",
        statusCode: '404',
      });
      break;

    case 404_2:
      mock('404');
      break;
    case 429:
      mock({
        message: null,
      });
      break;
    case 500:
      mock('500');
      break;
  }
};

beforeAll(() => {
  axios.get.mockImplementation(async (path: string) => {
    const wrap = <T>(data: T) => ({ data: { message: null, result: data } });
    if (path.match(/prefectures/) !== null) {
      return wrap([{ prefCode: 1, prefName: '北海道' }]);
    } else if (path.match(/composition/) !== null) {
      return wrap({
        boundaryYear: 2020,
        data: [
          {
            data: [{ value: 50, year: 1960 }],
            label: '総人口',
          },
          {
            data: [{ value: 10, year: 1960 }],
            label: '年少人口',
          },
          {
            data: [{ value: 20, year: 1960 }],
            label: '生産年齢人口',
          },
          {
            data: [{ value: 20, year: 1960 }],
            label: '老年人口',
          },
        ],
      });
    }
  });
});

beforeEach(() => {
  axios.get.mockClear();
});
describe('getPrefectures', () => {
  it('正常系', async () => {
    const api = new Api();
    const prefectures = await api.getPrefectures();
    expect(prefectures).toEqual([
      {
        prefCode: 1,
        prefName: '北海道',
      },
    ]);
  });
  describe('エラー', () => {
    it.each(([400, 403, 404, 429, 500, 404] as const).map((status) => [status]))(
      '%d',
      async (status) => {
        const api = new Api();
        mockApiError(status);
        await expect(api.getPrefectures()).rejects.toThrow(status.toString());
      },
    );
    it('404がstringでエラーが返ってくるパターンもテスト書いておく', async () => {
      const api = new Api();
      mockApiError(404_2);
      await expect(api.getPrefectures()).rejects.toThrow('404');
    });
    it('なんだかわからないエラーもcatchする', async () => {
      const api = new Api();
      axios.get.mockRejectedValueOnce(new Error('unknown error'));
      await expect(api.getPrefectures()).rejects.toThrow('unknown error');
    });
  });
});

describe('getComposition', () => {
  it('(mockした)レスポンス内容の値のresultを取り出している', async () => {
    const compositions = await new Api().getComposition(1);
    expect(compositions).toEqual({
      総人口: [{ value: 50, year: 1960 }],
      年少人口: [{ value: 10, year: 1960 }],
      生産年齢人口: [{ value: 20, year: 1960 }],
      老年人口: [{ value: 20, year: 1960 }],
    });
  });
  describe('引数で入れた値がprefCodeとしてクエリに入っている', () => {
    test('prefCode = 1', async () => {
      await new Api().getComposition(1);
      expect(axios.get).toHaveBeenCalledWith(
        '/population/composition/perYear?cityCode=-&prefCode=1',
      );
    });
    test('prefCode = 2', async () => {
      await new Api().getComposition(2);
      expect(axios.get).toHaveBeenCalledWith(
        '/population/composition/perYear?cityCode=-&prefCode=2',
      );
    });
  });
});
