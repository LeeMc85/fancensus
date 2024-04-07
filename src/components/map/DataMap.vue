<template>
    <div class="p-12">
        <MapSvg
            :country-data="dataFormatted"
            @mousemove="handleMouseMove"
            @enter="handleEnter"
            @leave="handleLeave"
        />

        <div v-if="showTooltip" class="absolute flex flex-col bg-white shadow p-2 rounded" :style="`left: ${x + 6}px; top: ${y + 6}px;`">
            <div>{{ country }}</div>
            <div>{{ total }}</div>
        </div>

        <div class="absolute flex flex-col bottom-12 left-1/2 -translate-x-1/2 w-[400px]">
            <div class="flex justify-between w-full">
                <span>Most</span>
                <span>Least</span>
            </div>
            <div class="w-full h-4 bg-gradient-to-r from-[#133276] to-[#5cf7ff] rounded-full"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import _ from 'lodash';
import useData from "@/composables/useData";
import data from '@/assets/dataset1.json'
import MapSvg from "@/components/map/MapSvg.vue";

const { groupByKey, getIsoFromCountryName, getCountryNameFromIso } = useData(data);

let dataRaw = groupByKey('countryname');
let dataFormatted = ref(_.flatMap(dataRaw, (value, key) => {
    return {
        country: getIsoFromCountryName(key),
        count: value.length,
    }
}));

const showTooltip = ref(false);
const x = ref(0);
const y = ref(0);

const country = ref('');
const total = ref(0);

const handleMouseMove = (e: object) => {
    x.value = e.clientX;
    y.value = e.clientY;
}

const handleEnter = (val: object) => {
    showTooltip.value = true;
    country.value = getCountryNameFromIso(val.iso);
    total.value = val.total;
}

const handleLeave = () => {
    showTooltip.value = false;
    country.value = '';
    total.value = 0;
}

</script>
