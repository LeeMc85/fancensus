<template>
    <AppTable>
        <template #header>
            <TableHeader v-slot="{ emit }"
                         :order-by="orderBy"
                         :order-ascending="orderAscending"
                         @order="handleOrderBy"
            >
                <th class="font-medium text-left pl-2 py-2 min-w-[150px]">
                    <div class="flex">
                        Product
                        <ButtonSort :active="orderBy === 'product'" :ascending="orderAscending" @click="emit('order', 'product')" />
                    </div>
                </th>
                <th class="font-medium text-left pl-2 py-2 pr-2 w-full"></th>
            </TableHeader>
        </template>
        <tr v-for="(data, key) in table" :key="key" class="border-b border-gray-300 last:border-b-0 bg-gray-200">
            <td class="align-top pl-2 py-2 w-full">{{ key }}</td>
            <td class="align-top pl-2 py-2 pr-2 text-right">{{ data.length }}</td>
        </tr>
    </AppTable>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import useData from "@/composables/useData.js";
import data from '@/assets/dataset1.json'

import AppTable from "@/components/tables/AppTable.vue";
import TableHeader from "@/components/tables/TableHeader.vue";
import ButtonSort from "@/components/buttons/ButtonSort.vue";

const { groupByKey, orderByKey } = useData(data);

const table = ref(groupByKey('product'));

const orderBy = ref(null);
const orderAscending = ref(true);

const handleOrderBy = (key: string) => {
    if (orderBy.value === key ) {
        orderAscending.value = !orderAscending.value;
    }

    orderBy.value = key;

    let orderedData = orderByKey(key, orderAscending.value);
    table.value = groupByKey('product', orderedData)
}

onMounted(() => {
    handleOrderBy('product');
})

</script>