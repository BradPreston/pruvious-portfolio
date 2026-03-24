<script setup lang="ts">
import { z } from "zod";

import { recordField, textField } from "~/.pruvious";

const props = defineProps({
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

function buildSchema(fields: NonNullable<typeof props.form>["fields"]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields ?? []) {
    const key = field.label.toLowerCase();
    let rule: z.ZodTypeAny = z.string();

    if (field.type === "email") {
      rule = z.email("Invalid email address");
    }

    if (field.required) {
      rule = (rule as z.ZodString).min(1, `${field.label} is required`);
    }
    else {
      rule = rule.optional();
    }

    shape[key] = rule;
  }

  return z.object(shape);
}

function createFormId(label: string) {
  return label.toLowerCase().replaceAll(" ", "");
}

const errors = ref<Record<string, string>>({});
const submitted = ref(false);

async function handleSubmit(event: Event) {
  event.preventDefault();
  errors.value = {};

  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());

  const schema = buildSchema(props.form?.fields ?? []);
  const result = schema.safeParse(data);

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.value[issue.path[0] as string] = issue.message;
    }
    return;
  }

  try {
    await fetch("/api/mailer", {
      method: "POST",
      body: formData,
    });
    submitted.value = true;
  }
  catch {
    submitted.value = false;
    errors.value.form = "Something went wrong";
  }
}
</script>

<template>
  <Container>
    <section :id="anchorLink || undefined" class="form-section">
      <h2 class="title">
        {{ title }}
      </h2>
      <div class="content">
        <p v-if="submitted" class="submitted" role="alert">
          Thank you for your submission! I will respond as soon as possible.
        </p>
        <form v-else class="form" @submit="handleSubmit">
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
              :name="field.label.toLowerCase()"
              :aria-required="field.required ? 'true' : undefined"
              :aria-describedby="errors[field.label.toLowerCase()] ? `${createFormId(field.label)}-error` : undefined"
            />
            <input
              v-else
              :id="createFormId(field.label)"
              class="input"
              :type="field.type!"
              :placeholder="field.placeholder"
              :name="field.label.toLowerCase()"
              :aria-required="field.required ? 'true' : undefined"
              :aria-describedby="errors[field.label.toLowerCase()] ? `${createFormId(field.label)}-error` : undefined"
            >
            <span
              v-if="errors[field.label.toLowerCase()]"
              :id="`${createFormId(field.label)}-error`"
              class="error"
              role="alert"
            >
              {{ errors[field.label.toLowerCase()] }}
            </span>
          </div>
          <button type="submit" class="button submit-button">
            {{ form!.submitText }}
          </button>
          <span v-if="errors.form" class="error" role="alert">
            {{ errors.form }}
          </span>
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

@container container (width > 700px) {
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

@container container (width > 700px) {
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
  min-height: 450px;
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
  font-family: var(--font-family);
}

.textarea {
  border-radius: 1rem;
  font-family: var(--font-family);
}

.button {
  width: 100%;
  text-align: center;
}

.submit-button {
  border-radius: 9999px;
  border: 2px solid var(--primary);
  background: var(--primary);
  color: var(--bg);
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
}

.submit-button:hover {
  background: var(--primary-hover);
  color: var(--primary);
}

.submit-button:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

.input:focus-visible,
.textarea:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

.error {
  font-weight: normal;
  color: var(--secondary);
}

.submitted {
  color: var(--text);
  min-height: 450px;
}
</style>
