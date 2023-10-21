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
  email: 'asdas@milkhunters.ru',
  password: 'Qwerty123',
  passwordConfirmation: 'Qwerty123',
  firstName: 'asfdas',
  lastName: 'asdasd',
});

const errors = reactive({
  email: null,
  password: null,
  passwordConfirmation: null,
  firstName: null,
  lastName: null,
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

const clearError = (field) => (errors[field] = null);

const api = inject(API_INJECTION_KEY);
const lang = useLanguage();

const validateError = (failed, error, message = error) => {
  errors[error] = failed ? lang.registration.error[message] : null;
};

const validateForm = () => {
  const fieldValidations = [
    {
      field: user.firstName,
      key: 'firstName',
      validation: api.validation.isNameValid,
    },
    {
      field: user.lastName,
      key: 'lastName',
      validation: api.validation.isNameValid,
    },
    {
      field: user.email,
      key: 'email',
      validation: api.validation.isEmailValid,
    },
    {
      field: user.password,
      key: 'password',
      validation: api.validation.isPasswordValid,
    },
  ];

  for (const { field, key, validation } of fieldValidations) {
    validateError(!validation(field), key);
  }

  validateError(
    user.password !== user.passwordConfirmation,
    'passwordConfirmation',
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
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    bio: '',
    password: user.password,
  });

  if (succeed) {
    registrationStore.email = user.email;
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
    <form :class="styles.form" @submit.prevent="trySignUp">
      <label for="first-name">Имя</label>
      <input
        :class="errors.firstName ? styles.error_field : styles.first_name"
        id="first-name"
        type="text"
        @input="clearError('firstName')"
        v-model="user.firstName"
        placeholder="Введите имя"
      />
      <span v-if="errors.firstName" :class="styles.error_message">{{
        errors.firstName
      }}</span>

      <label for="last-name">Фамилия</label>
      <input
        :class="errors.lastName ? styles.error_field : styles.last_name"
        id="last-name"
        type="text"
        @input="clearError('lastName')"
        v-model="user.lastName"
        placeholder="Введите фамилию"
      />
      <span v-if="errors.lastName" :class="styles.error_message">{{
        errors.lastName
      }}</span>

      <label for="email">Адрес электронной почты</label>
      <input
        :class="errors.email ? styles.error_field : styles.email"
        id="email"
        type="email"
        @input="clearError('email')"
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
        @input="clearError('password')"
        v-model="user.password"
        placeholder="Введите пароль"
      />
      <span v-if="errors.password" :class="styles.error_message">{{
        errors.password
      }}</span>

      <label for="password-confirm">Повторите пароль</label>
      <input
        :class="
          errors.passwordConfirmation
            ? styles.error_field
            : styles.password_confirm
        "
        id="password-confirm"
        type="password"
        @input="clearError('passwordConfirmation')"
        v-model="user.passwordConfirmation"
        placeholder="Повторите пароль"
      />
      <span v-if="errors.passwordConfirmation" :class="styles.error_message">{{
        errors.passwordConfirmation
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

.first_name,
.last_name,
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

.first_name:hover,
.last_name:hover,
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
