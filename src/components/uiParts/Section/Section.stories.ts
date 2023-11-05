import Section from './Section.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof Section>;
type M = Meta<typeof Section>;

const meta: M = {
  component: Section,
  args: {},
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
  args: {
    title: 'タイトル',
  },
  render(args) {
    return {
      components: { Section },
      template: '<Section v-bind="args"><div>あああああああ</div></Section>',
      setup() {
        return { args };
      },
    };
  },
};
