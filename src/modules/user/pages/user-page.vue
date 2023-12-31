<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import { useMutation } from '@/composables/use-mutation';
import { API_INJECTION_KEY } from '@/keys';
import { useCurrentUserStore } from '@/stores/current-user';

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const api = inject(API_INJECTION_KEY);

const showSettings = ref(false);
const newUser = reactive({
  firstName: '',
  lastName: '',
});
const currentUserStore = useCurrentUserStore();

const updateUserMutation = useMutation(api.user.updateUser);

const tryUpdateUser = async () => {
  const response = await updateUserMutation.mutate({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });
  if (response.succeed) {
    await currentUserStore.fetch();
    showSettings.value = false;
  }
};

const resumeInput = ref(null);

const tryUpdatePdf = async () => {
  if (!resumeInput.value) return;
  const file = resumeInput.value.files[0];
  if (!file) return;
  const { succeed } = await api.user.updateUserDocument({ file });
  if (succeed) showSettings.value = false;
};

const resumeDownloadLink = ref(null);

onMounted(async () => {
  const { succeed, content } = await api.user.getUserDocument();
  if (succeed) resumeDownloadLink.value = content.documentUrl;
});
</script>

<template>
  <main class="main">
    <div class="candidates_wrapper">
      <div class="candidates-content">
        <div class="modal_content_top">
          <p class="modal_title">Профиль</p>
          <button
            class="openModalBtn hr_change_button"
            data-modal="can_change_modal"
            @click="showSettings = !showSettings"
          >
            &#x270E;
          </button>
        </div>
        <p class="hr_view_modal_text">
          <span class="hr_view_modal_text_left">Фамилия: </span
          >{{ currentUserStore.user.firstName }}
        </p>
        <p class="hr_view_modal_text">
          <span class="hr_view_modal_text_left">Имя: </span>{{ currentUserStore.user.lastName }}
        </p>
        <p class="hr_view_modal_text">
          <span class="hr_view_modal_text_left">Резюме: 
            <a v-if="resumeDownloadLink" :href="resumeDownloadLink" download>Скачать</a>
          </span>
        </p>
      </div>
    </div>
  </main>

  <div id="can_change_modal" :class="showSettings ? 'modal-open' : 'modal'">
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">Редактировать профиль</p>
      </div>
      <label for="fam_profile">Фамилия</label>
      <input
        name="fam_profile"
        id="fam_profile"
        placeholder="Фамилия"
        v-model="newUser.firstName"
        type="text"
      />
      <label for="name_profile">Имя</label>
      <input
        name="name_profile"
        id="name_profile"
        placeholder="Имя"
        v-model="newUser.lastName"
        type="text"
      />

      <div class="modal_buttons">
        <button @click="tryUpdateUser" class="modal_btn_confirm">
          Изменить ФИO
        </button>
      </div>

      <label for="resume_profile">Ваше резюме</label>
      <input type="file" accept="pdf" id="resume_profile" name="resume_profile" ref="resumeInput" />

      <div class="modal_buttons">
        <button @click="tryUpdatePdf" class="modal_btn_confirm">
          Изменить резюме
        </button>
        <button @click="showSettings = false" class="modal_btn_close">
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import '@/styles/layout.css';
</style>
