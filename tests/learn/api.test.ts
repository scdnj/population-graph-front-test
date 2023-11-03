import axios from 'axios';
import { config } from 'dotenv';

async function wait(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

const headers = {
  'X-API-KEY': config({ path: '.env.local' }).parsed?.API_KEY,
};
beforeEach(async () => {
  // 一秒間の平均リクエスト回数は5回なので、200ms待つ
  await wait(200);
});
/**
 * 何を叩いても200が返るけどリクエストがおかしいとbodyにエラーがレスポンスされる。
 * bodyの型はstringだったり{ message: string, statusCode: string, description: string }だったりする。
 */
describe('api学習テスト', () => {
  test('都道府県リストの取得', async () => {
    const { data } = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers,
    });
    expect(data).toEqual({
      message: null,
      result: [
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
          prefName: '岩手県',
        },
        {
          prefCode: 4,
          prefName: '宮城県',
        },
        {
          prefCode: 5,
          prefName: '秋田県',
        },
        {
          prefCode: 6,
          prefName: '山形県',
        },
        {
          prefCode: 7,
          prefName: '福島県',
        },
        {
          prefCode: 8,
          prefName: '茨城県',
        },
        {
          prefCode: 9,
          prefName: '栃木県',
        },
        {
          prefCode: 10,
          prefName: '群馬県',
        },
        {
          prefCode: 11,
          prefName: '埼玉県',
        },
        {
          prefCode: 12,
          prefName: '千葉県',
        },
        {
          prefCode: 13,
          prefName: '東京都',
        },
        {
          prefCode: 14,
          prefName: '神奈川県',
        },
        {
          prefCode: 15,
          prefName: '新潟県',
        },
        {
          prefCode: 16,
          prefName: '富山県',
        },
        {
          prefCode: 17,
          prefName: '石川県',
        },
        {
          prefCode: 18,
          prefName: '福井県',
        },
        {
          prefCode: 19,
          prefName: '山梨県',
        },
        {
          prefCode: 20,
          prefName: '長野県',
        },
        {
          prefCode: 21,
          prefName: '岐阜県',
        },
        {
          prefCode: 22,
          prefName: '静岡県',
        },
        {
          prefCode: 23,
          prefName: '愛知県',
        },
        {
          prefCode: 24,
          prefName: '三重県',
        },
        {
          prefCode: 25,
          prefName: '滋賀県',
        },
        {
          prefCode: 26,
          prefName: '京都府',
        },
        {
          prefCode: 27,
          prefName: '大阪府',
        },
        {
          prefCode: 28,
          prefName: '兵庫県',
        },
        {
          prefCode: 29,
          prefName: '奈良県',
        },
        {
          prefCode: 30,
          prefName: '和歌山県',
        },
        {
          prefCode: 31,
          prefName: '鳥取県',
        },
        {
          prefCode: 32,
          prefName: '島根県',
        },
        {
          prefCode: 33,
          prefName: '岡山県',
        },
        {
          prefCode: 34,
          prefName: '広島県',
        },
        {
          prefCode: 35,
          prefName: '山口県',
        },
        {
          prefCode: 36,
          prefName: '徳島県',
        },
        {
          prefCode: 37,
          prefName: '香川県',
        },
        {
          prefCode: 38,
          prefName: '愛媛県',
        },
        {
          prefCode: 39,
          prefName: '高知県',
        },
        {
          prefCode: 40,
          prefName: '福岡県',
        },
        {
          prefCode: 41,
          prefName: '佐賀県',
        },
        {
          prefCode: 42,
          prefName: '長崎県',
        },
        {
          prefCode: 43,
          prefName: '熊本県',
        },
        {
          prefCode: 44,
          prefName: '大分県',
        },
        {
          prefCode: 45,
          prefName: '宮崎県',
        },
        {
          prefCode: 46,
          prefName: '鹿児島県',
        },
        {
          prefCode: 47,
          prefName: '沖縄県',
        },
      ],
    });
  });
  describe('人口構成の取得', () => {
    /**
     * @note このAPIのレスポンスは比較的高い頻度で変わると思われる。
     * @todo 型が変わっていないことだけ確かめるようにしたい。
     */
    test('通常の取得', async () => {
      const query = new URLSearchParams({
        cityCode: '-',
        prefCode: '1',
      });
      const { data } = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query.toString()}`,
        { headers },
      );
      expect(data).toEqual({
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              data: [
                {
                  value: 5039206,
                  year: 1960,
                },
                {
                  value: 5171800,
                  year: 1965,
                },
                {
                  value: 5184287,
                  year: 1970,
                },
                {
                  value: 5338206,
                  year: 1975,
                },
                {
                  value: 5575989,
                  year: 1980,
                },
                {
                  value: 5679439,
                  year: 1985,
                },
                {
                  value: 5643647,
                  year: 1990,
                },
                {
                  value: 5692321,
                  year: 1995,
                },
                {
                  value: 5683062,
                  year: 2000,
                },
                {
                  value: 5627737,
                  year: 2005,
                },
                {
                  value: 5506419,
                  year: 2010,
                },
                {
                  value: 5381733,
                  year: 2015,
                },
                {
                  value: 5224614,
                  year: 2020,
                },
                {
                  value: 5016554,
                  year: 2025,
                },
                {
                  value: 4791592,
                  year: 2030,
                },
                {
                  value: 4546357,
                  year: 2035,
                },
                {
                  value: 4280427,
                  year: 2040,
                },
                {
                  value: 4004973,
                  year: 2045,
                },
              ],
              label: '総人口',
            },
            {
              data: [
                {
                  rate: 33.3,
                  value: 1681479,
                  year: 1960,
                },
                {
                  rate: 28.2,
                  value: 1462123,
                  year: 1965,
                },
                {
                  rate: 25.2,
                  value: 1309487,
                  year: 1970,
                },
                {
                  rate: 24.5,
                  value: 1312611,
                  year: 1975,
                },
                {
                  rate: 23.2,
                  value: 1298324,
                  year: 1980,
                },
                {
                  rate: 21.4,
                  value: 1217959,
                  year: 1985,
                },
                {
                  rate: 18.3,
                  value: 1034251,
                  year: 1990,
                },
                {
                  rate: 15.7,
                  value: 898673,
                  year: 1995,
                },
                {
                  rate: 13.9,
                  value: 792352,
                  year: 2000,
                },
                {
                  rate: 12.7,
                  value: 719057,
                  year: 2005,
                },
                {
                  rate: 11.9,
                  value: 657312,
                  year: 2010,
                },
                {
                  rate: 11.3,
                  value: 608296,
                  year: 2015,
                },
                {
                  rate: 10.6,
                  value: 555804,
                  year: 2020,
                },
                {
                  rate: 10.1,
                  value: 511677,
                  year: 2025,
                },
                {
                  rate: 9.7,
                  value: 465307,
                  year: 2030,
                },
                {
                  rate: 9.3,
                  value: 423382,
                  year: 2035,
                },
                {
                  rate: 9.1,
                  value: 391086,
                  year: 2040,
                },
                {
                  rate: 8.9,
                  value: 360177,
                  year: 2045,
                },
              ],
              label: '年少人口',
            },
            {
              data: [
                {
                  rate: 62.4,
                  value: 3145664,
                  year: 1960,
                },
                {
                  rate: 66.9,
                  value: 3460359,
                  year: 1965,
                },
                {
                  rate: 68.9,
                  value: 3575731,
                  year: 1970,
                },
                {
                  rate: 68.5,
                  value: 3657884,
                  year: 1975,
                },
                {
                  rate: 68.5,
                  value: 3823808,
                  year: 1980,
                },
                {
                  rate: 68.8,
                  value: 3910729,
                  year: 1985,
                },
                {
                  rate: 69.5,
                  value: 3924717,
                  year: 1990,
                },
                {
                  rate: 69.2,
                  value: 3942868,
                  year: 1995,
                },
                {
                  rate: 67.4,
                  value: 3832902,
                  year: 2000,
                },
                {
                  rate: 65.6,
                  value: 3696064,
                  year: 2005,
                },
                {
                  rate: 63.2,
                  value: 3482169,
                  year: 2010,
                },
                {
                  rate: 59.2,
                  value: 3190804,
                  year: 2015,
                },
                {
                  rate: 56.3,
                  value: 2945727,
                  year: 2020,
                },
                {
                  rate: 55.4,
                  value: 2781175,
                  year: 2025,
                },
                {
                  rate: 54.1,
                  value: 2594718,
                  year: 2030,
                },
                {
                  rate: 52.6,
                  value: 2394230,
                  year: 2035,
                },
                {
                  rate: 50,
                  value: 2140781,
                  year: 2040,
                },
                {
                  rate: 48.2,
                  value: 1931265,
                  year: 2045,
                },
              ],
              label: '生産年齢人口',
            },
            {
              data: [
                {
                  rate: 4.2,
                  value: 212063,
                  year: 1960,
                },
                {
                  rate: 4.8,
                  value: 249318,
                  year: 1965,
                },
                {
                  rate: 5.7,
                  value: 299069,
                  year: 1970,
                },
                {
                  rate: 6.8,
                  value: 366651,
                  year: 1975,
                },
                {
                  rate: 8.1,
                  value: 451727,
                  year: 1980,
                },
                {
                  rate: 9.6,
                  value: 549487,
                  year: 1985,
                },
                {
                  rate: 11.9,
                  value: 674881,
                  year: 1990,
                },
                {
                  rate: 14.8,
                  value: 844927,
                  year: 1995,
                },
                {
                  rate: 18.1,
                  value: 1031552,
                  year: 2000,
                },
                {
                  rate: 21.4,
                  value: 1205692,
                  year: 2005,
                },
                {
                  rate: 24.6,
                  value: 1358068,
                  year: 2010,
                },
                {
                  rate: 28.9,
                  value: 1558387,
                  year: 2015,
                },
                {
                  rate: 31.8,
                  value: 1664023,
                  year: 2020,
                },
                {
                  rate: 34.3,
                  value: 1723702,
                  year: 2025,
                },
                {
                  rate: 36.1,
                  value: 1731567,
                  year: 2030,
                },
                {
                  rate: 38,
                  value: 1728745,
                  year: 2035,
                },
                {
                  rate: 40.8,
                  value: 1748560,
                  year: 2040,
                },
                {
                  rate: 42.7,
                  value: 1713531,
                  year: 2045,
                },
              ],
              label: '老年人口',
            },
          ],
        },
      });
    });
    test('複数の取得は出来ない', async () => {
      const query = new URLSearchParams({
        cityCode: '-',
        prefCode: ['1', '2'] as never,
      });
      const { data } = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query.toString()}`,
        { headers },
      );
      expect(data).toEqual('400');
    });
    test('addAreaをすると加算されるだけで別々のグラフを出せるようになるわけではない', async () => {
      const query = new URLSearchParams({
        cityCode: '-',
        prefCode: '1',
        addArea: ['2_', '3_'] as never,
      });
      const { data } = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query.toString()}`,
        { headers },
      );
      expect(data).toEqual({
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              data: [
                {
                  value: 7914329,
                  year: 1960,
                },
                {
                  value: 7999509,
                  year: 1965,
                },
                {
                  value: 7983190,
                  year: 1970,
                },
                {
                  value: 8192415,
                  year: 1975,
                },
                {
                  value: 8521823,
                  year: 1980,
                },
                {
                  value: 8637498,
                  year: 1985,
                },
                {
                  value: 8543448,
                  year: 1990,
                },
                {
                  value: 8593489,
                  year: 1995,
                },
                {
                  value: 8574970,
                  year: 2000,
                },
                {
                  value: 8449435,
                  year: 2005,
                },
                {
                  value: 8209905,
                  year: 2010,
                },
                {
                  value: 7969592,
                  year: 2015,
                },
                {
                  value: 7673132,
                  year: 2020,
                },
                {
                  value: 7335524,
                  year: 2025,
                },
                {
                  value: 6964126,
                  year: 2030,
                },
                {
                  value: 6568767,
                  year: 2035,
                },
                {
                  value: 6147189,
                  year: 2040,
                },
                {
                  value: 5713101,
                  year: 2045,
                },
              ],
              label: '総人口',
            },
            {
              data: [
                {
                  rate: 34,
                  value: 2696658,
                  year: 1960,
                },
                {
                  rate: 29.2,
                  value: 2338712,
                  year: 1965,
                },
                {
                  rate: 25.9,
                  value: 2068488,
                  year: 1970,
                },
                {
                  rate: 24.7,
                  value: 2031203,
                  year: 1975,
                },
                {
                  rate: 23.3,
                  value: 1990792,
                  year: 1980,
                },
                {
                  rate: 21.5,
                  value: 1864313,
                  year: 1985,
                },
                {
                  rate: 18.6,
                  value: 1593143,
                  year: 1990,
                },
                {
                  rate: 16.1,
                  value: 1390097,
                  year: 1995,
                },
                {
                  rate: 14.3,
                  value: 1227963,
                  year: 2000,
                },
                {
                  rate: 13.1,
                  value: 1108594,
                  year: 2005,
                },
                {
                  rate: 12.1,
                  value: 997958,
                  year: 2010,
                },
                {
                  rate: 11.3,
                  value: 907496,
                  year: 2015,
                },
                {
                  rate: 10.6,
                  value: 817363,
                  year: 2020,
                },
                {
                  rate: 10.2,
                  value: 748950,
                  year: 2025,
                },
                {
                  rate: 9.7,
                  value: 677254,
                  year: 2030,
                },
                {
                  rate: 9.3,
                  value: 611589,
                  year: 2035,
                },
                {
                  rate: 9,
                  value: 559284,
                  year: 2040,
                },
                {
                  rate: 8.9,
                  value: 509232,
                  year: 2045,
                },
              ],
              label: '年少人口',
            },
            {
              data: [
                {
                  rate: 61.4,
                  value: 4864994,
                  year: 1960,
                },
                {
                  rate: 65.6,
                  value: 5250430,
                  year: 1965,
                },
                {
                  rate: 67.9,
                  value: 5424761,
                  year: 1970,
                },
                {
                  rate: 67.9,
                  value: 5564099,
                  year: 1975,
                },
                {
                  rate: 68,
                  value: 5798982,
                  year: 1980,
                },
                {
                  rate: 68.2,
                  value: 5893483,
                  year: 1985,
                },
                {
                  rate: 68.6,
                  value: 5866573,
                  year: 1990,
                },
                {
                  rate: 68.1,
                  value: 5859354,
                  year: 1995,
                },
                {
                  rate: 66.4,
                  value: 5696740,
                  year: 2000,
                },
                {
                  rate: 64.5,
                  value: 5457173,
                  year: 2005,
                },
                {
                  rate: 62.3,
                  value: 5121536,
                  year: 2010,
                },
                {
                  rate: 58.7,
                  value: 4683557,
                  year: 2015,
                },
                {
                  rate: 55.7,
                  value: 4280710,
                  year: 2020,
                },
                {
                  rate: 54.8,
                  value: 4024822,
                  year: 2025,
                },
                {
                  rate: 53.5,
                  value: 3726200,
                  year: 2030,
                },
                {
                  rate: 52,
                  value: 3417426,
                  year: 2035,
                },
                {
                  rate: 49.4,
                  value: 3041597,
                  year: 2040,
                },
                {
                  rate: 47.6,
                  value: 2722657,
                  year: 2045,
                },
              ],
              label: '生産年齢人口',
            },
            {
              data: [
                {
                  rate: 4.4,
                  value: 352677,
                  year: 1960,
                },
                {
                  rate: 5.1,
                  value: 410367,
                  year: 1965,
                },
                {
                  rate: 6.1,
                  value: 489941,
                  year: 1970,
                },
                {
                  rate: 7.2,
                  value: 595800,
                  year: 1975,
                },
                {
                  rate: 8.5,
                  value: 729643,
                  year: 1980,
                },
                {
                  rate: 10.1,
                  value: 878420,
                  year: 1985,
                },
                {
                  rate: 12.5,
                  value: 1072394,
                  year: 1990,
                },
                {
                  rate: 15.5,
                  value: 1336928,
                  year: 1995,
                },
                {
                  rate: 18.9,
                  value: 1622639,
                  year: 2000,
                },
                {
                  rate: 22.1,
                  value: 1872211,
                  year: 2005,
                },
                {
                  rate: 25.2,
                  value: 2071334,
                  year: 2010,
                },
                {
                  rate: 29.3,
                  value: 2335900,
                  year: 2015,
                },
                {
                  rate: 32.3,
                  value: 2481325,
                  year: 2020,
                },
                {
                  rate: 34.9,
                  value: 2561752,
                  year: 2025,
                },
                {
                  rate: 36.7,
                  value: 2560672,
                  year: 2030,
                },
                {
                  rate: 38.6,
                  value: 2539752,
                  year: 2035,
                },
                {
                  rate: 41.4,
                  value: 2546308,
                  year: 2040,
                },
                {
                  rate: 43.4,
                  value: 2481212,
                  year: 2045,
                },
              ],
              label: '老年人口',
            },
          ],
        },
      });
    });
  });
  describe('エラー系のテスト', () => {
    describe('実ステータスは200だけどbodyでエラーと返すパターン', () => {
      test('鍵がないと403が入ったobject', async () => {
        const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures');
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({
          description: '',
          message: 'Forbidden.',
          statusCode: '403',
        });
      });
      describe('おかしなクエリを入れる', () => {
        test('stringは500というstringが変える', async () => {
          const query = new URLSearchParams({
            cityCode: '-',
            prefCode: 'あいうえお',
          });
          const response = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query.toString()}`,
            { headers },
          );
          expect(response.status).toEqual(200);
          expect(response.data).toEqual('500');
        });
        test('cityCodeがないと500', async () => {
          const query = new URLSearchParams({
            prefCode: 'あいうえお',
          });
          const response = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query.toString()}`,
            { headers },
          );
          expect(response.status).toEqual(200);
          expect(response.data).toEqual('500');
        });
        test('配列は400', async () => {
          const query = new URLSearchParams({
            cityCode: '-',
            prefCode: ['1', '2'] as never,
          });
          const response = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query.toString()}`,
            { headers },
          );
          expect(response.status).toEqual(200);
          expect(response.data).toEqual('400');
        });
        test('配列は400', async () => {
          const query = new URLSearchParams({
            cityCode: '-',
            prefCode: ['1', '2'] as never,
          });
          const response = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query.toString()}`,
            { headers },
          );
          expect(response.status).toEqual(200);
          expect(response.data).toEqual('400');
        });
      });
    });
    test('not found', async () => {
      const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/pppppppppppp', {
        headers,
      });
      expect(response.status).toEqual(200);
      expect(response.data).toEqual({
        description: 'The requested URL /404 was not found on this server.',
        message: "404. That's an error.",
        statusCode: '404',
      });
    });
  });
});
