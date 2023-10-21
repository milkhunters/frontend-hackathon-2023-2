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
/* search */
.search_wrapper {
  display: flex;
}
#search {
  width: 100%;
  height: 40px;
  background: #fff;
  border: 1px solid #d2d2d2;
  font-size: 14px;
  color: #000;
  padding: 0 0 0 20px;
  border-radius: 8px;
  -webkit-transition: 0.2s ease;
  -moz-transition: 0.2s ease;
  -ms-transition: 0.2s ease;
  -o-transition: 0.2s ease;
  transition: 0.2s ease;
}

.hr_wrapper {
  max-width: 80%;
  width: 100%;
  margin: 10px auto;
}
.hr_add_button {
  background: none;
  border: 1px solid #d2d2d2;
  height: 40px;
  width: 40px;
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
/*
    Модальное окно для HR
*/
.modal_content_top {
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
}
.hr_change_button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  transform: rotate(90deg);
}
#hr_add_modal {
  z-index: 10;
}
#hr_add_modal label {
  margin-top: 12px;
  font-size: 15px;
  color: #6d6d6d;
}
#hr_add_modal input {
  font-size: 15px;
  color: #6d6d6d;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #6d6d6d;
  margin-top: 4px;
}
#hr_add_modal select {
  font-size: 15px;
  color: #6d6d6d;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #6d6d6d;
  margin-top: 4px;
}
.hr_view_modal_text {
  font-size: 15px;
}
.hr_view_modal_text span {
  color: #6d6d6d;
}
.hr_view_modal_tests_title {
  font-size: 17px;
  color: #000000;
  margin-top: 8px;
}
.hr_view_modal_test {
  margin-top: 6px;
  padding: 8px 18px;
  border-radius: 8px;
  background: #f5f5f5;
}
.hr_view_modal_test_name {
  font-size: 16px;
  color: #000000;
}
.hr_view_modal_test_type {
  font-size: 14px;
  color: #6d6d6d;
}
.modal_btn_red {
  background: red;
}
.modal_btn_red:hover {
  background: #c40000;
}
/*
    Вакансии HR
*/
.hr_vacancy_wrapper {
  align-items: center;
  margin-top: 30px;
}
.hr_vacancy {
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-radius: 25px;
  padding: 12px 24px;
  background: #f5f5f5;
  border: 1px solid black;
}
.hr_vacancy_item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.hr_vacancy_item_name {
  font-size: 18px;
  color: #000000;
}
.hr_vacancy_item_type {
  font-size: 14px;
  color: #6d6d6d;
}
.hr_vacancy_item_date {
  font-size: 16px;
  color: #6d6d6d;
}
.hr_view_button {
  background: #fff;
  height: 40px;
  border: 1px solid #ececec;
  width: 40px;
  text-align: center;
  margin-left: 24px;
  cursor: pointer;
  padding-bottom: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
}

/*
    МОДАЛЬНОЕ ОКНО
*/
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0; /* Начальная прозрачность для плавного появления */
  transition: opacity 0.3s; /* Добавляем плавную анимацию появления */
}

.modal-open {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1; /* Начальная прозрачность для плавного появления */
  transition: opacity 0.3s; /* Добавляем плавную анимацию появления */
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 95%;
  max-width: 450px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
.modal_title {
  font-size: 18px;
}
.modal_buttons {
  margin-top: 50px;
  align-self: flex-end;
}
.modal_btn_confirm {
  padding: 8px 16px;
  font-size: 15px;
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  background: #0b76ef;
  transition: .2s ease;
}
.modal_btn_confirm:hover {
  background: #0857b4;
}
.modal_btn_close {
  border: none;
  font-size: 15px;
  cursor: pointer;
  margin-right: 12px;
  padding: 4px 6px;
  background: none;
}

@media screen and (max-width: 915px) {
  .hr_wrapper, .exam_quest_wrapper, .admin_wrapper {
    max-width: 100% !important;
    width: 100% !important;
    margin: 60px 15px;
  }
}

</style>