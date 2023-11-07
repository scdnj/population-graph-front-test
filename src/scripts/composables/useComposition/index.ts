import { Api, type Composition, type Prefecture } from '@/scripts/Api';
import { computed, readonly, ref } from 'vue';

export const useComposition = () => {
  const api = new Api();

  const prefectures = ref<Prefecture[]>([]);

  const checked = ref<{ [prefCode: number]: boolean | 'loading' }>({});

  const checkedArray = computed(() => {
    return Object.entries(checked.value)
      .filter(([, v]) => v === true)
      .map(([k]) => +k);
  });

  const compositions = ref<{ [prefCode: number]: Composition }>({});

  const compositionAndNames = computed(
    (): Array<{ prefName: string; composition: Composition }> => {
      const checkedPrefectures = checkedArray.value
        .map((prefCode) => prefectures.value.find((p) => +p.prefCode === +prefCode))
        .filter((p): p is Prefecture => p !== undefined);

      return checkedPrefectures.map(({ prefName, prefCode }) => ({
        prefName,
        composition: compositions.value[prefCode] ?? {
          総人口: [],
          年少人口: [],
          生産年齢人口: [],
          老年人口: [],
        },
      }));
    },
  );

  return {
    async fetchPrefectures() {
      prefectures.value = await api.getPrefectures();
    },
    compositions: compositionAndNames,
    prefectures,
    checkedPrefectures: readonly(computed(() => checked.value)),
    setCheckedPrefectures: (prefCode: number, value: boolean) => {
      if (value) {
        if (compositions.value[prefCode] === undefined) {
          checked.value[prefCode] = 'loading';
          void api.getComposition(prefCode).then((composition) => {
            compositions.value[prefCode] = composition;
            checked.value[prefCode] = true;
          });
        } else {
          checked.value[prefCode] = true;
        }
      } else {
        checked.value[prefCode] = false;
      }
    },
  };
};
