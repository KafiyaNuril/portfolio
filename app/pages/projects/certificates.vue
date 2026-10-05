<script setup lang="ts">
const router = useRouter()

const goBack = () => {
  router.back()
}

const { data: db, pending } = await useFetch('/api/portfolio')
</script>

<template>
  <section class="relative w-full min-h-screen py-12text-[#587A55] mb-20">
    
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20 text-[#587A55]">
      Loading certificates...
    </div>

    <div v-else-if="db?.certificates" class="max-w-6xl mx-auto px-4 space-y-12">
      
      <!-- Heading Section -->
      <div class="flex items-center gap-4 mb-10">
        <button 
          @click="goBack" 
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E2EBE2] hover:bg-[#587A55] text-[#587A55] hover:text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
          title="Go Back"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div class="flex items-baseline gap-2 flex-wrap">
          <h1 class="text-4xl md:text-8xl font-xanh-mono text-[#587A55]">
            My
          </h1>
          <h1 class="text-5xl md:text-9xl font-italianno text-[#587A55]">
            Certificates
          </h1>
        </div>
      </div>

      <!-- Certificates Grid (3 Kolom) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="cert in db.certificates" 
          :key="cert.id"
          class="rounded-2xl p-2 border border-[#3D5242]/15 shadow-xs hover:shadow-md transition-shadow duration-300 flex items-center justify-center overflow-hidden"
        >
          <div class="w-full aspect-4/3 rounded-xl overflow-hidden border border-black/5 bg-[#F9F9F9]">
            <img 
              :src="cert.image" 
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>