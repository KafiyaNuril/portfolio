<script setup lang="ts">
const router = useRouter()

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')

// 1. Warna Border Gambar Berdasarkan Proyek
const projectBorderColors = [
  'border-[#FF5722]', // Proyek 1: Orange
  'border-[#2563EB]', // Proyek 2: Blue
  'border-[#EC4899]', // Proyek 3: Pink
  'border-[#10B981]', // Proyek 4: Green
]

// 2. Warna Badge Tools (Tetap Variasi Hijau, Pink, Biru)
const toolColorClasses = [
  { bg: 'bg-[#E2EBE2]', text: 'text-[#3D5242]' }, // Hijau
  { bg: 'bg-[#FCE7F3]', text: 'text-[#9D174D]' }, // Pink
  { bg: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]' }, // Biru
]

// Helper untuk mengambil warna border proyek
const getProjectBorder = (projectIndex: number) => {
  return projectBorderColors[projectIndex % projectBorderColors.length]
}

// Helper untuk mengambil warna badge tools (Hijau, Pink, Biru)
const getToolColor = (toolIndex: number) => {
  return toolColorClasses[toolIndex % toolColorClasses.length]!
}
</script>

<template>
  <section class="relative w-full min-h-screen py-12">
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20 text-[#587A55]">
      Loading internship data...
    </div>

    <div v-else-if="db?.internships" class="space-y-20">
      
      <!-- ================= SECTION 1: MY PROJECTS ================= -->
      <div class="max-w-6xl mx-auto px-4">
        
        <!-- Tombol Back Arrow & Heading -->
        <div class="flex items-center gap-4 mb-10">
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
                My
              </h1>
              <h1 class="text-4xl md:text-9xl font-italianno text-[#587A55]">
                Project
              </h1>
            </div>
            <span class="text-2xl md:text-5xl font-medium text-[#587A55]">
              during the Internship
            </span>
          </div>
        </div>

        <!-- Project List Loop -->
        <div class="space-y-10">
          <div 
            v-for="(project, pIdx) in db.internships.projects" 
            :key="project.id"
            class="space-y-6 pb-12 border-b border-[#587A55]/20 last:border-b-0"
          >
            <!-- Images Grid (Border Bervariasi Per Proyek) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="(img, idx) in project.images" 
                :key="idx" 
                class="rounded-xl overflow-hidden border-2 shadow-sm bg-black/5 aspect-video"
                :class="getProjectBorder(pIdx)"
              >
                <img 
                  :src="img" 
                  :alt="project.title" 
                  class="w-full h-full object-cover" 
                />
              </div>
            </div>

            <!-- Tool Tags (Tetap Berganti Warna: Hijau, Pink, Biru) -->
            <div class="flex flex-wrap gap-2.5 pt-2">
              <span 
                v-for="(tool, tIdx) in project.tools" 
                :key="tool" 
                class="px-4 py-1 rounded-full text-xs font-semibold shadow-xs transition-colors"
                :class="[getToolColor(tIdx).bg, getToolColor(tIdx).text]"
              >
                {{ tool }}
              </span>
            </div>

            <!-- Project Details -->
            <div class="space-y-3">
              <h3 class="text-xl md:text-2xl font-bold text-[#587A55]">
                {{ project.title }}
              </h3>
              <p class="text-sm md:text-base text-[#587A55]/80 leading-relaxed max-w-5xl">
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= STRIPE SECTION ================= -->
      <div class="w-full overflow-hidden leading-none">
        <img 
          src="/images/stripe2.png" 
          alt="Stripe Pattern" 
          class="w-full h-8 md:h-10 object-cover object-center block"
        />
      </div>

      <!-- ================= SECTION 2: ACTIVITIES ================= -->
      <div class="max-w-6xl mx-auto px-4 pt-8">
        <!-- Activity Heading -->
        <div class="text-center mb-10">
          <h2 class="text-4xl md:text-5xl font-bold text-[#587A55]">
            Activity
          </h2>
        </div>

        <!-- Activity Photos Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            v-for="(photo, index) in db.internships.activities" 
            :key="index"
            class="rounded-lg overflow-hidden shadow-sm aspect-4/3 bg-gray-100"
          >
            <img 
              :src="photo" 
              :alt="'Internship activity ' + (index + 1)" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>