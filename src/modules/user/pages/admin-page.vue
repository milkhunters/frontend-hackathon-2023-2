<script setup>

import {ref} from "vue";

const getUsers = () => {
  return [
    {
      id: '1',
      email: 'user1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: {
        id: '1',
        title: 'User',
        permissions: ['read'],
      },
      state: 0,
      created_at: '2023-10-21T10:15:02.398Z',
    },
    {
      id: '2',
      email: 'user2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: {
        id: '1',
        title: 'User',
        permissions: ['read'],
      },
      state: 0,
      created_at: '2023-10-21T10:15:02.398Z',
    },
    {
      id: '3',
      email: 'user3@example.com',
      firstName: 'Alice',
      lastName: 'Johnson',
      role: {
        id: '1',
        title: 'User',
        permissions: ['read'],
      },
      state: 0,
      created_at: '2023-10-21T10:15:02.398Z',
    },
  ];
};
const users = getUsers();

const showModal = ref(false);

</script>

<template>
  <main class="main">
    <div class="admin_wrapper">
      <div class="search_wrapper">
        <input type="search" id="search" placeholder="Поиск..." />
      </div>
      <div class="table_wrapper">
        <table v-for="user in users" :key="user.id" class="admin_table">
          <tr>
            <td>{{ user.firstName}} {{ user.lastName }}</td>
            <td>{{ user.role.title }}</td>
            <td>
              <button @click="showModal = !showModal" class="openModalBtn admin_settings" data-modal="myModal">
                &#9881;
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </main>

  <div id="myModal" :class="showModal ? 'modal-open' : 'modal'">
    <div class="modal-content">
      <p class="modal_title">Выберите роль</p>
      <select name="roles" id="role-select">
        <option value="">--Выберите роль--</option>
        <option value="dog">HR</option>
        <option value="cat">Администратор</option>
      </select>
      <div class="modal_buttons">
        <button @click="showModal = false" class="modal_btn_close">Отмена</button>
        <button class="modal_btn_confirm">Сохранить</button>
      </div>
    </div>
  </div>
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
