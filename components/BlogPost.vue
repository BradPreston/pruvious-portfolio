<script setup lang="ts">
import type { PopulatedFieldType } from "~/.pruvious";

defineProps<{
  post: Pick<PopulatedFieldType["posts"], "id" | "title" | "path" | "thumbnail" | "createdAt" | "tags">;
}>();

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
</script>

<template>
  <div class="post">
    <PruviousImage :image="post.thumbnail" class="image" />
    <div class="content">
      <h3 class="title">
        {{ post.title }}
      </h3>
      <p v-if="post.createdAt" class="date">
        {{ formatDate(post.createdAt) }}
      </p>
      <div class="tags">
        <Tag v-for="tag of post.tags" :key="tag.title" :title="tag.title" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  display: flex;
  gap: 1rem;
}

.image {
  max-width: 100px;
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
  font-size: 1.25rem;
  font-weight: normal;
  color: var(--text);
}

.date {
  color: var(--text);
  font-size: 1rem;
  margin: 0;
  margin-top: 0.5rem;
}

.tags {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
}
</style>
