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
      return wrap({
        data: [
          {
            prefCode: 1,
            prefName: '北海道',
          },
        ],
      });
    } else if (path.match(/composition/) !== null) {
      return wrap({
        boundaryYear: 2020,
        data: [
          {
            data: [
              {
                value: 50,
                year: 1960,
              },
            ],
            label: '総人口',
          },
          {
            data: [
              {
                value: 10,
                year: 1960,
              },
            ],
            label: '年少人口',
          },
          {
            data: [
              {
                value: 20,
                year: 1960,
              },
            ],
            label: '生産年齢人口',
          },
          {
            data: [
              {
                value: 20,
                year: 1960,
              },
            ],
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
  it('dataが空の場合', async () => {
    const api = new Api();
    const compositions = await api.getCompositions([]);
    expect(compositions).toEqual([]);
  });
  it('data = [1]', async () => {
    const api = new Api();
    const compositions = await api.getCompositions([1]);
    expect(compositions.length).toEqual(1);
  });
  it('data = [1, 2]', async () => {
    const api = new Api();
    const compositions = await api.getCompositions([1, 2]);
    expect(compositions.length).toEqual(2);
  });
  it('正しいURLが叩かれていることを確認', async () => {
    const api = new Api();
    const [composition] = await api.getCompositions([1]);
    expect(composition.prefCode).toEqual(1);
    expect(axios.get).toHaveBeenCalledWith('/population/composition/perYear?cityCode=-&prefCode=1');
  });
  it('prefCode複数指定で複数回APIが叩かれる', async () => {
    const api = new Api();
    const [composition, composition2] = await api.getCompositions([1, 2]);
    expect(composition.prefCode).toEqual(1);
    expect(composition2.prefCode).toEqual(2);
    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      '/population/composition/perYear?cityCode=-&prefCode=1',
    );
    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      '/population/composition/perYear?cityCode=-&prefCode=2',
    );
  });
});
