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

// 2. Warna Badge Tools
const toolColorClasses = [
  { bg: 'bg-[#E2EBE2]', text: 'text-[#3D5242]' }, // Hijau
  { bg: 'bg-[#FCE7F3]', text: 'text-[#9D174D]' }, // Pink
  { bg: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]' }, // Biru
]

const getProjectBorder = (projectIndex: number) => {
  return projectBorderColors[projectIndex % projectBorderColors.length]
}

const getToolColor = (toolIndex: number) => {
  return toolColorClasses[toolIndex % toolColorClasses.length]!
}
</script>

<template>
  <section class="relative w-full min-h-screen py-12 overflow-hidden">
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20 text-[#587A55]">
      Loading internship data...
    </div>

    <div v-else-if="db?.internships" class="space-y-20">
      
      <!-- ================= SECTION 1: MY PROJECTS ================= -->
      <div class="max-w-6xl mx-auto px-4">
        
        <!-- Tombol Back Arrow & Heading -->
        <div class="flex items-center gap-4 mb-10 animate-fade-in-up">
          <button 
            @click="goBack" 
            class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 cursor-pointer"
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
        <div class="space-y-12">
          <div 
            v-for="(project, pIdx) in db.internships.projects" 
            :key="project.id"
            class="space-y-6 pb-12 border-b border-[#587A55]/20 last:border-b-0 group/proj animate-fade-in-up"
            :style="{ animationDelay: `${(pIdx + 1) * 150}ms` }"
          >
            <!-- Images Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="(img, idx) in project.images" 
                :key="idx" 
                class="rounded-xl overflow-hidden border-2 shadow-sm bg-black/5 aspect-video transition-all duration-500 hover:shadow-md hover:-translate-y-1"
                :class="getProjectBorder(pIdx)"
              >
                <img 
                  :src="img" 
                  :alt="project.title" 
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
            </div>

            <!-- Tool Tags -->
            <div class="flex flex-wrap gap-2.5 pt-2">
              <span 
                v-for="(tool, tIdx) in project.tools" 
                :key="tool" 
                class="px-4 py-1 rounded-full text-xs font-semibold shadow-xs transition-transform duration-300 hover:scale-105"
                :class="[getToolColor(tIdx).bg, getToolColor(tIdx).text]"
              >
                {{ tool }}
              </span>
            </div>

            <!-- Project Details -->
            <div class="space-y-3">
              <h3 class="text-xl md:text-2xl font-bold text-[#587A55] transition-colors duration-300 group-hover/proj:text-[#425840]">
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

      <!-- ================= SECTION 2: ACTIVITIES (Horizontal Scroll / Swipe) ================= -->
      <div class="w-full pt-4">
        <!-- Activity Heading -->
        <div class="max-w-6xl mx-auto px-4 text-center mb-8">
          <h2 class="text-4xl md:text-5xl font-bold text-[#587A55]">
            Activity
          </h2>
        </div>

        <!-- Horizontal Scrolling Container -->
        <div class="w-full overflow-x-auto no-scrollbar px-4 md:px-20 py-4">
          <div class="flex gap-6 w-max mx-auto">
            <div 
              v-for="(photo, index) in db.internships.activities" 
              :key="index"
              class="w-[280px] sm:w-[340px] md:w-[400px] shrink-0 rounded-xl overflow-hidden shadow-sm border border-[#587A55]/20 aspect-video bg-[#F5EFE6] group cursor-pointer"
            >
              <img 
                :src="photo" 
                :alt="'Internship activity ' + (index + 1)" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
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

/* Sembunyikan scrollbar bawaan browser tapi tetap bisa digeser */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>