import { watch, onUnmounted } from 'vue';

export const useListener = (target, event, cb) => {
  watch(target, (newTarget, _, onCleanup) => {
    if (!newTarget) return;
    newTarget.addEventListener(event, cb);
    onCleanup(() => newTarget.removeEventListener(event, cb));
  }, { immediate: true });

  onUnmounted(() => {
    if (target.value) target.value.removeEventListener(event, cb);
  });
};
