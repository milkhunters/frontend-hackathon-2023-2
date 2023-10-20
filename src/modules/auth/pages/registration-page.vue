<script setup>
import AuthLayout from '@/modules/auth/layouts/auth-layout.vue';
import Spinner from '@/components/spinner.vue';
import { computed, inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useLanguage } from '@/composables/use-language';
import { useMutation } from '@/composables/use-mutation';
import { useConfirmationEmailStore } from '@/modules/auth/stores/confirmation-email';
import { API_INJECTION_KEY } from '@/keys';

const user = reactive({
  username: 'sadad',
  email: '@milkhunters.ru',
  password: 'Qwerty123',
  passwordConfirmation: 'Qwerty123',
});

const errors = reactive({
  username: null,
  email: null,
  password: null,
  passwordMatch: null,
});

const hasErrors = computed(() => {
  return Object.values(errors).some((error) => error !== null);
});

const hasEmpty = computed(() => {
  return Object.values(user).some((field) => field === '');
});

const canRegister = computed(() => {
  return !hasErrors && !hasEmpty;
});

const api = inject(API_INJECTION_KEY);
const lang = useLanguage();

const validateError = (failed, error, message = error) => {
  errors[error] = failed ? lang.registration.error[message] : null;
};

const validateForm = () => {
  validateError(
    !api.validation.isLoginValid(user.username) && user.username !== '',
    'username',
    'login'
  );

  validateError(
    !api.validation.isEmailValid(user.email) && user.email !== '',
    'email'
  );

  validateError(
    !api.validation.isPasswordValid(user.password) && user.password !== '',
    'password'
  );

  validateError(
    user.password !== user.passwordConfirmation && user.password !== '',
    'passwordMatch'
  );
};

const router = useRouter();
const registrationStore = useConfirmationEmailStore();
const signUpMutation = useMutation(api.auth.signUp);

const trySignUp = async () => {
  validateForm();
  if (canRegister.value) return;

  const { succeed, content } = await signUpMutation.mutate({
    username: user.username,
    email: user.email,
    password: user.password,
  });

  if (succeed) {
    registration.email.value = content;
    return await router.push({ name: 'confirm' });
  }

  if (typeof content === 'string') {
    if (content.split(' ').includes('email')) errors.email = content;
    else errors.username = content;
  } else {
    for (const [field, message] of Object.entries(content)) {
      errors[field] = message;
    }
  }
};
</script>

<template>
  <auth-layout :title="lang.registration.title">
    <form @submit.prevent="trySignUp">
      <label for="login">Имя пользователя</label>
      <input
        :class="errors.username ? styles.error_field : styles.username"
        id="login"
        type="text"
        @input="validateForm"
        v-model="user.username"
        placeholder="Введите имя пользователя"
      />
      <span v-if="errors.username" :class="styles.error_message">{{
        errors.username
      }}</span>

      <label for="email">Адрес электронной почты</label>
      <input
        :class="errors.email ? styles.error_field : styles.email"
        id="email"
        type="email"
        @input="validateForm"
        v-model="user.email"
        placeholder="Введите адрес электронной почты"
      />
      <span v-if="errors.email" :class="styles.error_message">{{
        errors.email
      }}</span>

      <label for="password">Пароль</label>
      <input
        :class="errors.password ? styles.error_field : styles.password"
        id="password"
        type="password"
        @input="validateForm"
        v-model="user.password"
        placeholder="Введите пароль"
      />
      <span v-if="errors.password" :class="styles.error_message">{{
        errors.password
      }}</span>

      <label for="password-confirm">Повторите пароль</label>
      <input
        :class="
          errors.passwordMatch ? styles.error_field : styles.password_confirm
        "
        id="password-confirm"
        type="password"
        @input="validateForm"
        v-model="user.passwordConfirmation"
        placeholder="Повторите пароль"
      />
      <span v-if="errors.passwordMatch" :class="styles.error_message">{{
        errors.passwordMatch
      }}</span>

      <button
        :class="styles.register_button"
        :disabled="canRegister"
        type="submit"
      >
        <Spinner v-if="signUpMutation.isLoading.value" />
        <template v-else>Зарегистрироваться</template>
      </button>

      <router-link :class="styles.to_login" to="login"
        >У меня есть аккаунт</router-link
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

.username,
.email,
.password,
.password_confirm {
  appearance: none;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  padding: 12px;
  border: 1px solid rgb(187, 191, 196);
  margin: 0 0 10px;
  display: block;
  width: 100%;
}

.username:hover,
.email:hover,
.password:hover,
.password_confirm:hover {
  border: 1px solid $primary-color;
}

.register_button {
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
  margin-top: 10px;
  user-select: none;
}

.register_button:disabled {
  background: rgb(187, 191, 196);
  cursor: not-allowed;
}

.to_login {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: rgb(0, 93, 255);
  margin-top: 24px;
  cursor: pointer;
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
</style>
