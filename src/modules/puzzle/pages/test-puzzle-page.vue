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

const submitTestModalOpened = ref(false);

const openModal = () => {
  submitTestModalOpened.value = true;
};

const closeModal = () => {
  submitTestModalOpened.value = false;
};

const router = useRouter();

const endTest = async () => {
  if (!canEndTest.value) return;
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
        @click="openModal"
      >
        Отправить результаты
      </button>
    </div>

    <Teleport to="body">
      <div id="myModal" class="modal" v-if="submitTestModalOpened">
        <div class="modal-content">
          <p class="modal_title">
            Вы уверены, что хотите отправить результаты?
          </p>
          <div class="modal_buttons">
            <button class="modal_btn_close" @click="closeModal">Отмена</button>
            <button class="modal_btn_confirm" @click="endTest">
              Отправить
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </default-layout>
</template>
