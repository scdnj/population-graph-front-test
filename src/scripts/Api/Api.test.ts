import { Api } from './';
import _axios from 'axios';
jest.mock('axios');

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
