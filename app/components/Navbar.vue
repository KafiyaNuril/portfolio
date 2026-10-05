<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="fixed inset-x-0 top-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-[#FFF9EF]/95 backdrop-blur-sm">
    <div class="font-semibold text-lg text-black tracking-wide">
      Kafiyaanrll
    </div>

    <!-- Menu Kanan (Desktop) -->
    <div class="hidden md:flex gap-8 text-sm font-medium text-black">
      <NuxtLink to="/#home" class="hover:text-[#587A55] transition">Home</NuxtLink>
      <NuxtLink to="/#about" class="hover:text-[#587A55] transition">About</NuxtLink>
      <NuxtLink to="/#projects" class="hover:text-[#587A55] transition">Project</NuxtLink>
      <NuxtLink to="/#resume" class="hover:text-[#587A55] transition">Resume</NuxtLink>
      <NuxtLink to="/#contact" class="hover:text-[#587A55] transition">Contact</NuxtLink>
    </div>

    <!-- Hamburger Button (Mobile) -->
    <button 
      @click="toggleMenu" 
      class="md:hidden text-black focus:outline-none cursor-pointer p-1"
      aria-label="Toggle Menu"
    >
      <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
    </button>

    <!-- Mobile Dropdown Menu -->
    <div 
      v-if="isOpen"
      class="absolute top-full left-0 w-full bg-[#FFF9EF] border-b border-black/10 shadow-md py-6 px-6 flex flex-col gap-4 text-base font-medium text-black md:hidden transition-all"
    >
      <NuxtLink to="/#home" @click="isOpen = false" class="hover:text-[#587A55] transition">Home</NuxtLink>
      <NuxtLink to="/#about" @click="isOpen = false" class="hover:text-[#587A55] transition">About</NuxtLink>
      <NuxtLink to="/#projects" @click="isOpen = false" class="hover:text-[#587A55] transition">Project</NuxtLink>
      <NuxtLink to="/#resume" @click="isOpen = false" class="hover:text-[#587A55] transition">Resume</NuxtLink>
      <NuxtLink to="/#contact" @click="isOpen = false" class="hover:text-[#587A55] transition">Contact</NuxtLink>
    </div>
  </nav>
</template>