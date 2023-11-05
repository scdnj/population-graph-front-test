import Radio from './Radio.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof Radio>;
type M = Meta<typeof Radio>;

const meta: M = {
  component: Radio,
  args: {},
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
  args: {
    label: 'ラベル',
    modelValue: '',
  },
};

export const 選択済み: Story = {
  args: {
    label: 'ラベル',
    modelValue: 'ラベル',
  },
};
