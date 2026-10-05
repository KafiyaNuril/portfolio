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

const handleSubmit = async () => {
  loading.value = true;
  try {
    // Ganti URL di bawah dengan Endpoint Formspree kamu sendiri
    const response = await $fetch('https://formspree.io/f/xnpjaeen', {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json'
      }
    });

    alert("Thank you! Your message has been sent directly to my email.");
    form.name = "";
    form.email = "";
    form.message = "";
  } catch (error) {
    alert("Oops! Something went wrong. Please try again later.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="min-h-screen py-16 px-6 md:px-20 flex flex-col justify-center relative overflow-hidden">
    <div class="max-w-6xl mx-auto w-full z-10">
      <!-- Header -->
      <div class="mb-12">
        <h2 class="font-italianno text-6xl md:text-7xl text-[#4D6B53] mb-2">Let’s Connect !</h2>
        <p class="text-[#5A6E5E] text-lg font-tai-heritage">Feel free to contact me for collaboration, internship opportunities, or just to say hello!</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-center">
        <!-- Form Card (Kiri) -->
        <div class="lg:col-span-5 lg:col-start-2 bg-[#F5EFE6] p-5 md:p-6 rounded-2xl shadow-sm border border-[#EBE3D5]">
          <h3 class="text-lg font-bold text-[#4D6B53] mb-4">Send a Message</h3>

          <form @submit.prevent="handleSubmit" class="space-y-3.5">
            <div>
              <label class="block text-xs font-semibold text-[#5A6E5E] mb-1">Name</label>
              <input
                v-model="form.name"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                class="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[#E0D8C8] rounded-lg text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4D6B53]/50 transition"
                required
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#5A6E5E] mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="Enter Your email, ex. name@email.com"
                class="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[#E0D8C8] rounded-lg text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4D6B53]/50 transition"
                required
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#5A6E5E] mb-1">Message</label>
              <textarea
                v-model="form.message"
                name="message"
                rows="3"
                placeholder="Write your message here..."
                class="w-full px-3.5 py-2 bg-[#FAF6EE] border border-[#E0D8C8] rounded-lg text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4D6B53]/50 transition resize-none"
                required
              ></textarea>
            </div>

            <div class="flex justify-end pt-1">
              <button 
                type="submit" 
                :disabled="loading"
                class="bg-[#537058] hover:bg-[#435C47] text-white px-5 py-2 rounded-lg text-xs font-medium transition shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {{ loading ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Contact List (Kanan) -->
        <div class="lg:col-span-5 space-y-2.5 pt-2">
          <!-- WhatsApp / Phone -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0">
              <Icon name="ph:whatsapp-logo-fill" class="w-4 h-4" />
            </div>
            <span v-text="formattedPhone" class="text-sm font-semibold text-[#4D6B53]"></span>
          </div>

          <!-- Email -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0">
              <Icon name="lucide:mail"/>
            </div>
            <a :href="mailtoLink" v-text="userEmail" class="text-sm font-semibold text-[#4D6B53] hover:underline"></a>
          </div>

          <!-- Instagram -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0">
              <Icon name="lucide:instagram"/>
            </div>
            <a href="https://instagram.com/kafiyaanrll" target="_blank" class="text-sm font-semibold text-[#4D6B53] hover:underline"> @kafiyaanrll </a>
          </div>

          <!-- LinkedIn -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0">
              <Icon name="lucide:linkedin"/>
            </div>
            <a href="https://linkedin.com/in/kafiyaanrll" target="_blank" class="text-sm font-semibold text-[#4D6B53] hover:underline"> kafiyaanrll </a>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-[#D6E3D8] flex items-center justify-center text-[#4D6B53] shrink-0">
              <Icon name="ph:map-pin-fill" class="w-4 h-4" />
            </div>
            <span v-text="userAddress" class="text-sm font-semibold text-[#4D6B53]"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Pattern -->
    <img src="/images/ascii left.png" alt="Background Pattern" class="absolute right-0 bottom-0 w-1/3 pointer-events-none" />

    <!-- Decorative ASCII -->
    <img src="/images/ascii flower.png" alt="ASCII Pink Decorative" class="absolute left-0 bottom-0 w-1/4 md:w-60 pointer-events-none z-50 mb-10" />
  </section>
</template>