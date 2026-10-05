<template>
  <main class="overflow-x-hidden">
    <!-- Navbar bisa ditaruh di sini jika belum ada -->
    
    <Hero id="home" class="px-8 scroll-mt-20 transition-all duration-700" />
    <Stripe />
    
    <About id="about" class="scroll-mt-20 transition-all duration-700" />
    <Stripe />
    
    <File id="projects" class="scroll-mt-20 transition-all duration-700" />
    <Stripe />
    
    <Experience id="resume" class="scroll-mt-20 transition-all duration-700" />
    <Stripe />
    
    <Contact id="contact" class="scroll-mt-20 transition-all duration-700" />
  </main>
</template>

<style>
/* Mengaktifkan smooth scrolling secara global */
html {
  scroll-behavior: smooth;
}
</style>