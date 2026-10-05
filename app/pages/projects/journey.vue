<script setup lang="ts">
const router = useRouter()

const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')
</script>

<template>
  <section class="relative w-full min-h-screen py-12 text-[#587A55] overflow-x-hidden">
    
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20 text-[#587A55]">
      Loading journey data...
    </div>

    <div v-else-if="db?.journey" class="max-w-6xl mx-auto px-4 space-y-24">
      
      <!-- Heading Section -->
      <div class="flex items-center gap-4 mb-10">
        <button 
          @click="goBack" 
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
          title="Go Back"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div class="flex items-baseline gap-2 flex-wrap">
          <h1 class="text-4xl md:text-8xl font-xanh-mono text-[#587A55]">
            My
          </h1>
          <h1 class="text-5xl md:text-9xl font-italianno text-[#587A55]">
            Journey
          </h1>
        </div>
      </div>

      <!-- Journey List Container -->
      <div class="space-y-10">
        <div 
          v-for="(journey, index) in db.journey" 
          :key="journey.id"
          class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 border-b pb-10"
          :class="{
            'lg:flex-row': index % 2 === 0,
            'lg:flex-row-reverse': index % 2 === 1
          }"
        >
          <!-- Kolom Visual Tumpukan Foto & Judul Grade -->
          <div class="w-full lg:w-1/2 flex flex-col items-center">
            
            <!-- Tumpukan Foto ala Scrapbook -->
            <div class="relative w-full max-w-lg h-96 sm:h-115 flex items-center justify-center">
                <!-- Placeholder gambar tumpukan jika gambar utama ada -->
                <div 
                    v-if="'image' in journey && journey.image"
                    class="absolute border-black/10 transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-[95%] sm:w-[90%] z-10"
                >
                    <div class="w-full h-72 sm:h-84 bg-[#F3F4F6] overflow-hidden">
                    <img 
                        :src="journey.image" 
                        :alt="journey.grade" 
                        class="w-full h-full object-cover"
                    />
                    </div>
                </div>
            </div>

            <!-- Judul Grade di Bawah Gambar -->
            <h2 class="text-4xl sm:text-5xl font-bold text-[#587A55] tracking-tight">
              {{ journey.grade }}
            </h2>

          </div>

          <!-- Kolom Detail Aktivitas & Tools -->
          <div class="w-full lg:w-1/2 space-y-6">
            <div 
              v-for="activity in journey.activities" 
              :key="activity.id"
              class="space-y-1"
            >
              <h3 class="text-base sm:text-lg font-bold text-[#3D5242] flex items-start gap-2">
                <span class="text-[#587A55] mt-0.5">•</span>
                <span>{{ activity.title }}:</span>
              </h3>
              <p class="text-sm sm:text-base text-[#3D5242]/80 leading-relaxed pl-4">
                {{ activity.desc }}
              </p>
            </div>

            <!-- Tampilan Tools/Ikon di bawah teks aktivitas tertentu (Opsional sesuai data) -->
            <div v-if="journey.grade === '10th Grade' && db?.tools" class="flex flex-wrap items-center gap-3 pt-4 pl-4">
              <template v-for="tool in db.tools.slice(0, 5)" :key="tool.id">
                <div class="w-9 h-9 sm:w-13 sm:h-13 flex items-center justify-center">
                  <img :src="tool.icon" :alt="tool.name" class="w-full h-full object-contain" :title="tool.name" />
                </div>
              </template>
            </div>

            <div v-if="journey.grade === '11th Grade' && db?.tools" class="flex flex-wrap items-center gap-3 pt-4 pl-4">
              <template v-for="tool in db.tools.slice(4, 12)" :key="tool.id">
                <div class="w-9 h-9 sm:w-13 sm:h-13 flex items-center justify-center">
                  <img :src="tool.icon" :alt="tool.name" class="w-full h-full object-contain" :title="tool.name" />
                </div>
              </template>
            </div>

            <div v-if="journey.grade === '12th Grade' && db?.tools" class="flex flex-wrap items-center gap-3 pt-4 pl-4">
              <template v-for="tool in db.tools.slice(12, 15)" :key="tool.id">
                <div class="w-9 h-9 sm:w-13 sm:h-13 flex items-center justify-center">
                  <img :src="tool.icon" :alt="tool.name" class="w-full h-full object-contain" :title="tool.name" />
                </div>
              </template>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>