<script setup lang="ts">
import type { PopulatedFieldType } from "~/.pruvious";

defineProps<{
  item: Pick<PopulatedFieldType["portfolio"], "id" | "title" | "thumbnail" | "links" | "description" | "tags">;
}>();
</script>

<template>
  <div class="portfolio-item">
    <PruviousImage :image="item.thumbnail" :alt="item.thumbnail?.alt" class="image" />
    <div class="content">
      <h3 class="title">
        {{ item.title }}
      </h3>
      <PruviousHTML :html="item.description" class="description" />
      <div class="links">
        <Button
          v-for="link of item.links"
          :key="link.link"
          :href="link.link"
          :icon="link.icon!"
          variant="link"
          class="link"
        >
          {{ link.title }}
        </Button>
      </div>
      <div class="tags">
        <Tag v-for="tag of item.tags" :key="tag.title" :title="tag.title" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.portfolio-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image {
  aspect-ratio: 16/9;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  display: flex;
  flex-direction: column;
}

.title {
  margin: 0;
  line-height: 1.25rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: normal;
  color: var(--text);
}

.description > * {
  margin: 0;
  font-weight: normal;
  color: var(--text);
}

.description {
  margin-bottom: 0.5rem;
}

.links {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@container container (width > 450px) {
  .portfolio-item {
    flex-direction: row;
  }

  .image {
    max-width: 100px;
  }
}
</style>
