<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')

// Handler untuk navigasi saat card diklik
const openProject = (url?: unknown) => {
  if (typeof url !== 'string' || !url) return

  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Jika URL eksternal (misal: Figma, Live Demo, Website), buka di tab baru
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    // Jika rute internal Nuxt (misal: /projects/1), gunakan router Nuxt
    router.push(url)
  }
}
</script>

<template>
  <section class="relative w-full min-h-screen py-12 text-[#587A55] overflow-x-hidden">
    <!-- Loading State dengan Animasi Spinner -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-20 text-[#587A55] space-y-3 animate-pulse">
      <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin" />
      <p class="font-medium">Loading freelance project data...</p>
    </div>

    <div v-else-if="db?.freelance" class="max-w-6xl mx-auto px-4 space-y-16">
      <!-- Heading Section -->
      <div class="flex items-center gap-4 mb-10">
        <button
          @click="goBack"
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 cursor-pointer hover:rotate-[-12deg] active:scale-95"
          title="Go Back"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div class="flex items-baseline gap-3 flex-wrap group cursor-default">
          <h1 class="text-4xl md:text-8xl font-xanh-mono text-[#587A55] transition-transform duration-500 group-hover:scale-105">
            Freelance
          </h1>
          <h1 class="text-5xl md:text-9xl font-italianno text-[#587A55] transition-transform duration-500 group-hover:scale-105">
            Project
          </h1>
        </div>
      </div>

      <!-- Freelance Project Container dengan Zigzag & Staggered Animation -->
      <div class="space-y-16">
        <div 
          v-for="(project, index) in db.freelance" 
          :key="project.id"
          @click="openProject(('link' in project ? project.link : undefined) || ('url' in project ? project.url : undefined))"
          class="relative w-full lg:w-[85%] bg-[#fffaf3a4] border border-[#3D5242]/20 backdrop-blur-xs rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-2xl hover:-translate-y-2 hover:border-[#587A55]/40 transition-all duration-500 space-y-6 cursor-pointer group animate-fade-in-up"
          :style="{ animationDelay: `${index * 150}ms` }"
          :class="{
            'lg:mr-auto': index % 2 === 0,  /* Card Ganjil: Rata Kiri */
            'lg:ml-auto': index % 2 === 1   /* Card Genap: Rata Kanan */
          }"
        >
          <!-- 1. Deretan Gambar (Atas) -->
          <div
            class="grid gap-4 items-center"
            :class="{
              'grid-cols-1 sm:grid-cols-3': project.images.length === 3,
              'grid-cols-1 sm:grid-cols-2': project.images.length === 2 || project.images.length > 3,
              'grid-cols-1': project.images.length === 1,
            }"
          >
            <div 
              v-for="(img, imgIdx) in project.images" 
              :key="imgIdx" 
              class="rounded-2xl overflow-hidden border border-[#3D5242]/10 bg-white/50 shadow-xs flex items-center justify-center aspect-video group/img relative"
            >
              <img 
                :src="img" 
                :alt="`${project.title} screenshot ${imgIdx + 1}`" 
                class="w-full h-full object-cover object-top group-hover/img:scale-108 transition-transform duration-700 ease-out" 
              />
              <!-- Overlay Glossy Halus saat Image Hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          <!-- 2. Baris Judul & Palette Warna (Tengah) -->
          <div class="flex items-center justify-between gap-4 pt-2">
            <h3 class="text-xl md:text-2xl font-bold text-[#3D5242] tracking-tight flex items-center gap-2 group-hover:text-[#587A55] transition-colors duration-300">
              <span>{{ project.title }}</span>
              <Icon 
                v-if="('link' in project ? project.link : undefined) || ('url' in project ? project.url : undefined)" 
                name="lucide:arrow-up-right" 
                class="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#587A55]" 
              />
            </h3>

            <!-- Bulatan Palette Warna dengan Animasi Pop & Hover -->
            <div class="flex items-center gap-2 shrink-0">
              <span 
                v-for="(color, cIdx) in project.colorPalette" 
                :key="cIdx" 
                class="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/10 shadow-xs hover:scale-125 hover:z-10 transition-transform duration-300 cursor-help group/color" 
                :style="{ backgroundColor: color }" 
              >
                <!-- Tooltip Kode Hex Warna -->
                <span class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono font-bold text-white bg-[#3D5242] rounded shadow-md opacity-0 group-hover/color:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {{ color }}
                </span>
              </span>
            </div>
          </div>

          <!-- 3. Deskripsi (Bawah) -->
          <p class="text-sm md:text-base text-[#3D5242]/80 leading-relaxed group-hover:text-[#3D5242] transition-colors duration-300">
            {{ project.description }}
          </p>
        </div>

        <!-- Ornamen Bunga dengan Floating/Pulse Subtle -->
        <img 
          src="/images/ascii flower.png" 
          alt="ASCII Pink Decorative" 
          class="absolute left-0 top-220 w-1/4 md:w-60 pointer-events-none z-50 ms-5 animate-subtle-float opacity-80" 
        />
      </div>

      <!-- Frame Pattern Bawah -->
      <img 
        src="/images/Frame1.png" 
        alt="Background Pattern" 
        class="absolute right-0 bottom-0 w-1/4 pointer-events-none opacity-90" 
      />
    </div>
  </section>
</template>

<style scoped>
/* Keyframe untuk Efek Fade-in bertahap saat kartu dimuat */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Keyframe Animasi Floating Bunga Decorative */
@keyframes subtleFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(2deg);
  }
}

.animate-subtle-float {
  animation: subtleFloat 5s ease-in-out infinite;
}
</style>