import { useComposition } from '.';
import { wait } from '@/scripts/util/wait';
import { Api } from '@/scripts/Api';

jest.mock('@/scripts/Api');
jest.spyOn(Api.prototype, 'getPrefectures').mockResolvedValue([
  { prefCode: 15, prefName: '都道府県' },
  { prefCode: 151, prefName: 'aaaaa' },
]);

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
    return [
      { label: '総人口', data: [{ value: 1, year: 1960 }] },
      { label: 'あいうえお人口', data: [{ value: 1, year: 1960 }] },
    ];
  });
  const hook = useComposition();

  await hook.fetchPrefectures();
  const prefCode = 15;
  expect(hook.compositions.value.length).toBe(0);
  hook.checkedPrefectures.value[prefCode] = true;

  // 1ms待たないとcompositionに値が入らない
  await wait(1);

  expect(hook.compositions.value).toEqual([
    {
      composition: [
        { data: [{ value: 1, year: 1960 }], label: '総人口' },
        { data: [{ value: 1, year: 1960 }], label: 'あいうえお人口' },
      ],
      prefName: '都道府県',
    },
  ]);
});
