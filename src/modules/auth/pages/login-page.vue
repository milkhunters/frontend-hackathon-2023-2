<script setup>
import AuthLayout from '@/modules/auth/layouts/auth-layout.vue';
import Spinner from '@/components/spinner.vue';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLanguage } from '@/composables/use-language';
import { API_INJECTION_KEY } from '@/keys';
import { useMutation } from '@/composables/use-mutation';

const router = useRouter();
const api = inject(API_INJECTION_KEY);
const lang = useLanguage();

const email = ref('ivanov@milkhunters.ru');
const password = ref('Qwerty123');
const error = ref(null);

const signInMutation = useMutation(api.auth.signIn);

const trySignIn = async () => {
  const { succeed } = await signInMutation.mutate({
    email: email.value,
    password: password.value,
  });
  if (succeed) await router.push({ name: 'home' });
  else error.value = lang.login.error;
};

const clearError = () => (error.value = null);

console.log('login');
</script>

<template>
  <auth-layout title="Войдите в свой аккаунт">
    <form @submit.prevent="trySignIn">
      <p :class="styles.error_message" v-if="error">{{ error }}</p>
      <label for="login">Адрес электронной почты</label>
      <input
        :class="styles.login"
        id="email"
        type="text"
        @input="clearError"
        v-model="email"
        placeholder="Введите адрес электронной почты"
      />

      <label for="login">Пароль</label>
      <input
        :class="styles.password"
        id="password"
        type="password"
        @input="clearError"
        v-model="password"
        placeholder="Введите пароль"
      />

      <button :class="styles.login_button" type="submit">
        <Spinner v-if="signInMutation.isLoading.value" />
        <template v-else>Войти</template>
      </button>

      <router-link :class="styles.to_register" to="register"
        >У меня нет аккаунта</router-link
      >
    </form>
  </auth-layout>
</template>

<style module="styles" lang="scss">
@import '@/styles/variables';

label {
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: rgb(6, 17, 35);
  margin-bottom: 4px;
  cursor: pointer;
  text-align: left;
}

.login,
.password {
  appearance: none;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  padding: 12px;
  border: 1px solid rgb(187, 191, 196);
  margin: 0 0 16px;
  display: block;
  width: 100%;
}

.login:hover,
.password:hover {
  border: 1px solid $primary-color;
}

.login_button {
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
  margin-top: 24px;
  user-select: none;
}

.to_register {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: rgb(0, 93, 255);
  margin-top: 24px;
  cursor: pointer;
}

.error_message {
  background: $danger-color;
  color: white;
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 14px;
  margin: 10px;
}
</style>
