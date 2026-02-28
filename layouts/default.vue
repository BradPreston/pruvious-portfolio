<script lang="ts" setup>
// import { usePage } from "#pruvious/client";

// const page = usePage();
</script>

<template>
  <div class="layout">
    <Header class="header" />

    <main class="main">
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

.header {
  height: "fit-content";
}

.main {
  flex: 1;
}
</style>
