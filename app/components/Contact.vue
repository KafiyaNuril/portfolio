<script setup lang="ts">
interface User {
  phone: string;
  email: string;
  address: string;
}

const { data: dbData } = await useFetch("/api/portfolio");
const user = computed<User | undefined>(() => dbData.value?.user);

const formattedPhone = computed(() => {
  if (!user.value?.phone) return "";
  const parts = user.value.phone.split(" ");
  const code = parts[0] || "";
  const number = parts.slice(1).join(" ");
  return `(${code}) ${number}`;
});

const userEmail = computed(() => user.value?.email || "");
const userAddress = computed(() => (user.value?.address ? `${user.value.address}, Jawa Barat, Indonesia` : ""));

const mailtoLink = computed(() => {
  return user.value?.email ? `mailto:${user.value.email}` : "#";
});

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const successMessage = ref(false);
const errorMessage = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  successMessage.value = false;
  errorMessage.value = false;

  try {
    const response = await $fetch('https://formspree.io/f/xnpjaeen', {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json'
      }
    });

    successMessage.value = true;
    form.name = "";
    form.email = "";
    form.message = "";
    
    // Hilangkan pesan sukses setelah 5 detik
    setTimeout(() => {
      successMessage.value = false;
    }, 5000);
  } catch (error) {
    errorMessage.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="min-h-screen py-16 px-6 md:px-20 flex flex-col justify-center relative overflow-hidden">
    <div class="max-w-6xl mx-auto w-full z-10">
      
      <!-- Header dengan Animasi Muncul -->
      <div class="mb-12 animate-fade-in-up">
        <h2 class="font-italianno text-6xl md:text-7xl text-[#4D6B53] mb-2">Let’s Connect !</h2>
        <p class="text-[#5A6E5E] text-lg font-tai-heritage">Feel free to contact me for collaboration, internship opportunities, or just to say hello!</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-center">
        
        <!-- Form Card (Kiri) -->
        <div class="lg:col-span-5 lg:col-start-2 bg-[#F5EFE6] p-6 md:p-8 rounded-2xl shadow-md border border-[#EBE3D5] transition-all duration-300 hover:shadow-lg animate-fade-in-up" style="animation-delay: 150ms;">
          <h3 class="text-lg font-bold text-[#4D6B53] mb-4">Send a Message</h3>

          <!-- Notifikasi Sukses Interaktif -->
          <transition name="fade">
            <div v-if="successMessage" class="mb-4 p-3 bg-[#D6E3D8] text-[#3b533f] text-xs font-semibold rounded-lg flex items-center gap-2">
              <Icon name="lucide:check-circle" class="w-4 h-4 shrink-0" />
              <span>Thank you! Your message has been sent directly to my email.</span>
            </div>
          </transition>

          <!-- Notifikasi Gagal Interaktif -->
          <transition name="fade">
            <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 text-xs font-semibold rounded-lg flex items-center gap-2">
              <Icon name="lucide:alert-circle" class="w-4 h-4 shrink-0" />
              <span>Oops! Something went wrong. Please try again later.</span>
            </div>
          </transition>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="group">
              <label class="block text-xs font-semibold text-[#5A6E5E] mb-1 group-focus-within:text-[#4D6B53] transition-colors">Name</label>
              <input
                v-model="form.name"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E0D8C8] rounded-lg text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4D6B53]/50 focus:border-[#4D6B53] transition-all duration-200"
                required
              />
            </div>

            <div class="group">
              <label class="block text-xs font-semibold text-[#5A6E5E] mb-1 group-focus-within:text-[#4D6B53] transition-colors">Email</label>
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="Enter Your email, ex. name@email.com"
                class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E0D8C8] rounded-lg text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4D6B53]/50 focus:border-[#4D6B53] transition-all duration-200"
                required
              />
            </div>

            <div class="group">
              <label class="block text-xs font-semibold text-[#5A6E5E] mb-1 group-focus-within:text-[#4D6B53] transition-colors">Message</label>
              <textarea
                v-model="form.message"
                name="message"
                rows="3"
                placeholder="Write your message here..."
                class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E0D8C8] rounded-lg text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4D6B53]/50 focus:border-[#4D6B53] transition-all duration-200 resize-none"
                required
              ></textarea>
            </div>

            <div class="flex justify-end pt-1">
              <button 
                type="submit" 
                :disabled="loading"
                class="bg-[#537058] hover:bg-[#435C47] text-white px-6 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer flex items-center gap-2"
              >
                <span v-if="loading" class="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ loading ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Contact List (Kanan) dengan Efek Hover & Floating Halus -->
        <div class="lg:col-span-5 space-y-4 pt-2 animate-fade-in-up" style="animation-delay: 300ms;">
          
          <!-- WhatsApp -->
          <div class="flex items-center gap-3.5 group cursor-pointer transition-transform duration-300 hover:translate-x-2">
            <div class="w-10 h-10 rounded-xl bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0 transition-all duration-300 group-hover:bg-[#4D6B53] group-hover:text-white group-hover:rotate-6">
              <Icon name="ph:whatsapp-logo-fill" class="w-5 h-5" />
            </div>
            <span v-text="formattedPhone" class="text-sm font-semibold text-[#4D6B53] transition-colors group-hover:text-[#334a38]"></span>
          </div>

          <!-- Email -->
          <div class="flex items-center gap-3.5 group cursor-pointer transition-transform duration-300 hover:translate-x-2">
            <div class="w-10 h-10 rounded-xl bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0 transition-all duration-300 group-hover:bg-[#4D6B53] group-hover:text-white group-hover:rotate-6">
              <Icon name="lucide:mail" class="w-5 h-5"/>
            </div>
            <a :href="mailtoLink" v-text="userEmail" class="text-sm font-semibold text-[#4D6B53] hover:underline transition-colors"></a>
          </div>

          <!-- Instagram -->
          <div class="flex items-center gap-3.5 group cursor-pointer transition-transform duration-300 hover:translate-x-2">
            <div class="w-10 h-10 rounded-xl bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0 transition-all duration-300 group-hover:bg-[#4D6B53] group-hover:text-white group-hover:rotate-6">
              <Icon name="lucide:instagram" class="w-5 h-5"/>
            </div>
            <a href="https://instagram.com/kafiyaanrll" target="_blank" class="text-sm font-semibold text-[#4D6B53] hover:underline transition-colors"> @kafiyaanrll </a>
          </div>

          <!-- LinkedIn -->
          <div class="flex items-center gap-3.5 group cursor-pointer transition-transform duration-300 hover:translate-x-2">
            <div class="w-10 h-10 rounded-xl bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0 transition-all duration-300 group-hover:bg-[#4D6B53] group-hover:text-white group-hover:rotate-6">
              <Icon name="lucide:linkedin" class="w-5 h-5"/>
            </div>
            <a href="https://linkedin.com/in/kafiyaanrll" target="_blank" class="text-sm font-semibold text-[#4D6B53] hover:underline transition-colors"> kafiyaanrll </a>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-3.5 group cursor-pointer transition-transform duration-300 hover:translate-x-2">
            <div class="w-10 h-10 rounded-xl bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0 transition-all duration-300 group-hover:bg-[#4D6B53] group-hover:text-white group-hover:rotate-6">
              <Icon name="ph:map-pin-fill" class="w-5 h-5" />
            </div>
            <span v-text="userAddress" class="text-sm font-semibold text-[#4D6B53] transition-colors"></span>
          </div>

        </div>
      </div>
    </div>

    <!-- Background Pattern -->
    <img src="/images/ascii left.png" alt="Background Pattern" class="absolute right-0 bottom-0 w-1/3 pointer-events-none opacity-80" />

    <!-- Decorative ASCII -->
    <img src="/images/ascii flower.png" alt="ASCII Pink Decorative" class="absolute left-0 bottom-0 w-1/4 md:w-60 pointer-events-none z-50 mb-10" />
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>