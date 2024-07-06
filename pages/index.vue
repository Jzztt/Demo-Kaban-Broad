<template>
  <div
    class="container h-screen mx-auto overflow-hidden border-l border-r border-gray-200"
  >
    <Navigation :userName="userName" />
    <div class="flex">
      <div class="w-1/5">
        <Sidebar />
      </div>
      <div class="w-4/5 p-10">
        <ProjectTitle />
        <KanbanBroad :token="access_token" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Home",
  layout: "home",
  public: true,
});
import Navigation from "~/layouts/Navigation.vue";
import Sidebar from "~/layouts/SidebarLayout.vue";
import KanbanBroad from "~/layouts/KanbanBroad.vue";
import "vue3-toastify/dist/index.css";

const { data,  token } = useAuth();
const userName = ref(data.value.data.name);
const access_token = ref(token.value);

</script>