import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

export const useGuestUserStore = defineStore('guest-user', () => {
  const api = inject(API_INJECTION_KEY);
  const permissions = ref(null);
  
  const fetch = async () => {
    const { succeed, content } = await api.role.getGuestPermissions();
    if (succeed) permissions.value = content;
  };

  return { permissions, fetch };
});
