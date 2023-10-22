<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

const props = defineProps({
  showAll: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['selected', 'started-test']);

const api = inject(API_INJECTION_KEY);

const pagination = reactive({ page: 1, count: 5 });

const vacancies = ref(null);
const enrolledVacancies = ref(null);

const showedVacancies = computed(() => {
  return props.showAll ? vacancies.value : enrolledVacancies.value;
});

const groupBy = (items, f) =>
  items.reduce((groups, item) => {
    const group = f(item);
    if (!groups[group]) groups[group] = [];
    groups[group].push(item);
    return groups;
  }, {});

const maxBy = (items, f) =>
  items.reduce((max, item) => (f(item) > f(max) ? item : max), items[0]);

watch(vacancies, async (newVacancies) => {
  const attemptsResult = await api.testing.getAllAttempts();
  if (!attemptsResult.succeed) return;
  const attemptsGrouped = groupBy(
    attemptsResult.content,
    ({ test }) => test.id
  );
  enrolledVacancies.value = Object.values(attemptsGrouped).map((attempts) => {
    const maxAttempt = maxBy(attempts, ({ percent }) => parseInt(percent));
    return newVacancies.find(({ id }) => id === maxAttempt.test.vacancyId);
  });
});

onMounted(async () => {
  const { succeed, content } = await api.vacancy.getAllVacancies(
    pagination.page,
    pagination.count
  );
  if (succeed) vacancies.value = content;
});

const canGoBack = computed(() => pagination.page > 1);

const nextPage = () => {
  pagination.page += 1;
};

const prevPage = () => {
  if (canGoBack.value) pagination.page -= 1;
};
</script>

<template>
  <div class="hr_wrapper" v-if="showedVacancies">
    <div class="search_wrapper">
      <input type="search" id="search" placeholder="Поиск..." />
      <button class="openModalBtn hr_add_button" @click="nextPage">+</button>
      <button
        class="openModalBtn hr_add_button"
        :disabled="!canGoBack"
        @click="prevPage"
      >
        -
      </button>
    </div>
    <div class="hr_vacancy_wrapper" v-if="showedVacancies">
      <div
        class="hr_vacancy"
        v-for="vacancy in showedVacancies"
        :key="vacancy.id"
        @click="$emit('selected', vacancy.id)"
      >
        <div class="hr_vacancy_item">
          <div class="hr_vacancy_item_content">
            <p class="hr_vacancy_item_name">{{ vacancy.title }}</p>
          </div>
          <p class="hr_vacancy_item_date">
            {{ new Date(vacancy.updatedAt).toLocaleDateString() }}
          </p>
        </div>
        <button
          @click.stop="$emit('started-test', vacancy.id)"
          class="openModalBtn hr_view_button"
          data-modal="hr_view_modal"
        >
          ->
        </button>
      </div>
    </div>
  </div>
</template>
