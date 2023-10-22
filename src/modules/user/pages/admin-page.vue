<script setup>
import { computed, inject, onMounted, ref } from 'vue';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);

const users = ref(null);

onMounted(async () => {
  const { succeed, content } = await api.user.getAllUsers();
  if (succeed) users.value = content;
});

const search = ref('');

const filteredUsers = computed(() => {
  if (!users.value) return [];
  return users.value.filter(
    ({ firstName, lastName }) =>
      firstName.includes(search.value) || lastName.includes(search.value)
  );
});

const selectedUser = ref(null);
const selectedRole = ref(null);

const getRoleIdByName = async (name) => {
  const { succeed, content } = await api.role.getAllRoles();
  if (!succeed) return;
  return content.filter(({ title }) => title === name)[0];
};

const saveRole = async () => {
  if (!selectedUser.value || !selectedRole.value) return;
  const role = await getRoleIdByName(selectedRole.value);
  const { succeed } = await api.user.updateUserRole({
    id: selectedUser.value,
    roleId: role.id,
  });
  if (succeed)
    users.value.find((user) => user.id === selectedUser.value).role.title =
      selectedRole.value;
  closeModal();
};

const showModal = ref(false);

const openModal = (userId) => {
  showModal.value = true;
  selectedUser.value = userId;
};

const closeModal = () => {
  showModal.value = false;
  selectedUser.value = null;
};
</script>

<template>
  <main class="main">
    <div class="admin_wrapper">
      <div class="search_wrapper">
        <input
          type="search"
          id="search"
          v-model="search"
          placeholder="Поиск..."
        />
      </div>
      <div class="table_wrapper">
        <table v-for="user in filteredUsers" :key="user.id" class="admin_table">
          <tr>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.role.title }}</td>
            <td>
              <button
                @click="openModal(user.id)"
                class="openModalBtn admin_settings"
                data-modal="myModal"
              >
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
      <select name="roles" id="role-select" v-model="selectedRole">
        <option :value="null">--Выберите роль--</option>
        <option value="Hr">HR</option>
        <option value="Admin">Администратор</option>
      </select>
      <div class="modal_buttons">
        <button @click="closeModal" class="modal_btn_close">Отмена</button>
        <button class="modal_btn_confirm" @click="saveRole">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import '@/styles/layout.css';
</style>
