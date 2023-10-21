<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
import { useCurrentUserStore } from '@/stores/current-user';
import { ref } from 'vue';

const { user } = useCurrentUserStore();
const role = user?.role?.title;
</script>

<template>
  <default-layout>
    <div>
      <main class="main">
        <div class="admin_wrapper">
          <div class="search_wrapper">
            <input type="search" id="search" placeholder="Поиск..." />
          </div>
          <div class="table_wrapper">
            <table class="admin_table">
              <tr>
                <td>Тузов Роман Александрович</td>
                <td>HR</td>
                <td>
                  <button
                    class="openModalBtn admin_settings"
                    data-modal="myModal"
                  >
                    &#9881;
                  </button>
                </td>
              </tr>
              <tr>
                <td>Иван Ваня Иванов</td>
                <td>Чел</td>
                <td>
                  <button
                    class="openModalBtn admin_settings"
                    data-modal="myModal1"
                  >
                    &#9881;
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </main>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <p class="modal_title">Выберите роль</p>
          <select name="roles" id="role-select">
            <option value="">--Выберите роль--</option>
            <option value="dog">HR</option>
            <option value="cat">Администратор</option>
          </select>
          <div class="modal_buttons">
            <button class="modal_btn_close">Отмена</button>
            <button class="modal_btn_confirm">Сохранить</button>
          </div>
        </div>
      </div>
      <div id="myModal1" class="modal">
        <div class="modal-content">
          <p class="modal_title">
            Вы уверены, что хотите отправить результаты? 2
          </p>
          <div class="modal_buttons">
            <button class="modal_btn_close">Отмена</button>
            <button class="modal_btn_confirm">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<style scoped lang="css">
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
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
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
  transition: 0.2s ease;
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

/*

    ADMIN PANEL

*/
.admin_wrapper {
  max-width: 80%;
  width: 100%;
  margin: 10px auto;
}
/* search */
.search_wrapper {
  display: block;
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
.table_wrapper {
  border: 1px solid #d2d2d2;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
}
.admin_table {
  width: 100%;
  border-collapse: collapse;
}
.admin_table td {
  padding: 15px;
  border: 1px solid #d2d2d2;
  white-space: nowrap;
}
.admin_table td:last-child {
  padding: 0;
}
.admin_settings {
  display: block;
  vertical-align: middle;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 18px;
}
#role-select {
  margin-top: 15px;
}
</style>
