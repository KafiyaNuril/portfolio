<script setup lang="ts">
interface Experience {
  id: number
  position: string
  start_date: string
  end_date: string | null
  desc: string
}

// Fetch data dari server API Nuxt 4
const { data: dbData } = await useFetch('/api/portfolio')
const experiences = computed<Experience[]>(() => dbData.value?.experiences || [])

// Formatters
const formatTanggal = (startDate: string | null, endDate: string | null) => {
  if (!startDate) return ''
  const startMonth = startDate.split(' ')[0]
  if (!endDate) return startMonth
  
  const endMonth = endDate.split(' ')[0]
  return `${startMonth} – ${endMonth}`
}

const getTahun = (startDate: string | null) => {
  if (!startDate) return ''
  return startDate.split(' ')[1] || ''
}
</script>

<template>
    <div class="relative w-full min-h-screen my-12 overflow-hidden">
        <section class="max-w-6xl mx-auto w-full px-4">
            <h2 class="font-italianno text-6xl md:text-7xl text-[#537052] mb-12 animate-fade-in-up">
                Experience Project
            </h2>

            <div class="space-y-12 mx-2 md:mx-6">
                <div 
                  v-for="(item, index) in experiences" 
                  :key="item.id" 
                  class="group flex flex-col md:flex-row gap-4 md:gap-12 items-start transition-all duration-300 hover:translate-x-2 animate-fade-in-up"
                  :style="{ animationDelay: `${(index + 1) * 150}ms` }"
                >
                    <!-- Tanggal (Kiri) dengan efek Scale/Glow saat di-hover -->
                    <div class="w-full md:w-44 shrink-0 font-bold text-[#537052] transition-transform duration-300 group-hover:scale-105">
                        <div class="text-2xl md:text-3xl tracking-tight leading-none">
                        {{ formatTanggal(item.start_date, item.end_date) }}
                        </div>
                        <div class="text-2xl md:text-3xl mt-1 leading-none opacity-90">
                        {{ getTahun(item.start_date) }}
                        </div>
                    </div>

                    <!-- Konten (Kanan) -->
                    <div class="flex-1 w-full">
                        <div class="flex items-center gap-4 mb-2">
                          <h3 class="text-xl md:text-2xl font-bold text-[#537052] transition-colors duration-300 group-hover:text-[#3d543d]">
                              {{ item.position }}
                          </h3>
                          <!-- Garis interaktif yang memanjang saat di-hover -->
                          <div class="h-px bg-[#587A55]/60 flex-1 transition-all duration-500 group-hover:bg-[#587A55] group-hover:scale-x-105 origin-left"></div>
                        </div>

                        <p class="text-sm md:text-base text-[#587A55]/90 leading-relaxed max-w-3xl transition-colors duration-300 group-hover:text-[#445f42]">
                        {{ item.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>