
<script setup>
import draggable from "vuedraggable";
import { z } from "zod";

const lanes = ref([]);
const showCard = ref(false);
const levelOptions = ["Low Level", "Medium Level", "High Level"];

const state = reactive({
  title: "",
  description: "",
  linkIssue: "",
  level: levelOptions[0],
});

const isEditing = reactive({
  value: false,
  ticketIndex: null,
  laneIndex: null,
});

const TicketSchema = z.object({
  title: z.string().min(8, "Must be at least 8 characters"),
  description: z.string().min(8, "Must be at least 8 characters"),
  linkIssue: z.string().min(8, "Must be at least 8 characters"),
  level: z.enum(levelOptions),
});

const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    lanes.value = JSON.parse(savedTasks);
  } else {
    lanes.value = [
      {
        name: "To Do",
        tickets: [
          {
            title:
              "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
            author: "Philip J. Fry",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 12,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 1,
          },
          {
            title:
              "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
            author: "Bender Bending Rodriguez",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
            author: "Professor Farnsworth",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 0,
          },
          {
            title:
              "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
            author: "Amy Wong",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 56,
          },
          {
            title:
              "Robot 1-X, save my friends! And Zoidberg! Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you!",
            author: "Hermes Conrad",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 10,
          },
          {
            title:
              "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
            author: "Dr. John A. Zoidberg",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 3,
          },
        ],
      },
      {
        name: "In Progress",
        tickets: [
          {
            title:
              "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
            author: "Dr. John A. Zoidberg",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
            author: "Amy Wong",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 2,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 12,
          },
        ],
      },
      {
        name: "Done",
        tickets: [
          {
            title: "Demo",
            author: "hienlv12",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
            author: "Bender Bending Rodriguez",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
            author: "Professor Farnsworth",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 0,
          },
          {
            title:
              "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
            author: "Philip J. Fry",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 12,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 1,
          },
        ],
      },
    ];
  }
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(lanes.value));
};

const onEnd = () => {
  saveTasks();
};

const dragOptions = computed(() => {
  return {
    animation: 200,
    disable: false,
    ghostClass: "ghost",
  };
});
const validate = (state) => {
  try {
    TicketSchema.parse(state);
    return [];
  } catch (e) {
    if (e instanceof z.ZodError) {
      return e.errors.map((err) => ({
        path: err.path[0],
        message: err.message,
      }));
    }
    return [{ path: "unknown", message: "An unknown error occurred" }];
  }
};

const handleShowCard = (payload, laneIndex, ticketIndex) => {
  showCard.value = true;
  if (payload) {
    isEditing.laneIndex = laneIndex;
    isEditing.value = true;
    isEditing.ticketIndex = ticketIndex;
    state.title = payload.title;
    state.description = payload.description;
    state.linkIssue = payload.linkIssue;
    state.level = payload.level;
  }
};
const handleDelete = (landIndex, ticketIndex) => {
  lanes.value[landIndex].tickets.splice(ticketIndex, 1);
  saveTasks();
};

async function onSubmit(event) {
  if (isEditing.value) {
    // Update the existing ticket
    lanes.value[isEditing.laneIndex].tickets[isEditing.ticketIndex] = {
      ...event.data,
    };
  } else {
    lanes.value[0].tickets.push(event.data);
  }

  showCard.value = false;
  isEditing.value = false;
  saveTasks();
}

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <KanbanBroadControl />
  <div>
    <div>
      <UButton
        class="text-white bg-blue-500 hover:bg-blue-700"
        icon="i-heroicons-plus"
        @click="handleShowCard()"
        >Add Ticket</UButton
      >
    </div>
    <Teleport to="body">
      <UModal v-model="showCard">
        <div class="p-4">
          <div class="text-lg font-semibold">Create new Ticket</div>
          <div class="p-4">
            <UForm
              class="space-y-4"
              :validate="validate"
              :state="state"
              @submit="onSubmit"
            >
              <UFormGroup label="Title" name="title">
                <UInput autofocus="false" v-model="state.title" />
              </UFormGroup>

              <UFormGroup label="Description" name="description">
                <UTextarea v-model="state.description" type="text" />
              </UFormGroup>

              <UFormGroup label="Link Issue" name="linkIssue">
                <UInput v-model="state.linkIssue" type="text" />
              </UFormGroup>

              <UFormGroup label="Level Issue" name="levelIssue">
                <USelect v-model="state.level" :options="levelOptions" />
              </UFormGroup>

              <UButton type="submit"> Submit </UButton>
            </UForm>
          </div>
        </div>
      </UModal>
    </Teleport>
  </div>
  <div class="grid grid-cols-3 gap-6">
    <div
      v-for="(lane, laneIndex) in lanes"
      :key="lane.name"
      class="border border-gray-300 rounded-md bg-gray-50"
    >
      <div
        class="flex justify-between p-4 bg-white border-b border-gray-300 rounded-t-md item-center"
      >
        <div class="text-lg font-semibold">{{ lane.name }}</div>
        <div class="flex items-center space-x-4">
          <button
            class="font-semibold text-blue-500 hover:text-blue-700"
            v-if="lane.name == 'Done'"
          >
            Clear All
          </button>
          <span
            class="block px-3 py-1 text-sm font-semibold bg-gray-200 rounded-xl"
          >
            {{ lane.tickets.length }}
          </span>
        </div>
      </div>
      <div class="h-full p-4">
        <draggable
          class="min-h-full"
          v-model="lane.tickets"
          group="tickets"
          @start="drag = true"
          @end="onEnd"
          item-key="name"
          v-bind="dragOptions"
        >
          <template #item="{ element, index }">
            <Ticket
              :handleDelete="handleDelete"
              :handelShowOrUpdateCard="handleShowCard"
              :ticket="element"
              :laneIndex="laneIndex"
              :index="index"
            />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

