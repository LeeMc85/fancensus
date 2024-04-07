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
                        Country
                        <ButtonSort :active="orderBy === 'countryname'" :ascending="orderAscending" @click="emit('order', 'countryname')" />
                    </div>
                </th>
                <th class="font-medium text-left pl-2 py-2 w-full"></th>
                <th class="font-medium text-left pl-2 py-2 min-w-[200px]"></th>
                <th class="font-medium text-left px-2 pr-2 py-2 min-w-[280px]"></th>
            </TableHeader>
        </template>
        <CountryTableBody v-for="(data, key) in table"
                        :key="key"
                        :title="key"
                        :data="data"
        />
    </AppTable>
</template>

<script setup lang="ts">
import {ref} from "vue";
import useData from "@/composables/useData.js";
import data from '@/assets/dataset1.json'

import AppTable from "@/components/tables/AppTable.vue";
import TableHeader from "@/components/tables/TableHeader.vue";
import CountryTableBody from "@/components/tables/CountryTableBody.vue";
import ButtonSort from "@/components/buttons/ButtonSort.vue";

const { groupByKey, orderByKey } = useData(data);

const table = ref(groupByKey('countryname'));

const orderBy = ref(null);
const orderAscending = ref(true);

const handleOrderBy = (key: string) => {
    if (orderBy.value === key ) {
        orderAscending.value = !orderAscending.value;
    }

    orderBy.value = key;

    let orderedData = orderByKey(key, orderAscending.value);
    table.value = groupByKey('countryname', orderedData)
}

</script>