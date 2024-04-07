<template>
    <tr class="border-b border-gray-300">
        <slot :emit="emit" />
    </tr>
</template>
<script setup lang="ts">

const props = defineProps({
    orderBy: {
        type: [null, String],
        required: true,
    },
    orderAscending: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['order']);
</script>