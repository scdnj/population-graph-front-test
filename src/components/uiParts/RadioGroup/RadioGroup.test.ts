import { render, screen } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './RadioGroup.stories';
import userEvent from '@testing-library/user-event';

const { Default } = composeStories(stories);

describe('RadioGroup', () => {
  test('radiogroupはradiogroupでありlabelから要素を取得出来る', () => {
    render(Default({ label: 'ラジオグループ' }));
    const checkbox = screen.getByRole('radiogroup', { name: 'ラジオグループ' });
    expect(checkbox).toBeInTheDocument();
  });
  test('optionがradioになる', () => {
    render(Default({ options: ['hello', 'world'], modelValue: 'world' }));
    const checkboxes = screen.getAllByRole('radio');
    expect(checkboxes[0]).toHaveAccessibleName('hello');
    expect(checkboxes[1]).toHaveAccessibleName('world');
  });
  test('modelValueと一致するradioがcheckされている', () => {
    render(Default({ options: ['hello', 'world'], modelValue: 'world' }));
    const checkbox = screen.getByRole('radio', { name: 'world' });
    expect(checkbox).toBeChecked();
  });
  test('クリックしたら切り替わる', async () => {
    render(Default({ options: ['hello', 'world'], modelValue: 'hello' }));
    const hello = screen.getByRole('radio', { name: 'hello' });
    expect(hello).toBeChecked();
    const world = screen.getByRole('radio', { name: 'world' });
    expect(world).not.toBeChecked();
    await userEvent.click(world);
    expect(hello).not.toBeChecked();
    expect(world).toBeChecked();
  });
});
