<template>
    <div class="ml-2 mt-px py-1 px-0.5 rounded cursor-pointer hover:bg-gray-300">
        <ChevronUpDownIcon class="w-3 h-3" :up="active && ascending" :down="active && !ascending" />
    </div>
</template>

<script setup lang="ts">
import ChevronUpDownIcon from "@/components/icons/ChevronUpDownIcon.vue";

const props = defineProps({
    active: {
        type: Boolean,
        required: true,
    },
    ascending: {
        type: Boolean,
        required: true,
    },
});
</script>