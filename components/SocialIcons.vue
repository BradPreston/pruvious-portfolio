<script setup lang="ts">
import type { Icon } from "~/.pruvious";

defineProps<{
  socialMedia: {
    icon: Icon | null;
    link: string;
    title: string;
  }[];
}>();
</script>

<template>
  <ul v-if="socialMedia.length" class="social-list">
    <li v-for="{ icon, link, title } of socialMedia" :key="title" class="social-item">
      <a
        :href="link"
        :title="title"
        rel="noopener noreferrer nofollow"
        target="_blank"
        class="flex h-5 w-5 rounded-full bg-copy text-white transition dark:bg-white dark:text-heading"
      >
        <PruviousIcon :icon="icon" class="social-icon" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
.social-list {
  display: flex;
  gap: 1em;
  list-style: none;
}

.social-icon {
  width: 25px;
  height: 25px;
  fill: var(--text);
  stroke: var(--text);
  transition: var(--transition);
}

.social-item a:hover .social-icon {
  fill: var(--primary);
  stroke: var(--primary);
}
</style>
