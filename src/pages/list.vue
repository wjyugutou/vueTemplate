<script lang='ts' setup>
function getData() {
  return new Promise<PagenationResponse<{ id: number, name: string }>>((resolve) => {
    setTimeout(() => {
      resolve({
        list: [
          { id: 1, name: '1' },
          { id: 2, name: '2' },
          { id: 3, name: '3' },
        ],
        total: 20,
      })
    }, 1000)
  })
}
</script>

<template>
  <PullRefreshList :data-fetch="getData">
    <template #default="props">
      <div>
        {{ props.data }}
      </div>
    </template>
  </PullRefreshList>
</template>
