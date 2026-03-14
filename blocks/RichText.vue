<script setup lang="ts">
import { editorField, textField } from "~/.pruvious";

defineProps({
  title: textField({ required: true }),
  anchorLink: textField({}),
  content: editorField({
    required: true,
    label: "Content",
    toolbar: ["bold", "italic", "blockquote", "heading3", "heading4", "link", "blockFormats", "inlineFormats", "clear"],
  }),
});
</script>

<template>
  <Container>
    <section :id="anchorLink || undefined" class="richText">
      <h2 class="title">
        {{ title }}
      </h2>
      <PruviousHTML class="content" :html="content" />
    </section>
  </Container>
</template>

<style scoped>
.richText {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
}

@container container (width > 500px) {
  .richText {
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
  color: var(--text);
}

.content:deep(p) {
  margin: 0;
}

@container container (width > 500px) {
  .content {
    max-width: 450px;
  }
}
</style>
