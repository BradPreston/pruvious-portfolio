<script setup lang="ts">
import type { IButton } from "~/types";

defineProps<IButton>();
</script>

<template>
  <NuxtLink
    :to="href"
    :class="variant"
    class="button"
    :target="target"
  >
    <slot />
    <PruviousIcon
      v-if="icon"
      class="icon"
      :icon="icon"
      aria-hidden="true"
    />
    <span v-if="target === '_blank'" class="sr-only">(opens in new tab)</span>
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

.button:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
