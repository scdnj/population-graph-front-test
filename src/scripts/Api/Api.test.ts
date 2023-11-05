import { Api } from './';
import _axios from 'axios';
jest.mock('axios');
jest.useFakeTimers({ advanceTimers: true });

const axios = _axios as jest.MockedObject<typeof _axios>;
axios.create.mockImplementation(() => axios);

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
