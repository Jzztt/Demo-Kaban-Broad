
<script setup>
definePageMeta({
  title: "Login",
  layout: "empty",
  public: true,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
import { toast } from "vue3-toastify";
import { LoginSchema } from "~/schemas/Login.schema";
import { AuthServices } from "~/services/auth";

const { signIn } = useAuth();

const isLoading = ref(false);

const formState = reactive({
  email: undefined,
  password: undefined,
});

const handleLogin = async (event) => {
  isLoading.value = true;
  const { signIn} = useAuth();

  try {
    await signIn({ ...event.data }, { callbackUrl: "/" });
    isLoading.value = false;
  } catch (error) {
    console.error("Login failed:", error);
    isLoading.value = false;
  }
}
</script>
<template>
  <WrapperAuth title="Login to your account">
    <UForm :state="formState" :schema="LoginSchema" @submit="handleLogin">
      <UFormGroup
        name="email"
        label="Email"
        class="mb-4"
        :ui="{ label: { base: 'text-white' } }"
      >
        <UInput
          placeholder="hienlv12@email.com"
          v-model="formState.email"
          type="email"
          inputClass="bg-transparent text-white"
        />
      </UFormGroup>

      <UFormGroup
        name="password"
        label="Password"
        class="mb-4"
        :ui="{ label: { base: 'text-white' } }"
      >
        <UInput
          placeholder="********"
          trailingIcon="i-heroicons-lock-closed"
          v-model="formState.password"
          type="password"
          inputClass="bg-transparent text-white"
        />
      </UFormGroup>

      <UButton block type="submit" class="w-full my-2" :loading="isLoading"
        >Login</UButton
      >
    </UForm>
  </WrapperAuth>
</template>



<style >
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>