import App from './App.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof App>;
type M = Meta<typeof App>;
const meta: M = {
  component: App,
  args: {},
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {};
