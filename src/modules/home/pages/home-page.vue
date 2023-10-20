<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
</script>

<template>
	<default-layout>
		<div :class="styles.wrapper">
			<main>main</main>
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