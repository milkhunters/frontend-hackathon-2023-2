<script setup>
import { inject, markRaw, onMounted, reactive, ref } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);

const pagination = reactive({ page: 1, count: 100 });
const vacancies = ref(null);

onMounted(async () => {
  const { succeed, content } = await api.vacancy.getAllVacancies(
    pagination.page,
    pagination.count
  );
  if (succeed) vacancies.value = content;
});

const showModalView = ref(false);
const showModalAdd = ref(false);

const newVacancy = reactive({
  title: '',
  content: '',
  state: 0,
  testTime: '',
});

const currentVacancy = ref({});

const openVacancyItem = async (id) => {
  const { succeed, content } = await api.vacancy.getVacancyById(id);
  if (succeed) currentVacancy.value = content;
  showModalView.value = !showModalView.value;
};

const tryCreateVacancy = async () => {
  const { succeed, content } = await api.vacancy.newVacancy(newVacancy);
  if (succeed) {
    const { succeed, content } = await api.vacancy.getAllVacancies(
      pagination.page,
      pagination.count
    );
    if (succeed) vacancies.value = content;
    showModalAdd.value = false;
  }
};

const tryDeleteVacancy = async (id) => {
  const {succeed, content} = await api.vacancy.deleteVacancyById(id);
  if (succeed) {
    const { succeed, content } = await api.vacancy.getAllVacancies(
      pagination.page,
      pagination.count
    );
    if (succeed) vacancies.value = content;
    showModalView.value = false;
  }
}
</script>

<template>
  <main class="main">
    <div class="hr_wrapper">
      <div class="search_wrapper">
        <input type="search" id="search" placeholder="Поиск..." />
        <button
          @click="showModalAdd = !showModalAdd"
          class="openModalBtn hr_add_button"
          data-modal="hr_add_modal"
        >
          +
        </button>
      </div>

      <div class="hr_vacancy_wrapper">
        <div class="hr_vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
          <div @click="openVacancyItem(vacancy.id)" class="hr_vacancy_item">
            <div class="hr_vacancy_item_content">
              <p class="hr_vacancy_item_name">{{ vacancy.title }}</p>
            </div>
            <p class="hr_vacancy_item_date">
              {{ new Date(vacancy.createdAt).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div id="hr_add_modal" :class="showModalAdd ? 'modal-open' : 'modal'">
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">Создать вакансию</p>
      </div>

      <label for="name_hr">Название вакансии</label>
      <input
        v-model="newVacancy.title"
        name="desc_hr"
        id="name_hr"
        placeholder="Название"
        type="text"
      />

      <label for="desc_hr">Описание</label>
      <input
        v-model="newVacancy.content"
        name="desc_hr"
        id="desc_hr"
        placeholder="Описание"
        type="text"
      />

      <label for="desc_hr">Время на прохождение теста</label>
      <input
        v-model="newVacancy.testTime"
        name="desc_hr"
        id="desc_hr"
        placeholder="Время на прохождения теста"
        type="text"
      />

      <div class="modal_buttons">
        <button @click="showModalAdd = false" class="modal_btn_close">
          Отмена
        </button>
        <button @click="tryCreateVacancy" class="modal_btn_confirm">
          Создать
        </button>
      </div>
    </div>
  </div>

  <div id="hr_view_modal" :class="showModalView ? 'modal-open' : 'modal'">
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">{{ currentVacancy.title }}</p>
      </div>
      <p class="hr_view_modal_text">
        <span class="hr_view_modal_text_left">Тип: </span>Cтажер
      </p>
      <p class="hr_view_modal_text">
        <span class="hr_view_modal_text_left">Описание: </span
        >{{ currentVacancy.title }}
      </p>
      <p class="hr_view_modal_text">
        <span class="hr_view_modal_text_left">Дата создания: </span>
        {{ new Date(currentVacancy.createdAt).toLocaleDateString() }}
      </p>
      <p class="hr_view_modal_tests_title">Тесты</p>
      <div class="hr_view_modal_tests_wrapper">
        <div class="hr_view_modal_test">
          <p class="hr_view_modal_test_name">Название теста</p>
          <p class="hr_view_modal_test_type">Практикант</p>
        </div>
        <div class="hr_view_modal_test">
          <p class="hr_view_modal_test_name">Название теста</p>
          <p class="hr_view_modal_test_type">Практикант</p>
        </div>
      </div>
      <div class="modal_buttons">
        <button @click="showModalView = false" class="modal_btn_close">
          Закрыть
        </button>
        <button @click='tryDeleteVacancy(currentVacancy.id)' class="modal_btn_confirm modal_btn_red">
          Снять с публикации
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import '@/styles/layout.css';
</style>
