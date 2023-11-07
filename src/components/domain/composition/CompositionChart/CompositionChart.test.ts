import { render } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './CompositionChart.stories';
import { userEvent } from '@storybook/testing-library';

const { Default, 未選択 } = composeStories(stories);

test('Radioの切り替えが出来る', async () => {
  const container = render(Default());
  const 老年人口Radio = container.getByRole<HTMLInputElement>('radio', { name: '老年人口' });
  expect(老年人口Radio.checked).toBeFalsy();
  await userEvent.click(老年人口Radio);
  expect(老年人口Radio.checked).toBeTruthy();
});

test('選択していない時はメッセージが表示される', () => {
  const { container } = render(未選択());
  expect(container).toHaveTextContent('都道府県を選択してください');
});
