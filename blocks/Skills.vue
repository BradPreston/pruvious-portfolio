<script setup lang="ts">
import { linkField, repeaterField, selectField, textAreaField, textField } from "~/.pruvious";

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
        choices: {
          primary: "Primary",
          outline: "Outline",
          link: "Link",
        },
        default: "outline",
        required: true,
      }),
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
            />
            <PruviousIcon
              v-else
              class="icon"
              icon="CheckmarkCircleEmpty"
            />
            {{ skill.title }}
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

@container container (width > 500px) {
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

@container container (width > 500px) {
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

.description {
  color: var(--text);
  margin: 0;
  margin-bottom: 2rem;
}
</style>
