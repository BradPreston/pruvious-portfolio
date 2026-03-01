<script setup lang="ts">
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
  ],
});
</script>

<template>
  <NuxtPage />
</template>

<style>
:root {
  color-scheme: light dark;
  --primary: light-dark(#d5635a, #d5635a);
  --primary-hover: light-dark(rgba(213, 99, 90, 0.2), rgba(213, 99, 90, 0.2));
  --secondary: light-dark(#2b2a34, #cba72f);
  --bg: light-dark(#e0e1dd, #2b2a34);
  --text: light-dark(#2b2a34, #e0e1dd);
  --transition: all 0.15s ease;
}

body {
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  background: var(--bg);
}
</style>
