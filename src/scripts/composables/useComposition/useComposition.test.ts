import { useComposition } from '.';
import { Api } from '@/scripts/Api';

jest.mock('@/scripts/Api');
jest.spyOn(Api.prototype, 'getPrefectures').mockResolvedValue([
  { prefCode: 15, prefName: '都道府県' },
  { prefCode: 151, prefName: 'aaaaa' },
]);

beforeEach(() => {
  jest.clearAllMocks();
});

it('fetchPrefecturesするとprefecturesに値が入る', async () => {
  const hook = useComposition();
  expect(hook.prefectures.value.length).toEqual(0);
  await hook.fetchPrefectures();
  expect(hook.prefectures.value).toEqual([
    { prefCode: 15, prefName: '都道府県' },
    { prefCode: 151, prefName: 'aaaaa' },
  ]);
});

it('prefecturesをcheckするとcompositionに値が入る', async () => {
  jest.spyOn(Api.prototype, 'getComposition').mockImplementation(async () => {
    return {
      総人口: [{ value: 1000, year: 1960 }],
      年少人口: [{ value: 100, year: 1960 }],
      生産年齢人口: [{ value: 10, year: 1960 }],
      老年人口: [{ value: 1, year: 1960 }],
    };
  });
  const hook = useComposition();

  await hook.fetchPrefectures();
  const prefCode = 15;
  expect(hook.compositions.value.length).toBe(0);

  hook.checkedPrefectures.value[prefCode] = true;
  // 1ms待たないとcompositionに値が入らない
  await jest.advanceTimersByTimeAsync(1);

  expect(hook.compositions.value).toEqual([
    {
      composition: {
        総人口: [{ value: 1000, year: 1960 }],
        年少人口: [{ value: 100, year: 1960 }],
        生産年齢人口: [{ value: 10, year: 1960 }],
        老年人口: [{ value: 1, year: 1960 }],
      },
      prefName: '都道府県',
    },
  ]);
});

it('同じprefCodeを何度もチェックしても値を取得していたら再取得しない', async () => {
  const spy = jest.spyOn(Api.prototype, 'getComposition').mockImplementation(async () => {
    return {
      総人口: [{ value: 1000, year: 1960 }],
      年少人口: [{ value: 100, year: 1960 }],
      生産年齢人口: [{ value: 10, year: 1960 }],
      老年人口: [{ value: 1, year: 1960 }],
    };
  });
  const hook = useComposition();
  await hook.fetchPrefectures();
  const prefCode = 15;
  expect(spy).not.toHaveBeenCalled();
  hook.checkedPrefectures.value[prefCode] = true;
  await jest.advanceTimersByTimeAsync(1);
  expect(spy).toHaveBeenCalledTimes(1);
  hook.checkedPrefectures.value[prefCode] = false;
  await jest.advanceTimersByTimeAsync(1);
  hook.checkedPrefectures.value[prefCode] = true;
  await jest.advanceTimersByTimeAsync(1);
  expect(spy).toHaveBeenCalledTimes(1);
});

it('二回目のチェックでも人口に値が入っている', async () => {
  jest.spyOn(Api.prototype, 'getComposition').mockImplementation(async () => {
    return {
      総人口: [{ value: 1000, year: 1960 }],
      年少人口: [{ value: 100, year: 1960 }],
      生産年齢人口: [{ value: 10, year: 1960 }],
      老年人口: [{ value: 1, year: 1960 }],
    };
  });
  const hook = useComposition();
  await hook.fetchPrefectures();
  const prefCode = 15;
  hook.checkedPrefectures.value[prefCode] = true;
  await jest.advanceTimersByTimeAsync(1);
  hook.checkedPrefectures.value[prefCode] = false;
  await jest.advanceTimersByTimeAsync(1);
  hook.checkedPrefectures.value[prefCode] = true;
  await jest.advanceTimersByTimeAsync(1);
  expect(hook.compositions.value).toEqual([
    {
      composition: {
        総人口: [{ value: 1000, year: 1960 }],
        年少人口: [{ value: 100, year: 1960 }],
        生産年齢人口: [{ value: 10, year: 1960 }],
        老年人口: [{ value: 1, year: 1960 }],
      },
      prefName: '都道府県',
    },
  ]);
});

it('APIの応答が遅いときはcheckedのstateがloadingになる', async () => {
  jest.useFakeTimers();
  jest.spyOn(Api.prototype, 'getComposition').mockImplementation(async () => {
    await jest.advanceTimersByTimeAsync(10000);
    return {
      総人口: [{ value: 1000, year: 1960 }],
      年少人口: [{ value: 100, year: 1960 }],
      生産年齢人口: [{ value: 10, year: 1960 }],
      老年人口: [{ value: 1, year: 1960 }],
    };
  });
  const hook = useComposition();
  await hook.fetchPrefectures();
  const prefCode = 15;
  hook.checkedPrefectures.value[prefCode] = true;
  await jest.advanceTimersByTimeAsync(1);
  expect(hook.loadingCompositions.value[prefCode]).toEqual(true);
});

it('応答が返るとtrueになる', async () => {
  jest.useFakeTimers();
  jest.spyOn(Api.prototype, 'getComposition').mockImplementation(async () => {
    await jest.advanceTimersByTimeAsync(1);
    return {
      総人口: [{ value: 1000, year: 1960 }],
      年少人口: [{ value: 100, year: 1960 }],
      生産年齢人口: [{ value: 10, year: 1960 }],
      老年人口: [{ value: 1, year: 1960 }],
    };
  });
  const hook = useComposition();
  await hook.fetchPrefectures();
  const prefCode = 15;
  hook.checkedPrefectures.value[prefCode] = true;
  await jest.advanceTimersByTimeAsync(1);
  jest.runAllTimers();
  await jest.advanceTimersByTimeAsync(1);
  expect(hook.loadingCompositions.value[prefCode]).toEqual(false);
});

describe('チェックした順番通りにcompositionが並ぶ', () => {
  beforeEach(() => {
    jest.spyOn(Api.prototype, 'getPrefectures').mockResolvedValueOnce([
      { prefCode: 1, prefName: '1' },
      { prefCode: 2, prefName: '2' },
      { prefCode: 3, prefName: '3' },
      { prefCode: 4, prefName: '4' },
    ]);
  });
  test('昇順', async () => {
    const hook = useComposition();
    await hook.fetchPrefectures();
    for (const prefCode of [1, 2, 3, 4]) {
      hook.checkedPrefectures.value[prefCode] = true;
      await jest.advanceTimersByTimeAsync(1);
    }
    await jest.advanceTimersByTimeAsync(1);
    expect(hook.compositions.value.map((d) => d.prefName)).toEqual(['1', '2', '3', '4']);
  });
  test('降順', async () => {
    jest.useFakeTimers();
    const hook = useComposition();
    await hook.fetchPrefectures();
    for (const prefCode of [4, 3, 2, 1]) {
      hook.checkedPrefectures.value[prefCode] = true;
      await jest.advanceTimersByTimeAsync(1);
    }
    await jest.advanceTimersByTimeAsync(1);
    expect(hook.compositions.value.map((d) => d.prefName)).toEqual(['4', '3', '2', '1']);
  });
});
