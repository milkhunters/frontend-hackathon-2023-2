<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { inject, ref, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const route = useRoute();
const puzzle = ref(null);

watch(
  () => route.params.testId,
  async () => {
    const { succeed, content } = await api.testing.startPracTest(
      route.params.testId
    );
    if (succeed) puzzle.value = content;
  },
  { immediate: true }
);

const view = shallowRef();
const code = ref(`console.log('Hello, world!')`);
const extensions = [javascript(), oneDark];

const handleReady = (payload) => {
  view.value = payload.view;
};

const router = useRouter();
const error = ref(null);

const submitCodePuzzle = async () => {
  const { succeed, content } = await api.testing.endPracTest({
    id: puzzle.value.id,
    answer: code.value,
  });
  if (succeed) await router.push({ name: 'profile' });
  else error.value = content;
};

const clearError = () => {
  error.value = null;
};

watch(code, clearError);
</script>

<template>
  <default-layout v-if="puzzle">
    <div>{{ puzzle.description }}</div>

    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
    />

    <div v-if="error">{{ error }}</div>

    <button class="send_button" :disabled="error" @click="submitCodePuzzle">
      Send
    </button>
  </default-layout>
</template>

<style lang="css">
.send_button {
  width: 10%;
  border: 0;
  border-radius: 6px;
  height: 40px;
  max-height: 40px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background: #252d3e;
  color: rgb(255, 255, 255);
  margin-top: 24px;
  user-select: none;
}
</style>
