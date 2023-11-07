import { render, screen } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './Checkbox.stories';

const { Default } = composeStories(stories);

describe('Checkbox', () => {
  describe('modelValueとcheckedが連携している', () => {
    test.each([true, false].map((modelValue) => ({ modelValue })))('要素の値', ({ modelValue }) => {
      render(Default({ modelValue }));
      const buttonElement = screen.getByRole<HTMLInputElement>('checkbox');
      expect(buttonElement.checked).toBe(modelValue);
    });
  });
  describe('modelValueがloadingの時', () => {
    test('要素の値はfalse', () => {
      render(Default({ modelValue: true, loading: true }));
      const buttonElement = screen.getByRole<HTMLInputElement>('checkbox');
      expect(buttonElement).not.toBeChecked();
    });
    test('disabledになっている', () => {
      render(Default({ modelValue: true, loading: true }));
      const checkbox = screen.getByRole<HTMLInputElement>('checkbox');
      expect(checkbox).toBeDisabled();
    });
  });

  test('クリックでmodelValueをupdateするemitが発火する', () => {
    const spyFn = jest.fn();
    render(Default({ modelValue: false, 'onUpdate:model-value': spyFn }));
    screen.getByRole<HTMLInputElement>('checkbox').click();
    expect(spyFn).toHaveBeenCalledWith(true);
  });
  test('labelから探すことも出来る', () => {
    render(Default({ label: 'ラベル' }));
    const buttonElement = screen.getByLabelText<HTMLInputElement>('ラベル');
    expect(buttonElement).not.toBeNull();
  });
});
