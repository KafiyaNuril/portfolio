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
    <div class="relative w-full min-h-screen my-12">
        <section class="max-w-6xl mx-auto w-full">
            <h2 class="font-italianno text-6xl md:text-7xl text-[#537052] mb-12">
                Experience Project
            </h2>

            <div class="space-y-10 mx-6">
                <div 
                v-for="item in experiences" 
                :key="item.id" 
                class="flex flex-col md:flex-row gap-4 md:gap-12 items-start"
                >
                <!-- Tanggal (Kiri) -->
                <div class="w-full md:w-44 shrink-0 font-bold text-[#537052]">
                    <div class="text-2xl md:text-3xl tracking-tight leading-none">
                    {{ formatTanggal(item.start_date, item.end_date) }}
                    </div>
                    <div class="text-2xl md:text-3xl mt-1 leading-none">
                    {{ getTahun(item.start_date) }}
                    </div>
                </div>

                <!-- Konten (Kanan) -->
                <div class="flex-1 w-full">
                    <div class="flex items-center gap-4 mb-2">
                    <h3 class="text-xl md:text-2xl font-bold text-[#537052]">
                        {{ item.position }}
                    </h3>
                    <div class="h-px bg-[#587A55] flex-1"></div>
                    </div>

                    <p class="text-sm md:text-base text-[#587A55] leading-relaxed max-w-3xl">
                    {{ item.desc }}
                    </p>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>