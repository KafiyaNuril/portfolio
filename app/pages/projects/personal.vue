<script setup lang="ts">
import { ref, onMounted } from 'vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')

const toolBadgeStyles = [
  'bg-[#FCE8E6] text-[#D93025]', 
  'bg-[#F3E8FF] text-[#9333EA]',
  'bg-[#E2EBE2] text-[#3D5242]', 
]

const getToolStyle = (index: number) => {
  return toolBadgeStyles[index % toolBadgeStyles.length]
}

// State interaktif untuk animasi tambahan (misal: efek hover card interaktif atau pulse)
const activeCard = ref<number | null>(null)
</script>

<template>
  <section class="relative w-full min-h-screen py-12 overflow-hidden">

    <!-- Loading State dengan Animasi Pulse -->
    <div v-if="pending" class="text-center py-20 text-[#587A55] animate-pulse font-medium">
      Memuat data proyek terbaikmu...
    </div>

    <div v-else-if="db?.projects" class="space-y-20 animate-fade-in">
      
      <!-- ================= SECTION 1: MY PROJECTS ================= -->
      <div class="max-w-6xl mx-auto px-4">
        
        <!-- Heading dengan Animasi Masuk -->
        <div class="flex items-center gap-4 mb-10 transition-all duration-700 transform translate-y-0 opacity-100">
          <button 
              @click="goBack" 
              class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 cursor-pointer hover:rotate-[-10deg] active:scale-95"
              title="Kembali"
            >
              <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div class="flex items-baseline gap-4 flex-wrap">
            <div class="flex items-baseline">
              <h1 class="text-3xl md:text-8xl font-xanh-mono text-[#587A55] transition-transform duration-500 hover:scale-105">
                My
              </h1>
              <h1 class="text-4xl md:text-9xl font-italianno text-[#587A55] transition-transform duration-500 hover:scale-105">
                Personal
              </h1>
            </div>
            <span class="text-2xl md:text-5xl font-medium text-[#587A55]">
              Project
            </span>
          </div>
        </div>

        <!-- Project List Loop dengan Efek Interaktif -->
        <div class="space-y-6">
          <!-- grid 1 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(project, idx) in db.projects.slice(0, 3)" 
              :key="project.id"
              @mouseenter="activeCard = project.id"
              @mouseleave="activeCard = null"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
            >
              <!-- Efek Cahaya Halus di Background Kartu saat Hover -->
              <div class="absolute inset-0 bg-gradient-to-tr from-[#587A55]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div class="relative z-10">
                <!-- Container Gambar Preview -->
                <div class="rounded-2xl mb-6 relative overflow-hidden shadow-xs border border-black/5 flex items-center justify-center bg-white/50">
                  <img 
                    :src="project.image" 
                    :alt="project.name" 
                    class="w-full h-48 object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <!-- Badges, Judul & Deskripsi -->
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in project.tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide transition-transform duration-300 hover:scale-110 cursor-default"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-[#3D5242] tracking-tight group-hover:text-[#52714f] transition-colors duration-300">
                    {{ project.name }}
                  </h3>
                  <p class="text-sm text-[#3D5242]/80 leading-relaxed">
                    {{ project.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- GRID 2 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Public Complaints -->
            <div 
              v-if="db.projects[3]"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-500 lg:col-span-2 group relative overflow-hidden backdrop-blur-sm"
            >
              <div class="absolute inset-0 bg-gradient-to-tr from-[#587A55]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="relative z-10">
                <div class="rounded-2xl mb-6 relative overflow-hidden shadow-xs border border-black/5 flex items-center justify-center bg-white/50">
                  <img 
                    :src="db.projects[3].image" 
                    :alt="db.projects[3].name" 
                    class="w-full h-64 object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in db.projects[3].tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide transition-transform duration-300 hover:scale-110 cursor-default"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-2xl font-bold text-[#3D5242] tracking-tight group-hover:text-[#52714f] transition-colors duration-300">
                    {{ db.projects[3].name }}
                  </h3>
                  <p class="text-sm md:text-base text-[#3D5242]/80 leading-relaxed">
                    {{ db.projects[3].desc }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Ticketing App -->
            <div 
              v-if="db.projects[4]"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
            >
              <div class="absolute inset-0 bg-gradient-to-tr from-[#587A55]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="relative z-10">
                <div class="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center p-4 border border-black/5">
                  <img 
                    :src="db.projects[4].image" 
                    :alt="db.projects[4].name" 
                    class="w-3/4 max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in db.projects[4].tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide transition-transform duration-300 hover:scale-110 cursor-default"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-[#3D5242] tracking-tight group-hover:text-[#52714f] transition-colors duration-300">
                    {{ db.projects[4].name }}
                  </h3>
                  <p class="text-sm text-[#3D5242]/80 leading-relaxed">
                    {{ db.projects[4].desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- GRID 3 & 4 (Bisa disesuaikan dengan pola group hover yang sama) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="project in db.projects.slice(5, 7)" 
              :key="project.id"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
            >
              <div class="absolute inset-0 bg-gradient-to-tr from-[#587A55]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="relative z-10">
                <div class="aspect-video rounded-2xl mb-6 relative overflow-hidden shadow-xs border border-black/5 flex items-center justify-center bg-white/50">
                  <img 
                    :src="project.image" 
                    :alt="project.name" 
                    class="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in project.tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide transition-transform duration-300 hover:scale-110 cursor-default"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-2xl font-bold text-[#3D5242] tracking-tight group-hover:text-[#52714f] transition-colors duration-300">
                    {{ project.name }}
                  </h3>
                  <p class="text-sm md:text-base text-[#3D5242]/80 leading-relaxed">
                    {{ project.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tombol "View All Projects" dengan Efek Bounce & Glow -->
        <div class="text-center pt-12">
          <a 
            href="https://github.com/KafiyaNuril" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center space-x-2 bg-[#52714f] hover:bg-[#314336] px-8 py-4 rounded-2xl text-[#FDFBF7] font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 group"
          >
            <span>View All Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>