<script setup lang="ts">
const name = ref('')

const router = useRouter()

function go() {
  if (name.value)
    router.push(`/hii/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <div class="i-carbon-campsite inline-block text-4xl" />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em class="text-sm op75">Opinionated Vite Starter Template</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      class="border-rounded-gray-200 w-250px border border-(dark:gray-700) bg-transparent p-(x-4 y-2) text-center outline-(none)"
      @keydown.enter="go"
    >

    <div>
      <button
        class="btn m-3 text-sm"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
