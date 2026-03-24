<script setup lang="ts">
const today = new Date();
const year = today.getFullYear();
</script>

<template>
  <footer class="footer">
    <p class="message">
      &copy;{{ year }} | Made with love by Brad Preston
    </p>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
</style>
