<template>
    <div class="flex flex-col w-full items-center space-y-12 py-16">
        <div class="flex space-x-4">
            <ButtonBase :class="view === 'country' ? 'bg-gray-200' : ''" @click="view = 'country'">Group by country</ButtonBase>
            <ButtonBase :class="view === 'product' ? 'bg-gray-200' : ''" @click="view = 'product'">Group by product</ButtonBase>
            <ButtonBase :class="view === 'map' ? 'bg-gray-200' : ''" @click="view = 'map'">Visualisation</ButtonBase>
        </div>
        <div class="w-full max-w-[1400px]" :class="view === 'map' ? '' : 'border border-gray-300 rounded'">
            <component :is="currentTable"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ButtonBase from "@/components/buttons/ButtonBase.vue";
import CountryTable from "@/components/tables/CountryTable.vue";
import ProductTable from "@/components/tables/ProductTable.vue";
import DataMap from "@/components/map/DataMap.vue";

const view = ref('country');

const currentTable = computed(() => {
    if (view.value === 'product') {
        return ProductTable;
    }

    if (view.value === 'map') {
        return DataMap;
    }

    return CountryTable;
});

</script>