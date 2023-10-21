<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
});

defineEmits(['selected']);
</script>

<template>
  <div class="exam_quest">
    <p class="quest_name">
      <span class="quest_name_number">{{ id }}.</span>{{ title }}
    </p>
    <div class="quest_content">
      <div class="radio" v-for="answer in answers" :key="answer.id">
        <input
          class="custom-radio"
          type="radio"
          id="color-1"
          name="color"
          @change="$emit('selected', id, answer.id)"
          :value="answer.value"
        />
        <label for="color-1">{{ answer.text }}</label>
      </div>
    </div>
  </div>
</template>
