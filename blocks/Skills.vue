<script setup lang="ts">
import { checkboxField, linkField, repeaterField, selectField, textAreaField, textField } from "~/.pruvious";
import { buttonVariantChoices } from "~/lib/button-subfields";

defineProps({
  title: textField({ required: true }),
  anchorLink: textField({}),
  skills: repeaterField({
    max: 6,
    subfields: {
      title: textField({ required: true }),
      proficieny: selectField({
        choices: {
          strong: "Strong",
          familiar: "Familiar",
        },
        default: "strong",
        required: true,
      }),
    },
  }),
  description: textAreaField(),
  button: repeaterField({
    max: 1,
    subfields: {
      link: linkField({ required: true }),
      title: textField({ required: true }),
      variant: selectField({
        choices: buttonVariantChoices,
        default: "outline",
        required: true,
      }),
      newTab: checkboxField({ default: false }),
    },
  }),
});
</script>

<template>
  <Container>
    <section :id="anchorLink || undefined" class="skills">
      <h2 class="title">
        {{ title }}
      </h2>
      <div class="content">
        <div class="skill-list">
          <div v-for="skill of skills" :key="skill.title.toString()" class="skill">
            <PruviousIcon
              v-if="skill.proficieny.toString() === 'strong'"
              class="icon"
              icon="CheckmarkCircle"
              aria-hidden="true"
            />
            <PruviousIcon
              v-else
              class="icon"
              icon="CheckmarkCircleEmpty"
              aria-hidden="true"
            />
            {{ skill.title }}
            <span class="sr-only">({{ skill.proficieny }})</span>
          </div>
        </div>
        <p class="description">
          {{ description }}
        </p>
        <Button
          v-for="b of button"
          :key="b.link.toString()"
          :variant="b.variant"
          :href="b.link.toString()"
          :target="b.newTab ? '_blank' : '_self'"
        >
          {{ b.title }}
        </Button>
      </div>
    </section>
  </Container>
</template>

<style scoped>
.skills {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
}

@container container (width > 700px) {
  .skills {
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

@container container (width > 700px) {
  .content {
    max-width: 450px;
  }
}

.skill-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@container container (width > 350px) {
  .skill-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.skill {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  color: var(--text);
}

.icon {
  fill: var(--primary);
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

.description {
  color: var(--text);
  margin: 0;
  margin-bottom: 2rem;
}
</style>
