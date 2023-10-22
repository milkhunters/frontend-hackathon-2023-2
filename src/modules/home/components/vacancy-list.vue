<script setup>
import { computed, inject, reactive, ref, watchEffect } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

defineEmits(['selected']);

const api = inject(API_INJECTION_KEY);

const search = ref('');
const pagination = reactive({ page: 1, count: 5 });
const vacancies = ref(null);

const filteredVacancies = computed(() => {
  return (vacancies.value ?? []).filter(({ title }) => title.includes(search.value.trim()));
});

watchEffect(async () => {
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
  <div class="hr_wrapper">
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
    <div class="hr_vacancy_wrapper" v-if="filteredVacancies.length">
      Вакансии
      <div
        class="hr_vacancy"
        v-for="vacancy in filteredVacancies"
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
      </div>
    </div>
  </div>
</template>
