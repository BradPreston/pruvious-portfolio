<script lang="ts" setup>
import type { PopulatedFieldType } from "#pruvious";

const { data: homePage } = await useAsyncData("home-page", () =>
  $fetch<PopulatedFieldType["pages"]>("/api/pages", { query: { where: "path[=][/]" } }));

function createAnchorLink(anchor: string) {
  if (anchor.startsWith("#"))
    return anchor;
  return `#${anchor}`;
}

type NavigableBlockFields = { title: string; anchorLink: string };

const blockAnchorLinks = homePage.value?.blocks
  .filter(({ block }) => "title" in block.fields && "anchorLink" in block.fields)
  .map(({ block }) => {
    const fields = block.fields as NavigableBlockFields;
    return {
      anchor: createAnchorLink(fields.anchorLink),
      title: fields.title,
    };
  });

const activeAnchor = ref<string | null>(blockAnchorLinks?.[0]?.anchor ?? null);

onMounted(() => {
  const visibleAnchors = new Set<string>();

  // The first element that can actually be observed (has a real id)
  const firstObservableEl = blockAnchorLinks
    ?.map(({ anchor }) => document.getElementById(anchor.replace(/^#/, "")))
    .find(el => el !== null) ?? null;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const anchor = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          visibleAnchors.add(anchor);
        }
        else {
          visibleAnchors.delete(anchor);
        }
      }

      // If we're scrolled above the first observable section, use the first nav link
      const aboveFirstObservable = firstObservableEl && window.scrollY < firstObservableEl.offsetTop;
      const first = aboveFirstObservable
        ? blockAnchorLinks?.[0]
        : blockAnchorLinks?.find(({ anchor }) => visibleAnchors.has(anchor));

      activeAnchor.value = first?.anchor ?? null;
    },
    { threshold: 0.3 },
  );

  blockAnchorLinks?.forEach(({ anchor }) => {
    const id = anchor.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el)
      observer.observe(el);
  });

  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <div class="layout">
    <div class="page">
      <header>
        <nav class="nav">
          <div class="nav-links">
            <a
              v-for="link of blockAnchorLinks"
              :key="link.anchor"
              class="nav-link"
              :href="link.anchor"
              :class="activeAnchor === link.anchor ? 'active' : ''"
            >{{ link.title }}</a>
          </div>
        </nav>
      </header>

      <main class="main">
        <!-- Our page blocks will be rendered here -->
        <slot />
      </main>
    </div>
    <Footer class="footer" />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 1200px;
  margin: 0 auto;
}

.page {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  padding-top: 50px;
}

.header {
  height: "fit-content";
}

.main {
  flex: 1;
}

.nav {
  position: relative;
  width: 100vw;
  max-width: 200px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50px;
  gap: 1rem;
  width: 100%;
  max-width: 200px;
}

.nav-link {
  display: flex;
  justify-content: left;
  align-items: center;
  transition: all 0.15s ease;
  text-decoration: none;
  color: var(--text);
  width: 100%;
  border: 2px solid transparent;
  border-radius: 9999px;
  padding: 0.25rem 0;
}

.nav-link.active {
  background: var(--primary);
  color: var(--bg);
  justify-content: center;
  border: 2px solid var(--primary);
  transition: var(--transition);
  font-weight: 500;
  pointer-events: none;
  padding: 0.25rem 1rem;
}

.nav-link:not(.active):hover {
  justify-content: center;
  border: 2px solid var(--primary);
  color: var(--primary);
  background: var(--primary-hover);
  padding: 0.25rem 1rem;
}
</style>
