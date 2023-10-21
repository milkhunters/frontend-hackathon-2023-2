<script setup>
import TestQuestion from '@/modules/puzzle/components/test-question';
import { computed, inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const route = useRoute();
const puzzle = ref(null);
const responses = ref(null);

const selectAnswer = (index, questionId, answerId) => {
  responses[questionId].responseId = answerId;
};

const canEndTest = computed(() => {
  return responses && responses.every(({ responseId }) => responseId);
});

watch(
  () => route.params.testId,
  async () => {
    if (route.params.testId) {
      puzzle.value = await api.puzzle.getTestById(route.params.testId);
      responses.value = puzzle.value.answers.map((_) => ({ responseId: null }));
    }
  }
);

const submitTestModalOpened = ref(false);

const openModal = () => {
  submitTestModalOpened.value = true;
};

const closeModal = () => {
  submitTestModalOpened.value = false;
};

const endTest = () => {
  if (!canEndTest.value) return;
  api.puzzle.submitTestPuzzle({
    id: puzzle.value.id,
    responses: responses.value,
  });
};
</script>

<template>
  <template v-if="puzzle">
    <h1 class="exam_title">puzzle.title</h1>
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
  </template>
</template>
