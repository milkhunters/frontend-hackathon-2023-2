<script setup>
import VacancyList from '@/modules/home/components/vacancy-list.vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const router = useRouter();

const goToTest = async (vacancyId) => {
  const testResult = await api.testing.getTestsForVacancy({ vacancyId });
  if (!testResult.succeed || !testResult.content.length) return;
  const test = testResult.content[0];
  const name = test.type === 0 ? 'test-puzzle' : 'code-puzzle';
  await router.push({ name, params: { testId: test.id } });
};
</script>

<template>
  <vacancy-list @selected="goToTest" />
</template>
