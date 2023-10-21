import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@/composables/use-storage';
import { API_INJECTION_KEY, CONFIRM_EMAIL_LOCAL_STORAGE_KEY } from '@/keys';

export const useConfirmationStore = defineStore('confirmation', () => {
  const api = inject(API_INJECTION_KEY);

  const email = useStorage(CONFIRM_EMAIL_LOCAL_STORAGE_KEY, '');
  const password = ref('');

  const sendMail = async () => {
    return await api.auth.sendConfirmationMail({ email: email.value });
  };

  const sendCode = async (code) => {
    return await api.auth.confirmEmail({ email: email.value, code });
  };

  const clear = () => {
    email.value = '';
    password.value = '';
  };

  return { email, password, sendMail, sendCode, clear };
});
