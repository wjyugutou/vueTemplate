<script setup lang="ts">
function toggleThemeMode() {
  toggleDark()
}
</script>

<template>
  <nav class="h-full flex items-center justify-center gap-2 text-xl">
    <button class="dark:icon-[carbon--moon] icon-[carbon--sun]" @click="toggleThemeMode" />

    <a
      class="icon-[carbon--logo-github]"
      rel="noreferrer"
      href="https://github.com/wjyugutou/vue-vite-template"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
