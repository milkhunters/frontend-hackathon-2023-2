import { ref, watch } from 'vue';

export const useStorage = (key, defaultValue = null, storage = localStorage) => {
  const cachedValue = storage.getItem(key);
  const value = cachedValue ? JSON.parse(cachedValue) : defaultValue;

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
