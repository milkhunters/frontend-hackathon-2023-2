<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
import { useCurrentUserStore } from '@/stores/current-user';
import AdminPage from "@/modules/user/pages/admin-page.vue";
import HrPage from "@/modules/user/pages/hr-page.vue";
import UserPage from "@/modules/user/pages/user-page.vue";

const currentUserStore = useCurrentUserStore();
const role = currentUserStore.user?.role?.title;

</script>

<template>
  <default-layout>
    <div v-if="role === 'Admin'">
      <admin-page></admin-page>
    </div>
    <div v-else-if="role === 'Hr'">
      <hr-page></hr-page>
    </div>
    <div v-else-if="role === 'User'">
      <user-page :user="currentUserStore.user"></user-page>
    </div>
  </default-layout>
</template>

<style scoped lang="css">

</style>
