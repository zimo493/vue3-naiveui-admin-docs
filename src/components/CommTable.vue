<template>
  <NTable single-column>
    <thead>
      <tr>
        <th>名称</th>
        <th>类型</th>
        <th>必传</th>
        <th>默认值</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data">
        <td v-for="v in item">
          <template v-if="typeof v === 'string'">{{ v }}</template>
          <template v-else>
            <NButton
              tag="a"
              text
              :href="v.url"
              :target="v.inside ? '' : '_blank'"
            >
              {{ v.name }}
            </NButton>
          </template>
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<script lang="ts" setup>
import { NTable, NButton } from "naive-ui";

defineProps(["data"]);
</script>
