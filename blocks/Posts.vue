<script lang="ts" setup>
import { recordsField, textField } from "~/.pruvious";

defineProps({
  title: textField({ required: true }),
  anchorLink: textField({}),
  posts: recordsField({
    collection: "posts",
    fields: {
      id: true,
      title: true,
      path: true,
      thumbnail: true,
      createdAt: true,
      tags: true,
    },
    populate: true,
  }),
});
</script>

<template>
  <Container>
    <section :id="anchorLink || undefined" class="posts">
      <h2 class="title">
        {{ title }}
      </h2>
      <div class="content">
        <ul class="posts-list">
          <li v-for="post of posts" :key="post.id">
            <BlogPost :post="post" />
          </li>
        </ul>
      </div>
    </section>
  </Container>
</template>

<style scoped>
.posts {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
}

@container container (width > 500px) {
  .posts {
    flex-direction: row;
  }
}

.title {
  margin: 0;
  color: var(--secondary);
  margin-bottom: 2rem;
}

.content {
  width: 100%;
}

.posts-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

@container container (width > 500px) {
  .content {
    max-width: 450px;
  }
}
</style>
