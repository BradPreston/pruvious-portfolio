<script setup lang="ts">
import type { Icon } from "~/.pruvious";

defineProps<{
  icon?: Icon;
  href?: string;
  target?: "_blank" | "_self";
  variant?: "primary" | "outline" | "link";
}>();
</script>

<template>
  <NuxtLink :to="href" :class="variant" class="button">
    <slot />
    <PruviousIcon v-if="icon" class="icon" :icon="icon" />
  </NuxtLink>
</template>

<style scoped>
.button {
  border-radius: 9999px;
  border: 2px solid var(--primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: var(--transition);
  font-weight: 500;
}

.button:hover {
  background: var(--primary-hover);
  color: var(--primary);
}

.primary {
  background: var(--primary);
  color: var(--bg);
}

.outline {
  color: var(--primary);
  background: var(--bg);
}

.link {
  border: none;
  padding: 0;
  display: flex;
  width: max-content;
  gap: 0.5rem;
  align-items: center;
  justify-content: left;
  color: var(--text);
  font-size: 1rem;
  font-weight: normal;

  .icon {
    fill: var(--text);
    width: 1.25rem;
    height: 1.25rem;
  }
}

.link:hover {
  color: var(--secondary);
  background: transparent;

  .icon {
    fill: var(--secondary);
  }
}
</style>
