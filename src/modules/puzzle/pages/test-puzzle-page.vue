<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
import TestQuestion from '@/modules/puzzle/components/test-question.vue';
import { computed, inject, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const route = useRoute();
const puzzle = ref(null);
const answers = ref(null);

const selectAnswer = (questionId, answerId) => {
  answers.value[questionId].answerId = answerId;
};

const canEndTest = computed(() => {
  return (
    answers.value != null && answers.value.every(({ answerId }) => answerId)
  );
});

watch(
  () => route.params.testId,
  async () => {
    if (route.params.testId == null) return;

    const { succeed, content } = await api.puzzle.getTestPuzzleById(
      route.params.testId
    );

    if (!succeed) return;

    puzzle.value = content;
    answers.value = puzzle.value.questions.map((_) => ({ answerId: null }));
  },
  { immediate: true }
);

const router = useRouter();

const endTest = async () => {
  const { succeed } = await api.puzzle.submitTestPuzzle({
    id: puzzle.value.id,
    answers: answers.value,
  });
  if (succeed) await router.push({ name: 'profile' });
};
</script>

<template>
  <default-layout v-if="puzzle">
    <h1 class="exam_title">{{ puzzle.title }}</h1>
    <div class="exam_quest_wrapper">
      <test-question
        v-for="(question, index) in puzzle.questions"
        :key="question.id"
        :id="index"
        :title="question.title"
        :answers="question.answers"
        @selected="selectAnswer"
      />

      <button
        class="openModalBtn exam_send_btn"
        :disabled="!canEndTest"
        @click="endTest"
      >
        Отправить результаты
      </button>
    </div>
  </default-layout>
</template>
