<script setup>
import VacancyDetails from '@/modules/home/components/vacancy-details.vue';
import VacancyList from '@/modules/home/components/vacancy-list.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showAll = ref(false);
const selectedId = ref(null);

const selectVacancy = (id) => {
  selectedId.value = id;
};

const goToTest = async (testId, type) => {
  const name = type === 0 ? 'test-puzzle' : 'code-puzzle';
  await router.push({ name, params: { testId } });
};
</script>

<template>
  <vacancy-list :show-all="showAll" @selected="selectVacancy" />
  <vacancy-details v-if="selectedId" :id="selectedId" @selected="goToTest" />
</template>
