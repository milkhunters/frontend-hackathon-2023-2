import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import createRouter from '@/router';
import { useCurrentUserStore } from '@/stores/current-user';
import api from '@/lib/api/http';
import { API_INJECTION_KEY } from '@/keys';
import './styles/bulma.scss';

const main = async () => {
  const app = createApp(App)
    .provide(API_INJECTION_KEY, api)
    .use(createPinia());

  const { getPermissions, getState, fetch } = useCurrentUserStore();
  await fetch();

  app
    .use(createRouter(getPermissions, getState))
    .mount('#app');
};

main();
