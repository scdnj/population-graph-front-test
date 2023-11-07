import { render } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './PrefecturesCompositionViewer.stories';
import userEvent from '@testing-library/user-event';
import { Api } from '@/scripts/Api';

jest.mock('@/scripts/Api');

const { Default } = composeStories(stories);

test('Radioの切り替えが出来る', async () => {
  const container = render(Default());
  await jest.advanceTimersByTimeAsync(1);
  const checkbox = container.getByRole('checkbox', { name: '東京都' });
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('ロードに時間のかかる関数の場合、checkboxがloading状態になる', async () => {
  jest.spyOn(Api.prototype, 'getComposition').mockImplementation(async () => {
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve('' as never);
      }, 10000),
    );
  });

  const container = render(Default());
  await jest.advanceTimersByTimeAsync(1);
  const checkbox = container.getByLabelText('東京都');
  await userEvent.click(checkbox);
  // loading状態であることを確かめるテストをうまく思いつけなかったので一旦inlineSnapshotで対応
  expect(checkbox).toMatchInlineSnapshot(`
    <input
      class="opacity-0 w-0 h-0"
      disabled=""
      type="checkbox"
    />
  `);
});
