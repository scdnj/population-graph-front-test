import { within } from '@storybook/testing-library';
import PrefecturesCompositionViewer from './PrefecturesCompositionViewer.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { wait } from '@/scripts/util/wait';

type Story = StoryObj<typeof PrefecturesCompositionViewer>;
type M = Meta<typeof PrefecturesCompositionViewer>;
const meta: M = {
  component: PrefecturesCompositionViewer,
  args: {},
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {};

export const 選択済み: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    (await canvas.findByLabelText('北海道')).click();
    (await canvas.findByLabelText('東京都')).click();
    // 画面が更新されるまで待つ
    await wait(100);
  },
};
