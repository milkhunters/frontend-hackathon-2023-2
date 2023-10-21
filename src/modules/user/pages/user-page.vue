<script setup>

defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <main class="main">
    <div class="candidates_wrapper">
      <div class="candidates-content">
        <div class="modal_content_top">
          <p class="modal_title">Профиль</p>
          <button class="openModalBtn hr_change_button" data-modal="can_change_modal">&#x270E;
          </button>
        </div>
        <p class="hr_view_modal_text"><span class="hr_view_modal_text_left">Фамилия: </span>{{ user.firstName }}</p>
        <p class="hr_view_modal_text"><span class="hr_view_modal_text_left">Имя: </span>{{ user.lastName }}</p>
        <p class="hr_view_modal_text"><span class="hr_view_modal_text_left">О себе: </span>{{ user.bio }}</p>
        <p class="hr_view_modal_text"><span class="hr_view_modal_text_left">Резюме: </span> PDF File</p>
      </div>
    </div>
  </main>

  <div id="can_change_modal" class="modal">
    <div class="modal-content">
      <div class="modal_content_top">
        <p class="modal_title">Редактировать профиль</p>
      </div>
      <label for="fam_profile">Фамилия</label>
      <input name="fam_profile" id="fam_profile" placeholder="Фамилия" type="text">
      <label for="name_profile">Имя</label>
      <input name="name_profile" id="name_profile" placeholder="Имя" type="text">
      <label for="otch_profile">Отчество</label>
      <input name="otch_profile" id="otch_profile" placeholder="Отчество" type="text">
      <label for="name_profile">О себе</label>
      <input name="desc_profile" id="desc_profile" placeholder="О себе" type="text">
      <label for="phone_profile">Номер телефона</label>
      <input name="phone_profile" id="phone_profile" placeholder="Номер телефона" type="text">
      <label for="resume_profile">Ваше резюме</label>
      <input type="file" id="resume_profile" name="resume_profile" />

      <div class="modal_buttons">
        <button class="modal_btn_close">Отмена</button>
        <button class="modal_btn_confirm">Изменить</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import "@/styles/layout.css";
</style>