<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')

// State untuk melacak tool mana yang sedang di-hover
const hoveredToolId = ref<number | null>(null)
</script>

<template>
  <section class="relative pt-10 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden text-[#3D5242] min-h-[80vh]">
    <div class="max-w-6xl mx-auto space-y-12 mb-20">
      
      <!-- Judul Section -->
      <div class="flex items-center gap-4 mb-5">
        <button 
          @click="goBack" 
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 cursor-pointer hover:rotate-[-12deg] active:scale-95"
          title="Go Back"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div class="flex items-baseline gap-4 flex-wrap">
          <div class="flex items-baseline group cursor-default">
            <h1 class="text-3xl md:text-8xl font-xanh-mono text-[#587A55] transition-transform duration-500 group-hover:scale-105">
              The
            </h1>
            <h1 class="text-4xl md:text-9xl font-italianno text-[#587A55] transition-transform duration-500 group-hover:scale-105">
              Tools
            </h1>
          </div>
          <span class="text-2xl md:text-5xl font-medium text-[#587A55]">
            I use
          </span>
        </div>
      </div>

      <!-- Loading State dengan Animasi Pulse -->
      <div v-if="pending" class="py-20 text-center text-[#3D5242]/70 font-medium animate-pulse flex flex-col items-center justify-center gap-3">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-[#587A55]" />
        <span>Memuat tools...</span>
      </div>

      <!-- Grid Tools Interaktif -->
      <div 
        v-else-if="db?.tools" 
        class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 items-center pt-4"
      >
        <div 
          v-for="(tool, index) in db.tools" 
          :key="tool.id"
          @mouseenter="hoveredToolId = tool.id"
          @mouseleave="hoveredToolId = null"
          class="relative flex flex-col items-center justify-center p-3 rounded-2xl group cursor-pointer transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
          :style="{ animationDelay: `${index * 60}ms` }"
        >
          <!-- Radial Glow Effect saat Hover -->
          <div 
            class="absolute inset-0 bg-[#587A55]/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          ></div>

          <!-- Latar Belakang Kartu Ikon -->
          <div class="relative z-10 p-3 rounded-2xl bg-white/40 border border-black/5 backdrop-blur-xs group-hover:bg-white/80 group-hover:border-[#587A55]/30 group-hover:shadow-lg transition-all duration-300">
            <img 
              :src="tool.icon" 
              :alt="tool.name" 
              class="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>

          <!-- Tooltip Nama Tool (Floating Badge) -->
          <div 
            class="absolute -top-8 z-20 px-2.5 py-1 text-xs font-semibold text-white bg-[#3D5242] rounded-lg shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap"
          >
            {{ tool.name }}
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#3D5242] rotate-45"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- Gelombang Bawah dengan Animasi Subtle Wave -->
    <div class="absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden opacity-90">
      <img 
        src="/images/wavy.png" 
        alt="Wavy background" 
        class="w-full h-auto object-cover object-bottom min-h-10 animate-subtle-wave"
      />
    </div>
  </section>
</template>

<style scoped>
/* Keyframe untuk Efek Fade-in bertahap */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Keyframe Animasi Gelombang Halus */
@keyframes subtleWave {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

.animate-subtle-wave {
  animation: subtleWave 6s ease-in-out infinite;
}
</style>