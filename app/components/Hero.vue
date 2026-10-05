<template>
  <div class="relative w-full mb-12 overflow-hidden">
    <section class="relative min-h-screen flex items-center justify-center">
      <!-- Ornamen Dekorasi Kiri dengan efek fade-in dan floating halus -->
      <img 
        src="/images/ornament-left.png" 
        alt="Ornament Left" 
        class="animate-fade-in-up absolute left-0 top-1/2 -translate-y-1/2 w-1/3 max-w-112.5 pointer-events-none opacity-80 animate-fade-in duration-1000"
      />

      <!-- Konten Teks Tengah dengan efek masuk bertahap (fade-in & slide-up) -->
      <div class="text-center z-10 px-4 animate-fade-in-up transition-all duration-700">
        <h2 class="text-7xl md:text-9xl font-italianno text-[#4a6b51] mb-2 hover:scale-105 transition-transform duration-300 cursor-default">
          Hallo !
        </h2>

        <p class="text-xl md:text-2xl text-[#4a6b51]/90 font-montserrat tracking-wide mb-1 opacity-90 animate-pulse">
          Welcome to My
        </p>

        <h1 class="text-7xl md:text-9xl font-bold text-[#4a6b51] tracking-tight font-tai-heritage hover:scale-105 transition-transform duration-300 cursor-default">
          Portfolio
        </h1>
      </div>

      <!-- Ornamen Dekorasi Kanan dengan efek fade-in -->
      <img 
        src="/images/ornament-right.png" 
        alt="Ornament Right" 
        class="animate-fade-in-up absolute right-0 top-1/2 -translate-y-1/2 w-1/3 max-w-112.5 pointer-events-none opacity-80 animate-fade-in duration-1000"
      />
    </section>
  </div>
</template>

<style scoped>
/* Tambahan keyframes opsional untuk animasi masuk yang lebih mulus */
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
  animation: fadeInUp 1s ease-out forwards;
}
</style>