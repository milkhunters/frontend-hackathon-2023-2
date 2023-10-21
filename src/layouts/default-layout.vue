<script setup>
import Spinner from '@/components/spinner.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@/composables/use-mutation';
import 'bulma/css/bulma.min.css';
import { useCurrentUserStore } from '@/stores/current-user';

const dropdownOpened = ref(false);

const closeUserDropdown = () => {
  dropdownOpened.value = false;
};

const toggleDropdown = () => {
  dropdownOpened.value = !dropdownOpened.value;
};

const currentUserStore = useCurrentUserStore();
const router = useRouter();
const logoutMutation = useMutation(currentUserStore.signOut);

const tryLogout = async () => {
  const { succeed } = await logoutMutation.mutate();
  if (succeed) await router.push({ name: 'login' });
};
</script>

<template>
  <div @click="closeUserDropdown" :class="styles.wrapper">
    <header :class="styles.header">
      <div :class="styles.header_container">
        <div :class="styles.header_layout">
          <div :class="styles.header_logo">
            <span :class="styles.title">CareerCrafter</span>
          </div>
          <div :class="styles.header_menu">
            <div class="image is-48x48">
              <div
                class="dropdown is-right"
                :class="{ 'is-active': dropdownOpened }"
              >
                <div class="dropdown-trigger">
                  <img
                    @click.stop="toggleDropdown"
                    class="is-rounded"
                    src="https://leonardo.osnova.io/1232c2f0-0bcd-5561-9a17-b8a1d0edaef4/-/scale_crop/72x72/-/format/webp"
                    alt="UserLogoHere"
                  />
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a href="#" class="dropdown-item"> Профиль </a>
                    <a href="#" class="dropdown-item"> Настройки </a>
                    <hr class="dropdown-divider" />
                    <a @click.stop="tryLogout" class="dropdown-item">
                      <Spinner v-if="logoutMutation.isLoading.value" />
                      <template v-else>Выйти</template>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div :class="styles.container">
      <div :class="styles.layout">
        <aside :class="styles.aside">
          <div :class="styles.items">
            <router-link to="/" v-slot="{ isActive }">
              <div :class="[styles.item, { [styles.active]: isActive }]">
                <i class="fi fi-rr-home"></i>
                <div :class="styles.name">Главная</div>
              </div>
            </router-link>
            <router-link to="/profile" v-slot="{ isActive }">
              <div :class="[styles.item, { [styles.active]: isActive }]">
                <i class="fi fi-rr-user"></i>
                <div :class="styles.name">Профиль</div>
              </div>
            </router-link>
          </div>
        </aside>
        <div :class="styles.slot">
          <slot></slot>
        </div>
        <footer :class="styles.footer">
          <div :class="styles.footer_inner">
            Условия предоставления услуг Политика конфиденциальности Политика в
            отношении файлов Cookie Специальные возможности Информация о рекламе
            Eщe
            <br />
            © 2023 MilkHunters Hackathon.
          </div>
        </footer>
      </div>
    </div>
    <div :class="styles.mobile_aside">
      <router-link to="/" v-slot="{ isActive }">
        <div
          :class="[styles.mobile_item, { [styles.mobile_active]: isActive }]"
        >
          <i class="fi fi-rr-home"></i>
        </div>
      </router-link>
      <router-link to="/profile" v-slot="{ isActive }">
        <div
          :class="[styles.mobile_item, { [styles.mobile_active]: isActive }]"
        >
          <i class="fi fi-rr-user"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style module="styles" lang="scss">
@import '@/styles/variables';

// Wrapper
.wrapper {
  width: 100%;
  height: 100vh;
  background: $body-background-color;
  position: relative;
}

// Header
.header {
  grid-area: header;
  height: 60px;
  border-bottom: 1px solid $hover-color;
  background: $header-color;
}

.header_layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $header-color;
  height: 100%;
}

.header_container {
  width: 1280px;
  margin: 0 auto;
  background: $header-color;
  height: 100%;
}

.header_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $header-color;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}

.title {
  font-size: 30px;
  font-weight: 700;
  margin-left: 10px;
  background: $header-color;
  color: black;
}

.header_menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $header-color;
}

.header_menu_item {
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  background: $header-color;
}

// Container
.container {
  width: 1280px;
  margin: 0 auto;
  height: calc(100% - 60px);
}

// Layout
.layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 120px;
  grid-template-areas:
    'aside main'
    'footer main';
  width: 100%;
  height: 100%;
}

// Aside
.aside {
  grid-area: aside;
  //border: 1px solid #252d3e;
}

.items {
  width: 250px;
  margin: 10px auto;
}

.item {
  display: flex;
  align-items: center;
  padding: 5px 20px;
  margin-top: 7px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  color: $primary-color;
}

.active {
  background: white;
  color: $primary-color;
  font-weight: 700;
  i {
    color: $primary-color;
  }
}

.item:hover {
  background: white;
  color: $primary-color;
}

.item:not(:last-child) {
  margin-bottom: 10px;
}

.name {
  margin-left: 12px;
}

// Footer
.footer {
  grid-area: footer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 10px;
  width: 320px;
  //border: 2px solid black;
  font-size: 12px;
}

.footer_inner {
  width: 220px;
}

// Slot
.slot {
  grid-area: main;
  height: 100%;
  //border: 1px solid black;
}

// Mobile Aside
.mobile_aside {
  display: none;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  border-top: 1px solid grey;
  background: white;
  z-index: 2;
  bottom: 0;
  height: 50px;
  width: 100%;
}

.mobile_item {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  color: black;
  i {
    font-size: 20px;
  }
}

.mobile_active {
  color: $primary-color;
  background: none;
}

// Media

// Widescreen Begin
@media (max-width: 1407px) {
}

// Desktop Begin
@media (max-width: 1285px) {
  .container,
  .header_container {
    width: 1023px;
  }

  .layout {
    grid-template-columns: 320px 703px;
  }

  .slot {
    margin-right: 10px;
  }

  .logo {
    font-size: 32px;
    width: 320px;
  }

  .footer {
    font-size: 11px;
  }
}

// Tablet Begin
@media (max-width: 1023px) {
  .container,
  .header_container {
    width: 100%;
  }

  .layout {
    grid-template-columns: 3fr 7fr;
  }

  .logo {
    font-size: 30px;
  }

  .view {
    margin-right: 10px;
  }

  .footer {
    font-size: 10px;
  }
}

// Mobile Begin
@media (max-width: 915px) {
  .mobile_aside {
    display: flex;
  }

  .aside,
  .header_menu,
  .footer {
    display: none;
  }

  .layout {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 120px;
    grid-template-areas:
      'main main'
      'main main';
  }

  .logo {
    font-size: 17px;
  }

  .header {
    padding-left: 10px;
  }

  .logo {
    font-size: 25px;
  }

  .mobile_sidebar {
    display: flex;
  }

  .slot {
    margin-right: 0;
    padding: 10px 10px 55px 10px;
  }
}
</style>
