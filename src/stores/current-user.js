import { computed, inject, ref } from 'vue';
import { defineStore } from 'pinia';
import { API_INJECTION_KEY } from '@/keys';

export const useCurrentUserStore = defineStore('current-user', () => {
  const api = inject(API_INJECTION_KEY);
  const user = ref(null);

  const permissions = computed(() => {
    return user.value?.role?.permissions ?? [];
  });

  const state = computed(() => {
    return user.value?.state ?? 0;
  });

  const fetch = async () => {
    const { succeed, content } = await api.user.getCurrentUser();
    if (succeed) user.value = content;
  };

  const signIn = async (data) => {
    const result = await api.auth.signIn(data);
    if (result.succeed) user.value = result.content;
    return result;
  };

  const signOut = async () => {
    user.value = null;
    return await api.auth.signOut();
  };

  return { user, permissions, state, fetch, signIn, signOut };
});
