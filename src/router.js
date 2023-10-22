import LoginPage from '@/modules/auth/pages/login-page.vue';
import RegistrationPage from '@/modules/auth/pages/registration-page.vue';
import ConfirmationPage from '@/modules/auth/pages/confirmation-page.vue';
import HomePage from '@/modules/home/pages/home-page.vue';
import NotFoundPage from '@/modules/home/pages/not-found-page.vue';
import ProfilePage from '@/modules/user/pages/profile-page.vue';
import TestPuzzleComponent from '@/modules/puzzle/pages/test-puzzle-page.vue';
import CodePuzzleComponent from '@/modules/puzzle/pages/code-puzzle-page.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useCurrentUserStore } from '@/stores/current-user';
import { useGuestUserStore } from '@/stores/guest-user';

const login = { permissions: [{ name: 'AUTHENTICATE', redirect: 'home' }] };
const register = { permissions: [{ name: 'CREATE_USER', redirect: 'login' }] };
const confirm = {
  permissions: [{ name: 'VERIFY_EMAIL', redirect: 'register' }],
};

const profile = { state: { name: 'ACTIVE', redirect: 'login' } };

const testPuzzle = { state: { name: 'ACTIVE', redirect: 'login' } };
const codePuzzle = testPuzzle;

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
  { name: 'home', path: '/', component: HomePage, meta: {} },
  {
    name: 'profile',
    path: '/profile',
    component: ProfilePage,
    meta: profile,
  },
  {
    name: 'test-puzzle',
    path: '/test-puzzle/:testId',
    component: TestPuzzleComponent,
    meta: testPuzzle,
  },
  {
    name: 'code-puzzle',
    path: '/code-puzzle/:testId',
    component: CodePuzzleComponent,
    meta: codePuzzle,
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: {},
  },
];

const STATES = ['NOT_CONFIRMED', 'ACTIVE', 'BLOCKED', 'DELETED'];

export default () => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  const currentUserStore = useCurrentUserStore();
  const guestUserStore = useGuestUserStore();

  router.beforeEach(async (to) => {
    await Promise.all([currentUserStore.fetch(), guestUserStore.fetch()]);

    const state = currentUserStore.state;
    const permissions =
      (state === 0
        ? guestUserStore.permissions
        : currentUserStore.permissions) ?? [];

    const routeMeta = to.meta;

    for (const { name: permission, redirect } of routeMeta.permissions ?? []) {
      if (!permissions.includes(permission)) return { name: redirect };
    }

    const hasRequiredState =
      routeMeta.state == null || routeMeta.state.name === STATES[state];

    if (!hasRequiredState) return { name: routeMeta.state.redirect };
  });

  return router;
};
