<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.back();
};

const { data: db, pending } = await useFetch("/api/portfolio");

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
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20 text-[#587A55]">Loading freelance project data...</div>

    <div v-else-if="db?.freelance" class="max-w-6xl mx-auto px-4 space-y-16">
      <!-- Heading Section -->
      <div class="flex items-center gap-4 mb-10">
        <button
          @click="goBack"
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
          title="Go Back"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div class="flex items-baseline gap-3 flex-wrap">
          <h1 class="text-4xl md:text-8xl font-xanh-mono text-[#587A55]">Freelance</h1>
          <h1 class="text-5xl md:text-9xl font-italianno text-[#587A55]">Project</h1>
        </div>
      </div>

      <!-- Freelance Project Container with Zigzag Alignment -->
      <div class="space-y-16">
        <div 
          v-for="(project, index) in db.freelance" 
          :key="project.id"
          @click="openProject(('link' in project ? project.link : undefined) || ('url' in project ? project.url : undefined))"
          class="w-full lg:w-[85%] bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-6 cursor-pointer group"
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
            <div v-for="(img, imgIdx) in project.images" :key="imgIdx" class="rounded-2xl overflow-hidden border border-[#3D5242]/10 bg-white/50 shadow-xs flex items-center justify-center aspect-video">
              <img :src="img" :alt="`${project.title} screenshot ${imgIdx + 1}`" class="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500" />
            </div>
          </div>

          <!-- 2. Baris Judul & Palette Warna (Tengah) -->
          <div class="flex items-center justify-between gap-4 pt-2">
            <h3 class="text-xl md:text-2xl font-bold text-[#3D5242] tracking-tight">
              {{ project.title }}
              <Icon v-if="('link' in project ? project.link : undefined) || ('url' in project ? project.url : undefined)" name="lucide:arrow-up-right" class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>

            <!-- Bulatan Palette Warna -->
            <div class="flex items-center gap-2 shrink-0">
              <span v-for="(color, cIdx) in project.colorPalette" :key="cIdx" class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/10 shadow-xs" :style="{ backgroundColor: color }" :title="color"></span>
            </div>
          </div>

          <!-- 3. Deskripsi (Bawah) -->
          <p class="text-sm md:text-base text-[#3D5242]/80 leading-relaxed">
            {{ project.description }}
          </p>
        </div>

        <img src="/images/ascii flower.png" alt="ASCII Pink Decorative" class="absolute left-0 top-220 w-1/4 md:w-60 pointer-events-none z-50 ms-5" />
      </div>

      <img src="/images/Frame1.png" alt="Background Pattern" class="absolute right-0 bottom-0 w-1/4 pointer-events-none" />
    </div>
  </section>
</template>
