<script setup>
import { RegisterSchema } from "~/schemas/Register.schema";
import { AuthServices } from "~/services/auth";

definePageMeta({
  auth: false,
})
const formState = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
});
const isLoading = ref(false);

const handleRegister = async (event) => {
  isLoading.value = true;
  const payload = event.data;
  const registerResponse = await AuthServices.register(payload);
  if (!registerResponse.success || !registerResponse.data) {
    toast.error("Error registering user");
    return;
  }
  isLoading.value = false;
  useRouter().push({ name: "auth-login" });
};
</script>

<template>
  <WrapperAuth title="Create a free account">
    <UForm :state="formState" :schema="RegisterSchema" @submit="handleRegister">
      <UFormGroup
        name="name"
        label="Name"
        class="mb-4"
        :ui="{ label: { base: 'text-white' } }"
      >
        <UInput
          v-model="formState.name"
          type="text"
          inputClass="bg-transparent text-white"
        />
      </UFormGroup>

      <UFormGroup
        name="email"
        label="Email"
        class="mb-4"
        :ui="{ label: { base: 'text-white' } }"
      >
        <UInput
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
          v-model="formState.password"
          type="password"
          inputClass="bg-transparent text-white"
        />
      </UFormGroup>

      <UButton block type="submit" class="w-full my-2" :loading="isLoading"
        >Register</UButton
      >
    </UForm>
  </WrapperAuth>
</template>



<style>
</style>