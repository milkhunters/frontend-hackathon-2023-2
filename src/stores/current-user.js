import { computed, inject, ref } from 'vue';
import { defineStore } from 'pinia';
import { API_INJECTION_KEY } from '@/keys';

export const useCurrentUserStore = defineStore('current-user', () => {
  const api = inject(API_INJECTION_KEY);

  const currentUser = ref(null);
  const guestPermissions = ref([]);

  const fetch = async () => {
    const [userResult, guestResult] = await Promise.all([
      api.user.getCurrentUser(),
      api.role.getGuestPermissions(),
    ]);
    if (userResult.succeed) currentUser.value = userResult.content;
    if (guestResult.succeed) guestPermissions.value = guestResult.content;
  };

  const permissions = 
    () => currentUser.value?.role?.permissions ?? guestPermissions.value ?? [];

  const state = computed(
    () => currentUser.value?.state ?? 0
  );

  return { user: currentUser, permissions, state, fetch };
});
