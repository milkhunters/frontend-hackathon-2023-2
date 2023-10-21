<script setup>
import { inject, onMounted } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

defineEmits(['selected']);

const api = inject(API_INJECTION_KEY);
const vacancies = ref(null);

onMounted(async () => {
  const { succeed, content } = await api.vacancy.getAllVacancies();
  if (succeed) vacancies.value = content;
});
</script>

<template>
  <div class="hr_wrapper" v-if="vacancies">
    <div class="search_wrapper">
      <input type="search" id="search" placeholder="Поиск..." />
    </div>
    <div class="hr_vacancy_wrapper">
      <div class="hr_vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
        <div class="hr_vacancy_item">
          <div class="hr_vacancy_item_content">
            <p class="hr_vacancy_item_name">{{ vacancy.title }}</p>
          </div>
          <p class="hr_vacancy_item_date">{{ new Date(vacancy.updatedAt).toLocaleDateString() }}</p>
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
