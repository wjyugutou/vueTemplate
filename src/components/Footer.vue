<script setup lang="ts">
function toggleThemeMode() {
  toggleDark()
}
</script>

<template>
  <nav class="h-full flex items-center justify-center gap-2 text-xl">
    <button class="icon-btn" @click="toggleThemeMode">
      <div class="dark:i-carbon-moon i-carbon-sun" />
    </button>

    <a
      class="icon-btn i-carbon-logo-github"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
