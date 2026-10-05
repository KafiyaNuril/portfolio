<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="w-full bg-[#587A55] py-3.5 px-4 text-center">
    <p class="text-white text-xs sm:text-sm font-semibold tracking-wide">
      © {{ currentYear }} Kafiya Nuril Kautsar. All rights reserved.
    </p>
  </footer>
</template>