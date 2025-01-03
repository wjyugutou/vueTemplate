<script setup lang="ts">
import { postTestFileApi } from '@/api/test'

const userStore = useUserStore()

const router = useRouter()

function go() {
  if (userStore.name)
    router.push(`/hii/${encodeURIComponent(userStore.name)}`)
}

function changeUsename() {
  // 生成随机名字
  let _name = ''
  const nameLength = Math.floor(Math.random() * 5) + 5
  for (let i = 0; i < nameLength; i++) {
    _name += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }
  userStore.name = _name
}

async function getTest() {
  const res = await getTestApi({ params: 1, msg: 'getTest' })
  console.log('getTest', res)
}
async function postTest() {
  const res = await postTestApi({ data: 1, msg: 'postTest' })
  console.log('postTest', res)
}

async function getTestErr() {
  const res = await getTestErrApi()
  console.log('getTestErr', res)
}
async function postTestFile() {
  const res = await postTestFileApi({ path: 'all.2025-01-03.log' })
  console.log('postTestFile', res)
  // 判断res是否为blob类型
  if (res.data instanceof Blob) {
    const url = window.URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = decodeURIComponent(res.filename)
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

const reqList = [
  { name: 'getTestApi', request: () => getTest() },
  { name: 'getTestErrApi', request: () => getTestErr() },
  { name: 'postTestApi', request: () => postTest() },
  { name: 'postTestFileApi', request: () => postTestFile() },
]
</script>

<template>
  <div>
    <div class="i-carbon-campsite inline-block cursor-pointer text-4xl" @click="changeUsename" />
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
      v-model="userStore.name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      class="border-rounded-gray-200 w-250px border border-(dark:gray-700) bg-transparent p-(x-4 y-2) text-center outline-(none)"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!userStore.name"
        @click="go"
      >
        Go
      </button>
    </div>

    <div>
      <h1>Request test</h1>
      <button v-for="request, index in reqList" :key="index" class="ml-3 btn" @click="request.request">
        {{ request.name }}
      </button>
    </div>
  </div>
</template>
