<script setup lang="ts">
const router = useRouter()

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')
</script>

<template>
  <section class="relative pt-10 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden text-[#3D5242]">
    <div class="max-w-6xl mx-auto space-y-12 mb-20">
      
      <!-- Judul Section -->
      <div class="flex items-center gap-4 mb-5">
          <button 
            @click="goBack" 
            class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
            title="Go Back"
          >
            <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div class="flex items-baseline gap-4 flex-wrap">
            <div class="flex items-baseline">
              <h1 class="text-3xl md:text-8xl font-xanh-mono text-[#587A55]">
                The
              </h1>
              <h1 class="text-4xl md:text-9xl font-italianno text-[#587A55]">
                Tools
              </h1>
            </div>
            <span class="text-2xl md:text-5xl font-medium text-[#587A55]">
                I use
            </span>
          </div>
        </div>

      <!-- Loading State -->
      <div v-if="pending" class="py-12 text-center text-[#3D5242]/60 font-medium">
        Memuat tools...
      </div>

      <!-- Grid Tools (8 kolom di layar besar seperti gambar referensi) -->
      <div v-else-if="db?.tools" class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 items-center pt-4">
        <div 
          v-for="tool in db.tools" 
          :key="tool.id"
          class="flex items-center justify-center p-2 group transition-transform duration-300 hover:scale-110 cursor-pointer"
          :title="tool.name"
        >
          <img 
            :src="tool.icon" 
            :alt="tool.name" 
            class="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-xl drop-shadow-xs group-hover:drop-shadow-md transition-all"
          />
        </div>
      </div>

    </div>

    <!-- Gelombang Bawah (wavy.png) -->
    <div class="absolute bottom-0 left-0 w-full pointer-events-none">
      <img 
        src="/images/wavy.png" 
        alt="Wavy background" 
        class="w-full h-auto object-cover object-bottom min-h-10"
      />
    </div>
  </section>
</template>