<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types/user.ts'
import type { UserSortField } from '@/types/user.ts'
import UserRow from '@/components/userList/UserRow.vue'

const { users, sortField, sortAsc, removeHandler } = defineProps<{
  users?: User[]
  removeHandler?: (id: number) => void
  sortField?: UserSortField
  sortAsc?: boolean
}>()

const emit = defineEmits<{
  (e: 'sort', field: UserSortField, isAsc: boolean): void
}>()

const isEmpty = computed(() => !users || users.length < 1)

const onSortClick = (field: UserSortField) => {
  const isSame = sortField === field
  const nextAsc = isSame ? !sortAsc : true
  emit('sort', field, nextAsc)
}
</script>

<template>
  <span v-if="isEmpty">There are no items yet</span>
  <table v-else>
    <thead>
      <tr>
        <th class="sortable" @click="onSortClick('name')">
          Name <span v-if="sortField === 'name'">{{ sortAsc ? '▲' : '▼' }}</span>
        </th>
        <th class="sortable" @click="onSortClick('email')">
          Email <span v-if="sortField === 'email'">{{ sortAsc ? '▲' : '▼' }}</span>
        </th>
        <th class="sortable" @click="onSortClick('lastVisitedAt')">
          Last visit
          <span v-if="sortField === 'lastVisitedAt'">{{ sortAsc ? '▲' : '▼' }}</span>
        </th>
        <th class="actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <user-row v-for="user in users" :key="user.id" :user="user" :removeHandler="removeHandler" />
    </tbody>
  </table>
</template>
<style scoped>
table {
  width: 100%;
}

th {
  text-align: left;
}

th.sortable {
  cursor: pointer;
}

th.actions {
  text-align: right;
}
</style>
