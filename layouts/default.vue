<script lang="ts" setup>
// import { usePage } from "#pruvious/client";

// const page = usePage();
</script>

<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <Header class="header" />

    <main id="main-content" class="main">
      <!-- Our page blocks will be rendered here -->
      <slot />
    </main>

    <Footer class="footer" />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: 1fr auto 1fr;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--bg);
  color: var(--text);
  border: 2px solid var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.skip-link:focus {
  top: 0;
}

.header {
  height: "fit-content";
}

.main {
  flex: 1;
}
</style>
