import { Api, type ApiError, type Composition, type Prefecture } from '@/scripts/Api';
import { computed, readonly, ref, watch } from 'vue';

const handleError = (e: ApiError) => {
  window.alert(`エラーが発生しました: ${e.message}`);
  throw e;
};

export const useComposition = () => {
  const api = new Api();

  const prefectures = ref<Prefecture[]>([]);

  const checked = ref<{ [prefCode: number]: boolean }>({});

  const loadingCompositions = ref<{ [prefCode: number]: boolean }>({});

  const checkedArray = ref<number[]>([]);

  /**
   * 人口データを取得する。既に取得している場合は既に取得している値を、取得していない場合はAPIから取得する。
   * ただし、API取得中(短時間に二度叩かれる等)の場合はundefinedを返す。
   */
  const findComposition = async (prefCode: number) => {
    if (compositions.value[prefCode] !== undefined) {
      return compositions.value[prefCode];
    }
    if (loadingCompositions.value[prefCode] !== true) {
      loadingCompositions.value[prefCode] = true;

      try {
        return await api.getComposition(prefCode);
      } catch (e) {
        handleError(e as ApiError);
      } finally {
        loadingCompositions.value[prefCode] = false;
      }
    }
  };

  watch(
    // チェックがtrueのprefCodeの配列
    (): number[] =>
      Object.entries(checked.value)
        .filter(([, v]) => v)
        .map(([k]) => +k),
    async (newValue, oldValue) => {
      if (newValue.length > oldValue.length) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const prefCode = newValue.find((v) => !oldValue.includes(v))!;
        try {
          const composition = await findComposition(prefCode);
          if (composition !== undefined) {
            compositions.value[prefCode] = composition;
          }
          checkedArray.value.push(prefCode);
        } catch (e) {
          checked.value[prefCode] = false;
        }
      } else {
        const prefCode = oldValue.find((v) => !newValue.includes(v));
        checkedArray.value = checkedArray.value.filter((v) => v !== prefCode);
      }
    },
    { deep: true },
  );

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
    prefectures: readonly(prefectures),
    checkedPrefectures: checked,
    loadingCompositions,
  };
};
