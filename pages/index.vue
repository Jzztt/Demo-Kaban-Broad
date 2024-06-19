<template>
  <div class="container mx-auto overflow-hidden border-l border-r border-gray-200">
    <Navigation />
    <div class="flex">
      <div class="w-1/5">
        <Sidebar />
      </div>
      <div class="w-4/5 p-10">
        <KanbanBroad />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigation from "~/layouts/Navigation.vue";
import Sidebar from "~/layouts/SidebarLayout.vue";
import KanbanBroad from "~/layouts/KanbanBroad.vue";
</script>
