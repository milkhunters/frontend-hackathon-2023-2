<script setup>
import {inject, onMounted, ref, watch} from 'vue';
import { API_INJECTION_KEY } from '@/keys';

const api = inject(API_INJECTION_KEY);
const users = ref(null);
const currentUser = ref(null);

const getUser = async (id) => {
  const { succeed, content } = await api.user.getUserById(id);
  if (!succeed) return null;
  currentUser.value = content;
};

onMounted(async () => {
  const { succeed, content } = await api.testing.getApprovedUsers();
  if (succeed) users.value = content;
});


</script>

<template>
  <table class="table">
    <thead>
    <tr>
      <th><abbr title="Position">№</abbr></th>
      <th>ФИО</th>
      <th>На вакансию</th>
      <th>Стажер/Практик</th>
    </tr>
    </thead>

    <tfoot>
    <tr>
      <th><abbr title="Position">№</abbr></th>
      <th>ФИО</th>
      <th>На вакансию</th>
      <th>Стажер/Практик</th>
    </tr>
    </tfoot>

    <tbody>
    <tr v-for="(user, key) in users" :key="user.userId">
      {{ getUser(user['userId']) ? null : '' }}
      <ht>{{ key + 1 }}</ht>
      <th>{{ currentUser['firstName'] }} {{ currentUser['lastName'] }}</th>
      <td>{{ user['vacancyTitle'] }}</td>
      <td>{{ user['vacancyType'] ? 'Стажировка' : 'Практика' }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped lang="css">
.table {
  margin-top: 10px;
  width: 100%;
}
</style>
