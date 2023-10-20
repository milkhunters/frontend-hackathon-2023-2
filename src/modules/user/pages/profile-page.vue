<script setup>
import DefaultLayout from '@/layouts/default-layout.vue';
import { useCurrentUserStore } from '@/stores/current-user';

const { user } = useCurrentUserStore();
</script>

<template>
  <default-layout>
    <div :class="styles.profile">
      <div class="card">
        <div class="card-content">
          <div :class="[styles.media, 'media']">
            <div class="media-left">
              <figure class="image is-56x56">
                <img
                  :class="[styles.avatar, 'img is-rounded']"
                  src="https://leonardo.osnova.io/1232c2f0-0bcd-5561-9a17-b8a1d0edaef4/-/scale_crop/72x72/-/format/webp"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ user?.username }}</p>
              <p class="subtitle is-6">@{{ user?.username }}</p>
            </div>
            <div v-if="currentUser?.id === user?.id">
              <button :class="[styles.settings, 'button']">Настройки</button>
            </div>
          </div>
          <div class="content">
            <p :class="styles.about">Сингулярность ближе...</p>
            <time :class="styles.reg_date">
              <i :class="[styles.calendar, 'fi fi-rr-calendar']"></i>
              Регистрация: давно
            </time>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<style module="styles" scoped lang="scss">
// Profile
.profile {
  margin-top: 10px;
}

// Avatar
.avatar {
}

// About
.about {
  color: black;
  font-weight: 500;
  font-size: 18px;
}

// Settings
.media {
  display: flex;
  justify-content: space-between;
}

.settings {
  font-weight: 600;
}

/* RegDate */
.reg_date {
  display: flex;
  justify-content: left;
}

.calendar {
  display: flex;
  justify-content: left;
  margin-right: 5px;
}

/* Mobile Begin */
@media (max-width: 915px) {
  .about {
    font-size: 16px;
  }
  .settings {
    width: 100px;
    font-weight: 500;
    font-size: 19px;
  }
}
</style>
