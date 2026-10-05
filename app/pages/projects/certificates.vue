<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')

// State untuk Modal Lightbox Zoom Sertifikat
const selectedCert = ref<{ id: number | string; image: string; name?: string } | null>(null)

const openLightbox = (cert: { id: number | string; image: string; name?: string }) => {
  selectedCert.value = cert
}

const closeLightbox = () => {
  selectedCert.value = null
}

const getCertificateName = (cert: unknown) => {
  if (cert && typeof cert === 'object' && 'name' in cert && typeof cert.name === 'string') {
    return cert.name
  }

  return undefined
}
</script>

<template>
  <section class="relative w-full min-h-screen py-12 text-[#587A55] mb-20 overflow-x-hidden">
    
    <!-- Loading State -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-20 text-[#587A55] space-y-3 animate-pulse">
      <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin" />
      <p class="font-medium">Loading certificates...</p>
    </div>

    <div v-else-if="db?.certificates" class="max-w-6xl mx-auto px-4 space-y-12">
      
      <!-- Heading Section -->
      <div class="flex items-center gap-4 mb-10">
        <button 
          @click="goBack" 
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 cursor-pointer hover:rotate-[-12deg] active:scale-95"
          title="Go Back"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div class="flex items-baseline gap-2 flex-wrap group cursor-default">
          <h1 class="text-4xl md:text-8xl font-xanh-mono text-[#587A55] transition-transform duration-500 group-hover:scale-105">
            My
          </h1>
          <h1 class="text-5xl md:text-9xl font-italianno text-[#587A55] transition-transform duration-500 group-hover:scale-105">
            Certificates
          </h1>
        </div>
      </div>

      <!-- Certificates Grid dengan Animasi Entry & Hover Interaktif -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="(cert, index) in db.certificates" 
          :key="cert.id"
          @click="openLightbox(cert)"
          class="group relative rounded-2xl p-2.5 border border-[#3D5242]/15 bg-white/60 backdrop-blur-xs shadow-xs hover:shadow-xl hover:-translate-y-2 hover:border-[#587A55]/40 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden cursor-pointer animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Container Gambar -->
          <div class="relative w-full aspect-4/3 rounded-xl overflow-hidden border border-black/5 bg-[#F9F9F9]">
            <img 
              :src="cert.image" 
              :alt="getCertificateName(cert) || 'Certificate'"
              class="w-full h-full object-cover rounded-lg group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            <!-- Shimmer / Shine Overlay Effect -->
            <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

            <!-- Dark Overlay + Icon Zoom saat Hover -->
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="w-10 h-10 rounded-full bg-white/90 text-[#3D5242] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Icon name="lucide:zoom-in" class="w-5 h-5" />
              </div>
            </div>
          </div>

          <!-- Label Nama Sertifikat (opsional, jika ada nama di data JSON) -->
          <p v-if="getCertificateName(cert)" class="mt-2 text-xs md:text-sm font-medium text-[#3D5242] text-center line-clamp-1 group-hover:text-[#587A55] transition-colors duration-300">
            {{ getCertificateName(cert) }}
          </p>
        </div>
      </div>

    </div>

    <!-- Modal Lightbox (Preview Sertifikat Ukuran Penuh) -->
    <Transition name="fade">
      <div 
        v-if="selectedCert" 
        @click="closeLightbox"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
      >
        <div class="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center animate-scale-up" @click.stop>
          <!-- Tombol Close Modal -->
          <button 
            @click="closeLightbox"
            class="absolute -top-12 right-0 sm:-right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer"
            title="Close"
          >
            <Icon name="lucide:x" class="w-6 h-6" />
          </button>

          <!-- Gambar Sertifikat Full -->
          <img 
            :src="selectedCert.image" 
            :alt="selectedCert.name || 'Certificate Detail'"
            class="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
          />

          <!-- Judul / Nama Sertifikat di Modal -->
          <p v-if="selectedCert.name" class="mt-4 text-white text-base sm:text-lg font-medium text-center">
            {{ selectedCert.name }}
          </p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* Keyframe Entry Fade-In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Modal Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal Content Scale Animation */
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>