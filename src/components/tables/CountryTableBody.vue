<template>
    <tr class="border-b border-gray-300 last:border-b-0 bg-gray-200">
        <td class="align-top pl-2 py-2">{{ title }}</td>
        <td class="align-top pl-2 py-2">
            <div class="flex">
                {{ show ? 'Headline' : ''}}
                <ButtonSort v-if="show" :active="orderBy === 'headline'" :ascending="orderAscending" @click="handleOrderBy('headline')" />
            </div>
        </td>
        <td class="align-top pl-2 py-2">
            <div class="flex">
                {{ show ? 'Name' : ''}}
                <ButtonSort v-if="show" :active="orderBy === 'name'" :ascending="orderAscending" @click="handleOrderBy('name')" />
            </div>
        </td>
        <td class="relative py-2 px-2">
            <div class="flex">
                {{ show ? 'Product' : ''}}
                <ButtonSort v-if="show" :active="orderBy === 'product'" :ascending="orderAscending" @click="handleOrderBy('product')" />
                <ButtonExpand :class="show ? 'rotate-180' : ''" @click.stop="show = !show" />
            </div>
        </td>
    </tr>
    <template v-if="show">
        <tr v-for="(item) in tableData" :key="item.uuid" class="border-b border-gray-300 last:border-b-0">
            <td class="relative align-top pl-2 py-2">{{ title }}</td>
            <td class="align-top pl-2 py-2">{{ item['headline'] }}</td>
            <td class="align-top pl-2 py-2">{{ item['name'] }}</td>
            <td class="align-top px-2 py-2">{{ item['product']}}</td>
        </tr>
    </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import _ from 'lodash';
import ButtonSort from "@/components/buttons/ButtonSort.vue";
import ButtonExpand from "@/components/buttons/ButtonExpand.vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
});

const show = ref(false);
const orderBy = ref(null);
const orderAscending = ref(true);

const tableData = ref(props.data);

const handleOrderBy = (key: string) => {
    if (!show.value) return;

    if (orderBy.value === key ) {
        orderAscending.value = !orderAscending.value;
    }

    orderBy.value = key;
    tableData.value = _.orderBy(tableData.value, key, orderAscending.value ? 'asc' : 'desc');
}

</script>