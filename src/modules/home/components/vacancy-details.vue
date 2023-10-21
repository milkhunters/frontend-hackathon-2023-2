<script setup>
import { computed, inject, onMounted, ref } from 'vue';
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

onMounted(async () => {
  const testsResult = await api.testing.getTestsForVacancy({
    vacancyId: props.id,
  });
  if (!testsResult.succeed) return;
  const testAttemptsRequests = testsResult.content.map((test) =>
    api.testing.getTestAttempts(test.id)
  );
  const testAttempts = await Promise.all(testAttemptsRequests);
  const succeed = testAttempts.every(({ succeed }) => succeed);
  if (!succeed) return;
  tests.value = testAttempts.map(({ content }) => {
    const passed = content.percent >= content.test.correctPercent;
    return { ...content.test, passed };
  });
});
</script>

<template>
  <p class="hr_vacancy_item_name">{{ completition }}</p>
  <div class="hr_vacancy_wrapper" v-if="tests.length">
    <div class="hr_vacancy" v-for="test in leftTests" :key="test.id">
      <div class="hr_vacancy_item">
        <div class="hr_vacancy_item_content">
          <p class="hr_vacancy_item_name">{{ test.title }}</p>
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
