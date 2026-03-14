<script setup lang="ts">
import { recordField, textField } from "~/.pruvious";

defineProps({
  title: textField({ required: true }),
  anchorLink: textField({}),
  form: recordField({
    collection: "forms",
    fields: {
      id: true,
      fields: true,
      name: true,
      submitText: true,
    },
  }),
});

function createFormId(label: string) {
  return label.toLowerCase().replaceAll(" ", "");
}
</script>

<template>
  <Container>
    <section :id="anchorLink || undefined" class="form-section">
      <h2 class="title">
        {{ title }}
      </h2>
      <div class="content">
        <form class="form">
          <div
            v-for="field of form?.fields"
            :key="field.label"
            :class="field.width"
            class="form-input"
          >
            <label :for="createFormId(field.label)" class="label">{{ field.label }} <span v-if="field.required" class="required">*</span></label>
            <textarea
              v-if="field.type === 'textarea'"
              :id="createFormId(field.label)"
              class="textarea"
              rows="5"
              :placeholder="field.placeholder"
            />
            <input
              v-else
              :id="createFormId(field.label)"
              class="input"
              :type="field.type!"
              :placeholder="field.placeholder"
            >
          </div>
          <Button
            :key="form?.id"
            class="button"
            variant="primary"
          >
            {{ form!.submitText }}
          </Button>
        </form>
      </div>
    </section>
  </Container>
</template>

<style scoped>
.form-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
}

@container container (width > 500px) {
  .form-section {
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

.half {
  display: block;
  width: calc(50% - 1rem);
}

.full {
  width: 100%;
  display: block;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.label {
  padding-bottom: 0.5rem;
  display: inline-block;
}

.input,
.textarea {
  display: block;
  width: 100%;
  border: 2px solid var(--text);
  background: var(--dark);
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  color: var(--text);
}

.input {
  border-radius: 999px;
}

.textarea {
  border-radius: 1rem;
}

.button {
  width: 100%;
  text-align: center;
}
</style>
