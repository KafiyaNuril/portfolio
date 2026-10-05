<template>
  <section class="relative w-full md:px-16 overflow-hidden min-h-screen flex items-center justify-center my-12">
    <div class="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-10">
      
      <!-- SISI KIRI: Foto Profil dengan Animasi Slide-in dari Kiri -->
      <div class="lg:col-span-5 flex flex-col items-center justify-center relative animate-fade-in-left duration-700">
        <h3 class="absolute -top-10 left-6 text-3xl md:text-5xl font-bold font-tai-heritage text-[#587A55] tracking-tight">
          Get to Know more
        </h3>

        <div class="relative mt-8 group">
          <!-- Profile dengan efek hover zoom halus -->
          <div class="w-full h-full md:w-90 md:h-130 overflow-hidden">
            <img 
              src="/images/profile.png" 
              alt="Kafiya Nuril Kautsar" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <!-- SISI KANAN: Detail Informasi dengan Animasi Slide-in dari Kanan -->
      <div class="lg:col-span-7 flex flex-col justify-center space-y-6 text-[#5a5a5a] font-montserrat animate-fade-in-right duration-700">
        
        <!-- Judul "About Me" Style Kaligrafi -->
        <h1 class="text-7xl md:text-8xl font-italianno text-[#587A55] leading-none mb-2 mt-5 hover:translate-x-1 transition-transform cursor-default">
          About Me
        </h1>

        <!-- Deskripsi Diri -->
        <div class="space-y-4 text-sm md:text-base mx-6 text-[#587A55] leading-relaxed">
          <p>
            I'm <strong class="text-[#587A55]">Kafiya Nuril Kautsar</strong>, a Software & Game Development graduate from Wikrama High School who bridges the gap between functional Fullstack engineering and intuitive UI/UX design.
          </p>
          <p>
            Backed by 6 months of hands-on industry experience at PT Median Talenta Raya, I build scalable web systems while crafting sleek visual experiences. I turn complex logic into smooth, user-centric digital products.
          </p>
        </div>

        <!-- Edukasi -->
        <div class="pt-2 mx-6 hover:translate-x-1 transition-transform">
          <h4 class="font-bold text-[#587A55] text-base md:text-lg">Education</h4>
          <p class="text-sm font-semibold md:text-base text-[#587A55]">2023 - 2026</p>
          <p class="text-sm md:text-base text-[#587A55]">SMK Wikrama Bogor</p>
        </div>

        <!-- Kontak & Sosial Media -->
        <div class="pt-4 space-y-3 mx-6 text-sm md:text-base text-[#587A55] font-bold">
          <!-- WhatsApp -->
          <div class="flex items-center space-x-3 hover:translate-x-1 transition-transform">
            <span class="w-6 h-6 flex items-center justify-center text-[#587A55]">
              <Icon name="ph:whatsapp-logo-fill" class="w-6 h-6" />
            </span>
            <span>(+62) 895-1687-5989</span>
          </div>

          <!-- Email -->
          <div class="flex items-center space-x-3 hover:translate-x-1 transition-transform">
            <span class="w-6 h-6 flex items-center justify-center text-[#587A55]">
              <Icon name="lucide:mail"/>
            </span>
            <span>kafiyanuril@gmail.com</span>
          </div>

          <!-- Instagram -->
          <div class="flex items-center space-x-3 hover:translate-x-1 transition-transform">
            <span class="w-6 h-6 flex items-center justify-center text-[#587A55]">
              <Icon name="lucide:instagram"/>
            </span>
            <span>@kafiyaanrll</span>
          </div>

          <!-- Badge LinkedIn & GitHub -->
          <div class="flex items-center space-x-3 pt-2">
            <a 
              href="https://www.linkedin.com/in/kafiyaanrll/" 
              target="_blank" 
              class="w-8 h-8 bg-[#d8ebd9] hover:bg-[#587A55] hover:text-white text-[#587A55] rounded-md flex items-center justify-center transition-all transform hover:scale-110 shadow-xs"
            >
              <Icon name="lucide:linkedin" class="w-4 h-4"/>
            </a>
            <a 
              href="https://github.com/KafiyaNuril" 
              target="_blank" 
              class="w-8 h-8 bg-[#d8ebd9] hover:bg-[#587A55] hover:text-white text-[#587A55] rounded-md flex items-center justify-center transition-all transform hover:scale-110 shadow-xs"
            >
              <Icon name="lucide:github" class="w-4 h-4"/>
            </a>
          </div>
        </div>

      </div>

    </div>

    <!-- Background Pattern Frame1 -->
    <img 
      src="/images/Frame1.png" 
      alt="Background Pattern" 
      class="absolute right-0 bottom-0 w-1/4 pointer-events-none opacity-80"
    />

    <!-- Gambar ASCII Pink (Sudah Mepet Bawah Kiri & Diperkecil) -->
    <img 
      src="/images/ASCII pink.png" 
      alt="ASCII Pink Decorative" 
      class="absolute left-0 bottom-0 w-48 md:w-64 pointer-events-none z-50 mb-20"
    />
  </section>
</template>

<style scoped>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
}
</style>