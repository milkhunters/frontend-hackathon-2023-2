<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
import TestQuestion from '@/modules/puzzle/components/test-question.vue';
import { computed, inject, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const route = useRoute();

const puzzles = ref(null);
const answers = ref(null);
const error = ref(null);

const selectAnswer = (questionId, answerId) => {
  answers.value[questionId].answerOptionId = answerId;
  error.value = null;
};

const canEndTest = computed(() => {
  return (
    !error.value && answers.value != null && answers.value.every(({ answerId }) => answerId)
  );
});

watch(
  () => route.params.testId,
  async () => {
    if (route.params.testId == null) return;

    const { succeed, content } = await api.testing.startTheoTest(
      route.params.testId
    );

    if (!succeed) return;

    puzzles.value = content;
    answers.value = content.map(({ id }) => ({
      questionId: id,
      answerOptionId: null,
    }));
  },
  { immediate: true }
);

const router = useRouter();

const endTest = async () => {
  if (!canEndTest.value) {
    error.value = 'Нельзя завершить тест';
    return;
  }

  const { succeed } = await api.testing.endTheoTest({
    id: route.params.testId,
    answers: answers.value,
  });
  if (succeed) await router.push({ name: 'profile' });
};
</script>

<template>
  <default-layout v-if="puzzles">
    <div class="exam_quest_wrapper">
      <test-question
        v-for="(question, index) in puzzles"
        :key="question.id"
        :id="index"
        :title="question.content"
        :answers="question.answerOptions"
        @selected="selectAnswer"
      />

      <span v-if="error">{{ error }}</span>
      <button
        class="openModalBtn exam_send_btn"
        v-else
        @click="endTest"
      >
        Отправить результаты
      </button>
    </div>
  </default-layout>
</template>
