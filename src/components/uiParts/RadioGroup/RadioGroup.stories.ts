import { ref } from 'vue';
import RadioGroup from './RadioGroup.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof RadioGroup>;
type M = Meta<typeof RadioGroup>;

const meta: M = {
  component: RadioGroup,
  args: {},
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
  args: {
    modelValue: 'ラベル1',
    options: ['ラベル1', 'ラベル2', 'ラベル3'],
    label: 'ラジオグループ',
  },
  render(args) {
    return {
      components: { RadioGroup },
      template: '<RadioGroup v-bind="args" v-model="modelValue" />',
      setup() {
        return { args, modelValue: ref(args.modelValue) };
      },
    };
  },
};
