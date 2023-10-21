<script setup>
import { inject, ref, watch } from 'vue';
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
</script>

<template>
</template>