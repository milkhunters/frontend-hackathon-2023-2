<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
import GuestHomePage from '@/modules/home/pages/guest-home-page.vue';
import CandidateHomePage from '@/modules/home/pages/candidate-home-page.vue';
import { useCurrentUserStore } from '@/stores/current-user';

const currentUserStore = useCurrentUserStore();
const role = currentUserStore.user?.role?.title;
</script>

<template>
	<default-layout>
		<div :class="styles.wrapper">
			<main>
				<guest-home-page v-if="!role" />
				<candidate-home-page v-else-if="role === 'User'" />
			</main>
		</div>
	</default-layout>
</template>

<style module="styles" lang="scss">
@import '@/styles/variables';

// Wrapper
.wrapper {
	width: 100%;
	height: 100%;
}
</style>