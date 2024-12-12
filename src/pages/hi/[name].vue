<route lang="yaml">
{
  alias: ['hii/:name'],
  meta: {
    title: "Name113322"
  }
}
</route>

<script setup lang="ts">
const router = useRouter()
const route = useRoute('/hi/[name]')

definePage({
  meta: {
    auth: 'admin',
  },
})

const { params, meta } = route

console.log(meta)
</script>

<template>
  <div>
    <p>hi/[name].vue  <span class="mx-2" /> name: {{ params.name }}</p>
    <div class="i-carbon-pedestrian inline-block text-4xl" />
    <p>
      Hi, {{ params.name }}
    </p>
    <p class="text-sm op-50">
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="btn m-3 mt-8 text-sm"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
