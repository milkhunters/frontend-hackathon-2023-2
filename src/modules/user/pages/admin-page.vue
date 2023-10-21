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
@import "@/styles/layout.css";
</style>
