---
to: src/components/<%= name %>/<%= name %>.test.ts
---
import { render, screen } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './<%= name %>.stories';

const { Default } = composeStories(stories);

describe('<%= name %>', () => {
  test('ここにテストを書く', () => {
    render(Default());
    const checkbox = screen.getByText(/hello/);
    expect(checkbox).not.toBeNull();
  });
});
