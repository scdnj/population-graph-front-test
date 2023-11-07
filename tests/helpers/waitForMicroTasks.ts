/**
 * vueのwatchや外部API取得の結果を待つための関数
 */
export const waitForMicroTasks = async () => {
  // なぜかこれが効く(fakeTimerを使っているいないにかかわらず)。理由はわからない。
  await jest.advanceTimersByTimeAsync(1);
};
