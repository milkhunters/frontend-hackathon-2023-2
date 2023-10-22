<script setup>
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { API_INJECTION_KEY } from '@/keys';
import Spinner from '@/components/spinner.vue';

const api = inject(API_INJECTION_KEY);

const pagination = reactive({ page: 1, count: 100 });
const vacancies = ref(null);
const searchIsLoading = ref(false);
const modalIsLoading = ref(false);

const showModalView = ref(false);
const showModalAdd = ref(false);
const showModalTest = ref(false);
const showModalQuestion = ref(false);

const newVacancy = reactive({
  title: '',
  content: '',
  state: 1,
  type: null,
  testTime: '',
});

const currentVacancy = ref({});
const search = ref('');

// Testing
const newTest = reactive({
  title: '',
  content: '',
  type: '',
  correctPercent: '',
});

const question = ref('');
const answers = ref('');
const correctPos = ref('');

const testingId = ref(null);
const questionId = ref(null);

const selectVacancy = (vacancy) => {
  currentVacancy.value = vacancy;
  showModalTest.value = true;
};

const tryCreateTest = async () => {
  const { succeed, content } = await api.testing.createTest(
      currentVacancy.value.id,
      {
        title: newTest.title,
        content: newTest.content,
        type: newTest.type,
        correct_percent: newTest.correctPercent,
      }
  );

  if (succeed) {
    testingId.value = content.id;
    showModalTest.value = false;
    showModalQuestion.value = true;
  }
};

const tryCreateTheoreticalQuestion = async () => {
  const { succeed, content } = await api.testing.createTeoreticalQuestion(
      testingId.value,
      {
        content: question.value,
      }
  );

  if (!succeed) return;

  questionId.value = content.id;

  answers.value.split(',').map(async (answer, index) => {
    const isCorrect = index === correctPos.value - 1;
    const { succeed, content } = await api.testing.createTheoreticalQuestionOptions(questionId.value, {
      content: answer.trim(),
      is_correct: isCorrect,
    });
    if (succeed) {
      question.value = '';
      answers.value = '';
      correctPos.value = '';
    }
  });
};

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    const later = function () {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const handleSearchDebounced = debounce(async (searchValue) => {
  searchIsLoading.value = true;

  const { succeed, content } = await api.vacancy.getAllVacancies(
      pagination.page,
      pagination.count
  );
  const { succeed: privateSucceed, content: privateContent } =
      await api.vacancy.getAllVacancies(
          pagination.page,
          pagination.count,
          null,
          '0'
      );

  if (succeed && privateSucceed) {
    vacancies.value = [...content, ...privateContent];
  }

  searchIsLoading.value = false;
}, 300);

watch(search, () => {
  handleSearchDebounced(search.value);
});

const openVacancyItem = async (id) => {
  modalIsLoading.value = true;
  const { succeed, content } = await api.vacancy.getVacancyById(id);

  if (succeed) {
    currentVacancy.value = content;
  }

  modalIsLoading.value = false;
  showModalView.value = true;
};

const tryCreateVacancy = async () => {
  const { succeed, content } = await api.vacancy.newVacancy(newVacancy);

  if (succeed) {
    const { succeed, content } = await api.vacancy.getAllVacancies(
        pagination.page,
        pagination.count
    );
    const { succeed: privateSucceed, content: privateContent } =
        await api.vacancy.getAllVacancies(
            pagination.page,
            pagination.count,
            null,
            '0'
        );

    if (succeed && privateSucceed) {
      vacancies.value = [...content, ...privateContent];
    }

    showModalAdd.value = false;
  }
};

const tryUpdateVacancy = async (id) => {
  const { succeed, content } = await api.vacancy.updateVacancyById(id, {
    state: 0,
    ...currentVacancy,
  });

  if (succeed) {
    const { succeed, content } = await api.vacancy.getAllVacancies(
        pagination.page,
        pagination.count
    );
    const { succeed: privateSucceed, content: privateContent } =
        await api.vacancy.getAllVacancies(
            pagination.page,
            pagination.count,
            null,
            '0'
        );

    if (succeed && privateSucceed) {
      vacancies.value = [...content, ...privateContent];
    }

    showModalView.value = false;
  }
};

const tryDeleteVacancy = async (id) => {
  const { succeed, content } = await api.vacancy.deleteVacancyById(id);

  if (succeed) {
    const { succeed, content } = await api.vacancy.getAllVacancies(
        pagination.page,
        pagination.count
    );

    if (succeed) {
      vacancies.value = content;
    }

    showModalView.value = false;
  }
};

onMounted(async () => {
  const { succeed, content } = await api.vacancy.getAllVacancies(
      pagination.page,
      pagination.count
  );
  const { succeed: privateSucceed, content: privateContent } =
      await api.vacancy.getAllVacancies(
          pagination.page,
          pagination.count,
          null,
          '0'
      );

  if (succeed && privateSucceed) {
    vacancies.value = [...content, ...privateContent];
  }
});
</script>

<template>
  <main class="main">
    <div class="spinner" v-if="modalIsLoading">
      <spinner />
    </div>
    <div v-else class="hr_wrapper">
      <div class="search_wrapper">
        <input
            v-model="search"
            type="search"
            id="search"
            placeholder="Поиск..."
        />
        <button
            @click="showModalAdd = !showModalAdd"
            class="openModalBtn hr_add_button"
            data-modal="hr_add_modal"
        >
          +
        </button>
      </div>

      <div v-if="searchIsLoading" class="spinner">
        <spinner />
      </div>
      <div v-else class="hr_vacancy_wrapper">
        <div class="hr_vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
          <div @click="openVacancyItem(vacancy.id)" class="hr_vacancy_item">
            <div class="hr_vacancy_item_content">
              <p class="hr_vacancy_item_name">{{ vacancy.title }}</p>
              <button
                  @click.stop="selectVacancy(vacancy)"
                  class="button is-black create"
              >
                Создать тест
              </button>
            </div>
            <p>
              {{ vacancy.state ? 'Активна' : 'Снята с публикации' }}
            </p>
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

      <label for="hr_type">Тип</label>
      <select v-model="newVacancy.type" name="hr_type" id="hr_type">
        <option value="">--Выберите тип--</option>
        <option value="1">Стажировка</option>
        <option value="0">Практика</option>
      </select>

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

  <div id="hr_test_modal" :class="showModalTest ? 'modal-open' : 'modal'">
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">Создать тест для {{ currentVacancy.title }}</p>
      </div>

      <label for="name_hr">Название теста</label>
      <input
          v-model="newTest.title"
          name="desc_hr"
          id="name_hr"
          placeholder="Название"
          type="text"
      />

      <label for="desc_hr">Описание</label>
      <input
          v-model="newTest.content"
          name="desc_hr"
          id="desc_hr"
          placeholder="Описание"
          type="text"
      />

      <label for="hr_type">Тип</label>
      <select v-model="newTest.type" name="hr_type" id="hr_type">
        <option value="">--Выберите тип--</option>
        <option value="0">Теория</option>
        <option value="1">Практика</option>
      </select>

      <label for="desc_hr">Процент правильных ответов</label>
      <input
          v-model="newTest.correctPercent"
          name="desc_hr"
          id="desc_hr"
          placeholder="Время на прохождения теста"
          type="text"
      />

      <div class="modal_buttons">
        <button @click="showModalTest = false" class="modal_btn_close">
          Отмена
        </button>
        <button @click="tryCreateTest" class="modal_btn_confirm">
          Создать тест
        </button>
      </div>
    </div>
  </div>

  <div
      id="hr_question_modal"
      class="modal-questions"
      :class="showModalQuestion ? 'modal-open' : 'modal'"
  >
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">
          Создать вопросы для {{ currentVacancy.title }}
        </p>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th><abbr title="Position">№</abbr></th>
          <th>Вопрос</th>
          <th>Варианты Ответов</th>
          <th>Ответы</th>
        </tr>
        </thead>

        <tfoot>
        <tr>
          <th><abbr title="Position">№</abbr></th>
          <th>Вопрос</th>
          <th>Варианты ответов</th>
          <th>Ответ</th>
        </tr>
        </tfoot>

        <tbody>
        <tr>
          <th>1</th>
          <td><input v-model="question" placeholder="Введите вопрос" /></td>
          <td>
            <input v-model="answers" placeholder="Введите варианты ответов" />
          </td>
          <td>
            <input
                v-model="correctPos"
                placeholder="Введите номер правильного ответа"
            />
          </td>
        </tr>
        </tbody>
      </table>
      <div class="modal_buttons">
        <button @click="showModalQuestion = false" class="modal_btn_close">
          Отмена
        </button>
        <button @click="tryCreateTheoreticalQuestion" class="modal_btn_confirm">
          Добавить вопрос
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
        <span class="hr_view_modal_text_left">Тип: </span
        >{{ currentVacancy.type ? 'Стажировка' : 'Практика' }}
      </p>
      <p class="hr_view_modal_text">
        <span class="hr_view_modal_text_left">Описание: </span
        >{{ currentVacancy.content }}
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
        <button
            @click="tryUpdateVacancy(currentVacancy.id)"
            class="modal_btn_confirm modal_btn_red"
        >
          Снять с публикации
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import '@/styles/layout.css';

input {
  font-size: 15px;
  color: #6d6d6d;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #6d6d6d;
  margin-top: 4px;
}

.spinner {
  margin-top: 30px;
}

.create {
  margin: 15px 0;
  font-size: 14px;
}

.modal-questions {

}

.modal-content {

}
</style>
