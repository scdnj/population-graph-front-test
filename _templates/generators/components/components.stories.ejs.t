---
to: src/components/<%= name %>/<%= name %>.stories.ts
---
import <%= name %> from './<%= name %>.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof <%= name %>>;
type M = Meta<typeof <%= name %>>;

const meta: M = {
  component: <%= name %>,
  args: {
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {};
