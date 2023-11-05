import { render, screen } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './Radio.stories';

const { Default } = composeStories(stories);

describe('Radio', () => {
  test('ラベル名で要素が取れる', () => {
    render(Default({ label: 'ラベル', modelValue: '' }));
    const checkbox = screen.getByRole<HTMLInputElement>('radio', { name: 'ラベル' });

    expect(checkbox).toBeInTheDocument();
  });
  test('label === modelValueのとき、checked = true', () => {
    render(Default({ label: 'ラベル', modelValue: 'ラベル' }));
    const checkbox = screen.getByRole<HTMLInputElement>('radio', { name: 'ラベル' });

    expect(checkbox).toBeChecked();
  });
  test('label !== modelValueのとき、checked = false', () => {
    render(Default({ label: 'ラベル', modelValue: 'あああ' }));
    const checkbox = screen.getByRole<HTMLInputElement>('radio', { name: 'ラベル' });

    expect(checkbox).not.toBeChecked();
  });
});
