import { render, screen } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './Section.stories';

const { Default } = composeStories(stories);

describe('Section', () => {
  test('ここにテストを書く', () => {
    render(Default({ title: 'aiueo' }));
    const section = screen.getByRole('region', { name: 'aiueo' });
    expect(section).toBeInTheDocument();
  });
});
