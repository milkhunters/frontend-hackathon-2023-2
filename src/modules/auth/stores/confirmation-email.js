import { defineStore } from 'pinia';
import { useStorage } from '@/composables/use-storage';
import { CONFIRM_EMAIL_LOCAL_STORAGE_KEY } from '@/keys';

export const useConfirmationEmailStore = defineStore("confirmation-email", () => {
  const email = useStorage(CONFIRM_EMAIL_LOCAL_STORAGE_KEY);
  return { email };
});
