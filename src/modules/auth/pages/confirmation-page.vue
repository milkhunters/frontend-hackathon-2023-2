<script setup>
import AuthLayout from '@/modules/auth/layouts/auth-layout.vue';
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConfirmationEmailStore } from '@/modules/auth/stores/confirmation-email';
import { API_INJECTION_KEY } from '@/keys';
import { useLanguage } from '@/composables/use-language';

const REQUEST_TIMEOUT = 120000;

const api = inject(API_INJECTION_KEY);

const registrationStore = useConfirmationEmailStore();
const sendTimeout = ref(null);
const canSendMail = computed(() => registrationStore.email && !sendTimeout.value);

const sendMail = () => {
	if (!canSendMail.value) return;
	api.auth.sendConfirmationMail({ email: registrationStore.email.value });
	sendTimeout.value = setTimeout(() => (sendTimeout.value = null), REQUEST_TIMEOUT);
};

onMounted(sendMail);

const router = useRouter();
const code = ref('');
const errors = ref(null);

const canSendCode = computed(() => !errors.value && code.value !== '');

const lang = useLanguage();

const sendCode = async () => {
  if (!canSendCode) return;
	const { succeed } = await api.auth.confirmEmail({ email: registrationStore.email.value, code: code.value });
	if (succeed) await router.push({ name: 'login' });
	else errors.value = lang.confirm.error;
};
</script>

<template>
	<auth-layout :title="lang.confirm.title">
		<div :class="styles.wrapper">
			<span :class="styles.title">
				Мы отправили код на адрес: {{ registrationStore.email }}</span
			>
			<form @submit.prevent="sendCode">
				<label :class="styles.label">Код подтверждения</label>
				<input
					:class="errors ? styles.error_field : styles.code"
					type="text"
					v-model="code"
					placeholder="Введите код подтверждения"
				/>
				<span v-if="errors" :class="styles.error_message"> {{ errors }}</span>

				<button
					:class="styles.confirm_button"
					:disabled="!canSendCode"
					type="submit"
				>
					Подтвердить
				</button>
			</form>
			<button :class="styles.again_button" :disabled="!canSendMail" @click="sendMail">
				Отправить код еще раз
			</button>
		</div>
	</auth-layout>
</template>

<style module="styles" lang="scss">
@import '@/styles/variables';

.wrapper {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.title {
	width: 100%;
	text-align: center;
	margin: 15px 0;
	font-weight: 600;
}

.code {
	appearance: none;
	background-color: rgb(255, 255, 255);
	border-radius: 6px;
	color: rgb(0, 0, 0);
	font-size: 15px;
	padding: 12px;
	border: 1px solid rgb(187, 191, 196);
	margin: 0 0 5px;
	display: block;
	width: 100%;
}

.confirm_button {
	width: 100%;
	border: 0;
	border-radius: 6px;
	height: 40px;
	max-height: 40px;
	font-size: 16px;
	font-weight: 500;
	padding: 0 15px;
	cursor: pointer;
	background: $primary-color;
	color: rgb(255, 255, 255);
	margin: 15px 0;
	user-select: none;
}

.again_button {
	display: flex;
	justify-content: center;
	composes: confirm_button;
	height: auto;
	font-size: 14px;
	padding: 5px 15px;
	width: 50%;
}

.confirm_button:disabled,
.again_button:disabled {
	background: rgb(187, 191, 196);
	cursor: not-allowed;
}

.error_message {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	color: $danger-color;
	padding-bottom: 10px;
	border-radius: 50px;
	font-size: 14px;
	font-weight: 600;
	margin-bottom: 10px;
}

.error_field {
	appearance: none;
	background-color: rgb(255, 255, 255);
	border-radius: 6px;
	color: rgb(0, 0, 0);
	font-size: 15px;
	padding: 12px;
	margin: 0 0 10px;
	display: block;
	width: 100%;
	border: 1px solid $danger-color;
}

@media (max-width: 700px) {
	.again_button {
		font-size: 12px;
	}
}
</style>