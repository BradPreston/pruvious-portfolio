<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div class="page">
      <Header />

      <main id="main-content" class="main">
        <!-- Our page blocks will be rendered here -->
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  padding-top: 50px;
  gap: 1rem;
}

.main {
  flex: 1;
  max-width: 800px;
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
</style>
