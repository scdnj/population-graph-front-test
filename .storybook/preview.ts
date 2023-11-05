import type { Preview } from '@storybook/vue3';
import '../src/tailwind.css';
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';

highchartsAccessibility(Highcharts);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
