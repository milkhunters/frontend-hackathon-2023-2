<script setup>
import { computed, inject, ref, watchEffect } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

defineEmits(['selected']);

const api = inject(API_INJECTION_KEY);
const tests = ref([]);

const passedTests = computed(() => tests.value.filter(({ passed }) => passed));
const leftTests = computed(() => tests.value.filter(({ passed }) => !passed));

const completition = computed(
  () => `${passedTests.value.length}/${tests.value.length}`
);

watchEffect(async () => {
  tests.value = [];
  const testsResult = await api.testing.getTestsForVacancy({
    vacancyId: props.id,
  });
  if (!testsResult.succeed) return;
  testsResult.content.map(async (test) => {
    const { succeed, content: attempts } = await api.testing.getTestAttempts(
      test.id
    );
    if (!succeed) return;
    if (!attempts.length) {
      tests.value.push({ ...test, passed: false, percent: 0 });
      return;
    }
    const maxAttempt = attempts.reduce(
      (max, curr) => (curr.percent > max.percent ? curr : max),
      attempts[0]
    );
    const passed = maxAttempt.percent >= test.correctPercent;
    tests.value.push({ ...test, passed, percent: maxAttempt.percent });
  });
});
</script>

<template>
  <p class="hr_vacancy_item_name">Тесты</p>
  <p class="hr_vacancy_item_name">{{ completition }}</p>
  <div class="hr_vacancy_wrapper" v-if="tests.length">
    <div class="hr_vacancy" v-for="test in leftTests" :key="test.id">
      <div class="hr_vacancy_item">
        <div class="hr_vacancy_item_content">
          <p class="hr_vacancy_item_name">{{ test.title }}</p>
          <p class="hr_vacancy_item_name">{{ test.percent }}</p>
        </div>
      </div>
      <button
        class="openModalBtn hr_view_button"
        data-modal="hr_view_modal"
        @click="$emit('selected', test.id, test.type)"
      >
        Пройти
      </button>
    </div>
  </div>
</template>
