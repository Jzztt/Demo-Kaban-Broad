
<script setup>
const props = defineProps({
  title: String,
});
</script>
<template>
  <div class="grid h-screen bg-gray-950 lg:grid-cols-2 dark:bg-gray-950">
    <div
      class="w-full px-8 left place-self-center md:px-16 lg:px-24 xl:px-36 2xl:px-52"
    >
      <div class="mb-6 text-center header">
        <div class="flex justify-center">
          <img class="w-24 h-24" src="~/public/logo.png" alt="" />
        </div>
        <h1 class="mt-4 text-xl font-bold text-white">{{ title }}</h1>
      </div>
      <UCard
        class="mt-8"
        :ui="{ background: 'bg-gray-950', ring: 'ring-gray-700' }"
      >
        <slot />
      </UCard>
    </div>
    <div class="hidden right lg:block"></div>
  </div>
</template>



<style >
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>