<script setup>
import VacancyList from '@/modules/home/components/vacancy-list.vue';
</script>

<template>
  <vacancy-list @selected="$router.push({ name: 'login' })" />
</template>
