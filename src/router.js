import LoginPage from '@/modules/auth/pages/login-page.vue';
import RegistrationPage from '@/modules/auth/pages/registration-page.vue';
import ConfirmationPage from '@/modules/auth/pages/confirmation-page.vue';
import HomePage from '@/modules/home/pages/home-page.vue';
import ProfilePage from '@/modules/user/pages/profile-page.vue';
import { createRouter, createWebHistory } from 'vue-router';

const login = { permissions: [{ name: 'AUTHENTICATE', redirect: 'home' }] };
const register = { permissions: [{ name: 'CREATE_USER', redirect: 'login' }] };
const confirm = {
  permissions: [{ name: 'VERIFY_EMAIL', redirect: 'register' }],
};
const home = { state: { name: 'ACTIVE', redirect: 'login' } };
const profile = { state: { name: 'ACTIVE', redirect: 'login' } };

const routes = [
  { name: 'login', path: '/login', component: LoginPage, meta: login },
  {
    name: 'register',
    path: '/register',
    component: RegistrationPage,
    meta: register,
  },
  {
    name: 'confirm',
    path: '/confirm',
    component: ConfirmationPage,
    meta: confirm,
  },
  { name: 'home', path: '/', component: HomePage, meta: home },
  {
    name: 'profile',
    path: '/profile/:id',
    component: ProfilePage,
    meta: profile,
  },
];

const STATES = ['NOT_CONFIRMED', 'ACTIVE', 'BLOCKED', 'DELETED'];

export default (getPermissions, state) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(async (to) => {
    const routeMeta = to.meta;
    const permissions = getPermissions();

    for (const { name: permission, redirect } of routeMeta.permissions ?? []) {
      if (!permissions.includes(permission)) return { name: redirect };
    }

    const hasRequiredState =
      routeMeta.state == null ||
      routeMeta.state.name === STATES[state.value];

    if (!hasRequiredState) return { name: routeMeta.state.redirect };
  });

  return router;
};
