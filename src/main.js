import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import createRouter from '@/router';
import api from '@/lib/api/http';
import { API_INJECTION_KEY } from '@/keys';
import './styles/bulma.scss';

const main = async () => {
  createApp(App)
    .provide(API_INJECTION_KEY, api)
    .use(createPinia())
    .use(createRouter())
    .mount('#app');
};

main();
