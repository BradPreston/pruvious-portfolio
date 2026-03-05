<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <span class="tag">{{ title }}</span>
</template>

<style scoped>
.tag {
  background: var(--secondary-hover);
  color: var(--secondary);
  font-size: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}
</style>
