<template>
  <div class="layout">
    <header class="navbar">
      <span class="navbar-brand">Procurement MVP</span>
      <div class="navbar-actions">
        <nav>
          <RouterLink to="/" :class="{ active: isDashboard }">Dashboard</RouterLink>
          <RouterLink to="/requisitions" :class="{ active: isRequisitions }">Purchase Requisitions</RouterLink>
        </nav>
        <button
          type="button"
          class="btn btn-outline theme-toggle"
          :aria-label="`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`"
          @click="toggleTheme"
        >
          {{ isDarkTheme ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

const THEME_STORAGE_KEY = 'procurement-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const route = useRoute();
const theme = ref(LIGHT_THEME);
const isDashboard = computed(() => route.path === '/');
const isRequisitions = computed(() => route.path.startsWith('/requisitions'));
const isDarkTheme = computed(() => theme.value === DARK_THEME);

function applyTheme(nextTheme) {
  theme.value = nextTheme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem(THEME_STORAGE_KEY, theme.value);
}

function toggleTheme() {
  applyTheme(isDarkTheme.value ? LIGHT_THEME : DARK_THEME);
}

onMounted(() => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(storedTheme);
});
</script>
