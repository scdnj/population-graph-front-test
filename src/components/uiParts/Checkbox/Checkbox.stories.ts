import Checkbox from './Checkbox.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof Checkbox>;
type M = Meta<typeof Checkbox>;
const meta: M = {
  component: Checkbox,
  args: {
    modelValue: false,
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    modelValue: true,
  },
};

export const Labeled: Story = {
  args: {
    modelValue: true,
    label: 'ラベルつき',
  },
};
