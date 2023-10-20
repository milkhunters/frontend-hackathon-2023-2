<template>
	<div :class="styles.wrapper">
		<button class="button is-loading is-primary" :class="styles.spinner"></button>
	</div>
</template>

<style module="styles" lang="scss">
@import '@/styles/variables.scss';

.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	z-index: 10;
}

.spinner {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
</style>