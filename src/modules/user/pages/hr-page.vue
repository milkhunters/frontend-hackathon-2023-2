<script setup>
import {ref} from "vue";

const showModalView = ref(false);
const showModalEdit = ref(false);

</script>

<template>
  <main class="main">
    <div class="hr_wrapper">
      <div class="search_wrapper">
        <input type="search" id="search" placeholder="Поиск..." />
        <button class="openModalBtn hr_add_button" data-modal="hr_add_modal">+</button>
      </div>
      <div class="hr_vacancy_wrapper">

        <div class="hr_vacancy">
          <div class="hr_vacancy_item">
            <div class="hr_vacancy_item_content">
              <p class="hr_vacancy_item_name">Название вакансии</p>
              <p class="hr_vacancy_item_type">Стажер</p>
            </div>
            <p class="hr_vacancy_item_date">21.10.23</p>
          </div>
          <button @click="showModalView = !showModalView" class="openModalBtn hr_view_button" data-modal="hr_view_modal">...</button>
        </div>

      </div>
    </div>
  </main>

  <div id="hr_add_modal" :class="showModalEdit ? 'modal-open' : 'modal'">
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">Создать вакансию</p>
      </div>
      <label for="name_hr">Название вакансии</label>
      <input name="desc_hr" id="name_hr" placeholder="Название" type="text">
      <label for="hr_type">Тип</label>
      <select name="hr_type" id="hr_type">
        <option value="">--Выберите тип--</option>
        <option value="dog">Стажер</option>
        <option value="cat">Практикант</option>
      </select>
      <label for="desc_hr">Описание</label>
      <input name="desc_hr" id="desc_hr" placeholder="Описание" type="text">

      <div class="modal_buttons">
        <button @click="showModalEdit = false" class="modal_btn_close">Отмена</button>
        <button class="modal_btn_confirm">Создать</button>
      </div>
    </div>
  </div>

  <div id="hr_view_modal" :class="showModalView ? 'modal-open' : 'modal'">
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">Название вакансии</p>
        <button @click="showModalEdit = !showModalEdit" class="openModalBtn hr_change_button" data-modal="hr_add_modal">&#x270E;
        </button>
      </div>
      <p class="hr_view_modal_text"><span class="hr_view_modal_text_left">Тип: </span>Cтажер</p>
      <p class="hr_view_modal_text"><span class="hr_view_modal_text_left">Описание: </span>Какое-то длинное описание</p>
      <p class="hr_view_modal_text"><span class="hr_view_modal_text_left">Дата создания: </span>21.10.23</p>
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
        <button @click="showModalView = false" class="modal_btn_close">Закрыть</button>
        <button class="modal_btn_confirm modal_btn_red">Снять с публикации</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import "@/styles/layout.css";
</style>