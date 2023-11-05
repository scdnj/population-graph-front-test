import { createApp } from 'vue';
import './style.css';
import './tailwind.css';
import App from './App.vue';
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';

highchartsAccessibility(Highcharts);
createApp(App).mount('#app');
