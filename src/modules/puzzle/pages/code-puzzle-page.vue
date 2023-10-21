<script setup>
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { inject, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const route = useRoute();
const puzzle = ref(null);

watch(
  () => route.params.testId,
  async () => {
    puzzle.value = await api.puzzle.getTestById(route.params.testId);
  }
);

const view = shallowRef();
const code = ref(`console.log('Hello, world!')`);
const extensions = [javascript(), oneDark];

const handleReady = (payload) => {
  view.value = payload.view;
};
</script>

<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>