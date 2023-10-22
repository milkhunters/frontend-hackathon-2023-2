<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div :class="styles.wrapper">
    <div :class="styles.inner">
      <header :class="styles.header">
        <span :class="styles.title">CareerCrafter ID</span>
        <span :class="styles.suptitle">{{ title }}</span>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style module="styles" lang="scss">
@import '@/styles/variables.scss';
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: $body-background-color;
}

.inner {
  border-radius: 20px;
  padding: 50px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  background: white;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    border-radius: 50px;
    width: 60px;
  }
}

.title {
  margin-top: 15px;
  font-weight: 600;
  font-size: 33px;
  line-height: 32px;
  text-align: center;
  word-break: normal;
  text-transform: none;
  white-space: normal;
  cursor: inherit;
}

.suptitle {
  margin: 8px;
  font-weight: 400;
  font-size: 17px;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-align: center;
  word-break: normal;
  text-decoration: none;
  text-transform: none;
  white-space: normal;
  color: #636d7e;
  cursor: inherit;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 450px;
  height: auto;
  //border: 1px solid black;
}

@media (max-width: 700px) {
  .wrapper {
    background-color: white;
  }
  .inner {
    width: 100%;
    box-shadow: none;
    padding: 20px;
    overflow-y: auto;
  }
  form {
    width: 100%;
  }
}
</style>
