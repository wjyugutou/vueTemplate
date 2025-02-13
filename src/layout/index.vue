<script lang='ts' setup>
const router = useRouter()
const route = useRoute()

const title = computed(() => route.meta.title as string ?? 'Layout')
</script>

<template>
  <VanNavBar :title="title" :left-arrow="(!route.meta.hideLeftArrow as boolean)" @click-left="router.back" />
  <main class="h-[calc(100vh-var(--van-nav-bar-height))] overflow-auto">
    <RouterView />
  </main>
</template>

<style scoped>

</style>
