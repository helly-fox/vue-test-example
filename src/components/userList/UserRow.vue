<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types/user.ts'
import { formatTimestamp } from '@/utils'

const { user } = defineProps<{
  user: User
  removeHandler?: (id: number) => void
}>()

const lastVisitedAt = computed(() =>
  user.lastVisitedAt ? formatTimestamp(user.lastVisitedAt) : '-',
)
const name = computed(() => `${user.firstName} ${user.lastName}`)
</script>

<template>
  <tr>
    <td>{{ name }}</td>
    <td>{{ user.email }}</td>
    <td>{{ lastVisitedAt }}</td>
    <td class="actions">
      <router-link class="edit" :to="{ name: 'userDetail', params: { id: user.id } }">Edit</router-link>
      <button type="button" class="remove" v-if="removeHandler" @click.stop.prevent="removeHandler?.(user.id)">Remove</button>
    </td>
  </tr>
</template>

<style scoped>
.actions {
  text-align: right;
}

td {
  padding: 8px;
}

.edit, .remove {
  padding: 4px 8px;
  border-radius: 4px;
  background: darkgreen;
  color: white;
  cursor: pointer;
  margin-left: 16px;
  min-width: 80px;
  display: inline-block;
  text-align: center;
  border: none;
  line-height: 1.2;
  font-size: 16px;
}

.remove {
  background: darkred;
}
</style>
