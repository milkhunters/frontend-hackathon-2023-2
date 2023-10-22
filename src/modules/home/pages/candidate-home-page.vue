<script setup>
import VacancyDetails from '@/modules/home/components/vacancy-details.vue';
import VacancyList from '@/modules/home/components/vacancy-list.vue';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const router = useRouter();

const showAll = ref(false);

const toggleShowAll = () => {
  showAll.value = !showAll.value;
};

const selectedId = ref(null);

const selectVacancy = (id) => {
  selectedId.value = id;
};

const goToFirstTest = async (vacancyId) => {
  const testResult = await api.testing.getTestsForVacancy({ vacancyId });
  if (!testResult.succeed || !testResult.content.length) return;
  const test = testResult.content[0];
  await goToTest(test.id, test.type);
};

const goToTest = async (testId, type) => {
  const name = type === 0 ? 'test-puzzle' : 'code-puzzle';
  await router.push({ name, params: { testId } });
};
</script>

<template>
  Показать все вакансии <input type="checkbox" @change="toggleShowAll" :checked="showAll">
  <vacancy-list :show-all="showAll" @selected="selectVacancy" @started-test="goToFirstTest" />
  <vacancy-details v-if="selectedId" :id="selectedId" @selected="goToTest" />
</template>
