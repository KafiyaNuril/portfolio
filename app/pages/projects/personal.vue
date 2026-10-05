<script setup lang="ts">
const router = useRouter()

// Fungsi untuk kembali ke halaman sebelumnya
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
</script>

<template>
  <section class="relative w-full min-h-screen py-12">

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20 text-[#587A55]">
      Loading project data...
    </div>

    <div v-else-if="db?.projects" class="space-y-20">
      
      <!-- ================= SECTION 1: MY PROJECTS ================= -->
      <div class="max-w-6xl mx-auto px-4">
        
        <!-- Heading -->
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
                Personal
              </h1>
            </div>
            <span class="text-2xl md:text-5xl font-medium text-[#587A55]">
              Project
            </span>
          </div>
        </div>

        <!-- Project List Loop -->
        <div class="space-y-6">
          <!-- grid 1 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(project, idx) in db.projects.slice(0, 3)" 
              :key="project.id"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <!-- Container Gambar Preview -->
                <div class="rounded-2xl mb-6 relative overflow-hidden shadow-xs border border-black/5 flex items-center justify-center">
                  <img 
                    :src="project.image" 
                    :alt="project.name" 
                    class="w-full h-full object-cover object-top rounded-xl hover:scale-102 transition-transform duration-500"
                  />
                </div>

                <!-- Badges, Judul & Deskripsi -->
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in project.tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-[#3D5242] tracking-tight">
                    {{ project.name }}
                  </h3>
                  <p class="text-sm text-[#3D5242]/80 leading-relaxed">
                    {{ project.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- GRID 2-->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Public Complaints (lg:col-span-2) -->
            <div 
              v-if="db.projects[3]"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 lg:col-span-2"
            >
              <div>
                <div class="aspect rounded-2xl mb-6 relative overflow-hidden shadow-xs border border-black/5 flex items-center justify-center">
                  <img 
                    :src="db.projects[3].image" 
                    :alt="db.projects[3].name" 
                    class="w-full h-full object-cover object-top rounded-xl hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in db.projects[3].tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-2xl font-bold text-[#3D5242] tracking-tight">
                    {{ db.projects[3].name }}
                  </h3>
                  <p class="text-sm md:text-base text-[#3D5242]/80 leading-relaxed">
                    {{ db.projects[3].desc }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Ticketing App (1 Kolom) -->
            <div 
              v-if="db.projects[4]"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div class="aspect-square bg-linear-to-br from-purple-100 to-blue-100 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center p-4 border border-black/5">
                  <img 
                    :src="db.projects[4].image" 
                    :alt="db.projects[4].name" 
                    class="w-3/4 max-h-full object-contain hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in db.projects[4].tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-[#3D5242] tracking-tight">
                    {{ db.projects[4].name }}
                  </h3>
                  <p class="text-sm text-[#3D5242]/80 leading-relaxed">
                    {{ db.projects[4].desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- GRID 3-->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="(project, idx) in db.projects.slice(5, 7)" 
              :key="project.id"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div class="aspect-video rounded-2xl mb-6 relative overflow-hidden shadow-xs border border-black/5 flex items-center justify-center">
                  <img 
                    :src="project.image" 
                    :alt="project.name" 
                    class="w-full h-full object-cover object-top rounded-xl hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in project.tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-2xl font-bold text-[#3D5242] tracking-tight">
                    {{ project.name }}
                  </h3>
                  <p class="text-sm md:text-base text-[#3D5242]/80 leading-relaxed">
                    {{ project.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- GRID 4-->
          <div v-if="db.projects.length > 7" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(project, idx) in db.projects.slice(7)" 
              :key="project.id"
              class="bg-[#fffaf3a4] border border-[#3D5242]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div class="aspect-video rounded-2xl mb-6 relative overflow-hidden shadow-xs border border-black/5 flex items-center justify-center">
                  <img 
                    :src="project.image" 
                    :alt="project.name" 
                    class="w-full h-full object-cover object-top rounded-xl hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tool, tIdx) in project.tools" 
                      :key="tool" 
                      class="text-xs px-3 py-1 rounded-full font-semibold tracking-wide"
                      :class="getToolStyle(tIdx)"
                    >
                      {{ tool }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-[#3D5242] tracking-tight">
                    {{ project.name }}
                  </h3>
                  <p class="text-sm text-[#3D5242]/80 leading-relaxed">
                    {{ project.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-8">
          <a 
            href="https://github.com/KafiyaNuril" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center space-x-2 bg-[#52714f] hover:bg-[#314336] px-8 py-4 rounded-2xl text-[#FDFBF7] font-medium transition-all shadow-md"
          >
            <span>View All Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>