<script setup lang="ts">
import { getCollectionData } from "#pruvious/client";

// Fetch data from the Settings collection
const { copyrightText, socialMedia } = await getCollectionData("settings");
const today = new Date();
const year = today.getFullYear();
</script>

<template>
  <footer class="footer">
    <p class="message">
      &copy;{{ year }} | {{ copyrightText }}
    </p>
    <SocialIcons :social-media="socialMedia" />
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-bottom: 2rem;
}
</style>
