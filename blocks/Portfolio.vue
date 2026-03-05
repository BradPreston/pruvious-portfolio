<script setup lang="ts">
import { recordsField, textField } from "~/.pruvious";

defineProps({
  title: textField({ required: true }),
  portfolioItems: recordsField({
    collection: "portfolio",
    fields: {
      id: true,
      title: true,
      thumbnail: true,
      links: true,
      description: true,
      tags: true,
    },
    populate: true,
  }),
});
</script>

<template>
  <Container>
    <section class="portfolio">
      <h2 class="title">
        {{ title }}
      </h2>
      <div class="content">
        <div class="portfolio-items">
          <PortfolioItem
            v-for="item of portfolioItems"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </section>
  </Container>
</template>

<style scoped>
.portfolio {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
}

@container container (width > 500px) {
  .portfolio {
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

@container container (width > 500px) {
  .content {
    max-width: 450px;
  }
}
</style>
