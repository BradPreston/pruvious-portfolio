<script lang="ts" setup>
import { imageField, linkField, repeaterField, selectField, textAreaField, textField } from "#pruvious";

defineProps({
  title: textField({ required: true }),
  description: textAreaField({ required: true }),
  headingType: selectField({
    choices: {
      h1: "H1",
      h2: "H2",
    },
    default: "h1",
  }),
  image: imageField({ required: true }),
  lazyloadImage: selectField({
    choices: {
      true: "True",
      false: "False",
    },
    default: "true",
  }),
  buttons: repeaterField({
    max: 2,
    required: false,
    subfields: {
      link: linkField({ required: true }),
      title: textField({ required: true }),
      variant: selectField({
        choices: {
          primary: "Primary",
          outline: "Outline",
          link: "Link",
        },
        default: "primary",
        required: true,
      }),
    },
  }),
});
</script>

<template>
  <Container>
    <section class="hero">
      <div class="hero-left">
        <h1 v-if="headingType === 'h1'" class="heading">
          <Icon name="uil:github" class="icon" />
          {{ title }}
        </h1>
        <h2 v-else class="heading">
          {{ title }}
        </h2>
        <p class="description">
          {{ description }}
        </p>
        <div class="button-group">
          <a
            v-for="button of buttons"
            :key="button.link.toString()"
            class="button"
            :class="button.variant"
            :href="button.link.toString()"
          >{{ button.title }}</a>
        </div>
      </div>
      <div class="hero-right">
        <PruviousImage
          :image="image"
          :alt="image?.alt"
          class="image"
          :lazy="lazyloadImage === 'true'"
        />
      </div>
    </section>
  </Container>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 2rem;
}

.hero-right {
  max-width: 350px;
  width: 100%;
}

@container container (width > 600px) {
  .hero {
    flex-direction: row;
    align-items: center;
  }
}

.heading {
  margin: 0;
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  color: var(--secondary);
}

.description {
  margin: 0;
  color: var(--text);
}

.button-group {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

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

.image {
  border-radius: 9999px;
  aspect-ratio: 1/1;
  height: auto;
  object-fit: cover;
  width: 100%;
  box-shadow: 0 0 50px 15px var(--primary-hover);
}
</style>
