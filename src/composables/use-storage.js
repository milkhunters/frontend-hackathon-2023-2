import { ref, watch } from 'vue';

export const useStorage = (key, storage = localStorage) => {
  const cachedValue = storage.getItem(key);
  const defaultValue = cachedValue ? JSON.parse(cachedValue) : null;

  const storedValue = ref(defaultValue);

  watch(storedValue, () => {
    if (storedValue.value != null) {
      storage.setItem(key, JSON.stringify(storedValue.value));
    } else {
      storage.removeItem(key);
    }
  });

  return storedValue;
};
