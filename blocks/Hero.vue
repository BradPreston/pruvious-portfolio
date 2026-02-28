<script lang="ts" setup>
import { textAreaField, textField } from "#pruvious";

defineProps({
  title: textField({ required: true }),
  description: textAreaField({ required: true }),
});
</script>

<template>
  <section class="hero">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </section>
</template>
