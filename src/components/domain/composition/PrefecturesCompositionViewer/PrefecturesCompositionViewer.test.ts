import { render } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './PrefecturesCompositionViewer.stories';
import userEvent from '@testing-library/user-event';
import { Api } from '@/scripts/Api';
import { waitForMicroTasks } from 'tests/helpers/waitForMicroTasks';

jest.mock('@/scripts/Api');

const { Default } = composeStories(stories);

test('Radioの切り替えが出来る', async () => {
  const container = render(Default());
  await waitForMicroTasks();
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
  await waitForMicroTasks();
  const checkbox = container.getByLabelText('東京都');
  await userEvent.click(checkbox);
  await waitForMicroTasks();
  // loading状態であることを確かめるテストをうまく思いつけなかったので一旦inlineSnapshotで対応
  expect(checkbox).toMatchInlineSnapshot(`
    <input
      class="cursor-pointer opacity-0 w-0 h-0"
      disabled=""
      type="checkbox"
    />
  `);
});
