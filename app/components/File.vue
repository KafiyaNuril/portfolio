<template>
  <section class="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-8">
    
    <!-- Pattern Gelombang Kiri -->
    <img 
      src="/images/wavy-left.png" 
      alt="Wavy Background Left" 
      class="absolute left-0 top-0 bottom-0 h-full w-auto max-w-30 md:max-w-40 object-cover pointer-events-none select-none z-0 animate-fade-in-left duration-1000"
    />

    <!-- Pattern Gelombang Kanan -->
    <img 
      src="/images/wavy-right.png" 
      alt="Wavy Background Right" 
      class="absolute right-0 top-0 bottom-0 h-full w-auto max-w-30 md:max-w-40 object-cover pointer-events-none select-none z-0 animate-fade-in-right duration-1000"
    />

    <!-- Container Utama Desktop & Mobile Layout -->
    <div class="relative w-full max-w-5xl min-h-137.5 md:min-h-150 flex flex-col justify-between items-center z-10 my-auto">
      
      <!-- Judul Utama (My Project) di Tengah dengan Efek Muncul & Hover -->
      <div class="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-center my-8 md:my-0 animate-fade-in-up duration-700">
        <h1 class="font-italianno text-7xl sm:text-8xl md:text-9xl text-[#4a6b51] tracking-wide select-none hover:scale-105 transition-transform duration-300 cursor-default">
          My Project
        </h1>
      </div>

      <!-- Grid Folder Desktop (Absolute Posisi Presisi dengan Animasi Masuk & Floating Halus) -->
      <div class="hidden md:block w-full h-full absolute inset-0">
        
        <!-- 1. Internship -->
        <NuxtLink 
          to="/projects/internship" 
          class="absolute left-[10%] top-[12%] flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-fade-in-up"
          style="animation-delay: 100ms;"
        >
          <img src="/images/internship.png" alt="Internship Folder" class="w-17 h-17 object-contain drop-shadow-md group-hover:rotate-3 transition-transform" />
          <span class="mt-1 text-xs font-semibold text-[#333] group-hover:text-[#4a6b51] group-hover:font-bold">Internship</span>
        </NuxtLink>

        <!-- 2. Personal -->
        <NuxtLink 
          to="/projects/personal" 
          class="absolute left-[47%] top-[14%] -translate-x-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-fade-in-up"
          style="animation-delay: 200ms;"
        >
          <img src="/images/personal.png" alt="Personal Folder" class="w-17 h-17 object-contain drop-shadow-md group-hover:-rotate-3 transition-transform" />
          <span class="mt-1 text-xs font-semibold text-[#333] group-hover:text-[#4a6b51] group-hover:font-bold">Personal</span>
        </NuxtLink>

        <!-- 3. Tools -->
        <NuxtLink 
          to="/projects/tools" 
          class="absolute right-[12%] top-[14%] flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-fade-in-up"
          style="animation-delay: 300ms;"
        >
          <img src="/images/tools.png" alt="Tools Folder" class="w-23 h-23 object-contain drop-shadow-md group-hover:rotate-3 transition-transform" />
          <span class="mt-1 text-xs font-semibold text-[#333] group-hover:text-[#4a6b51] group-hover:font-bold">Tools</span>
        </NuxtLink>

        <!-- 4. Freelance -->
        <NuxtLink 
          to="/projects/freelance" 
          class="absolute left-[26%] bottom-[16%] flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-fade-in-up"
          style="animation-delay: 400ms;"
        >
          <img src="/images/freelance.png" alt="Freelance Folder" class="w-20 h-20 object-contain drop-shadow-md group-hover:-rotate-3 transition-transform" />
          <span class="mt-1 text-xs font-semibold text-[#333] group-hover:text-[#4a6b51] group-hover:font-bold">Freelance</span>
        </NuxtLink>

        <!-- 5. Certificates -->
        <NuxtLink 
          to="/projects/certificates" 
          class="absolute right-[33%] bottom-[20%] flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-fade-in-up"
          style="animation-delay: 500ms;"
        >
          <img src="/images/certificates.png" alt="Certificates Folder" class="w-15 h-15 object-contain drop-shadow-md group-hover:rotate-3 transition-transform" />
          <span class="mt-1 text-xs font-semibold text-[#333] group-hover:text-[#4a6b51] group-hover:font-bold">Certificates</span>
        </NuxtLink>

        <!-- 6. Journey -->
        <NuxtLink 
          to="/projects/journey" 
          class="absolute right-[18%] bottom-[14%] flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 animate-fade-in-up"
          style="animation-delay: 600ms;"
        >
          <img src="/images/journey.png" alt="Journey Folder" class="w-16 h-16 object-contain drop-shadow-md group-hover:-rotate-3 transition-transform" />
          <span class="mt-1 text-xs font-semibold text-[#333] group-hover:text-[#4a6b51] group-hover:font-bold">Journey</span>
        </NuxtLink>

      </div>

      <!-- Responsive Grid untuk Layar HP / Mobile -->
      <div class="grid md:hidden grid-cols-2 sm:grid-cols-3 gap-6 w-full px-8 pt-4 animate-fade-in-up">
        <NuxtLink 
          v-for="folder in folders" 
          :key="folder.title"
          :to="folder.link"
          class="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110"
        >
          <img :src="folder.img" :alt="folder.title" class="w-16 h-16 object-contain drop-shadow-md group-hover:rotate-3 transition-transform" />
          <span class="mt-1 text-xs font-semibold text-[#333] group-hover:text-[#4a6b51] group-hover:font-bold">{{ folder.title }}</span>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup>
const folders = [
  { title: 'Internship', img: '/images/internship.png', link: '/projects/internship' },
  { title: 'Personal', img: '/images/personal.png', link: '/projects/personal' },
  { title: 'Tools', img: '/images/tools.png', link: '/projects/tools' },
  { title: 'Freelance', img: '/images/freelance.png', link: '/projects/freelance' },
  { title: 'Certificates', img: '/images/certificates.png', link: '/projects/certificates' },
  { title: 'Journey', img: '/images/journey.png', link: '/projects/journey' }
]
</script>

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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 1s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 1s ease-out forwards;
}
</style>