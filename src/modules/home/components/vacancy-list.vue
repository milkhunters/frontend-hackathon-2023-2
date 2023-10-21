<script setup>
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

defineEmits(['selected']);

const api = inject(API_INJECTION_KEY);

const pagination = reactive({ page: 1, count: 10 });
const vacancies = ref(null);

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
  <div class="hr_wrapper" v-if="vacancies">
    <div class="search_wrapper">
      <input type="search" id="search" placeholder="Поиск..." />
      <button class="openModalBtn hr_add_button" @click="nextPage">+</button>
      <button class="openModalBtn hr_add_button" :disabled="!canGoBack" @click="prevPage">-</button>
    </div>
    <div class="hr_vacancy_wrapper">
      <div class="hr_vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
        <div class="hr_vacancy_item">
          <div class="hr_vacancy_item_content">
            <p class="hr_vacancy_item_name">{{ vacancy.title }}</p>
          </div>
          <p class="hr_vacancy_item_date">
            {{ new Date(vacancy.updatedAt).toLocaleDateString() }}
          </p>
        </div>
        <button
          @click="$emit('selected', vacancy.id)"
          class="openModalBtn hr_view_button"
          data-modal="hr_view_modal"
        >
          Откликнуться
        </button>
      </div>
    </div>
  </div>
</template>
