<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PaginationView from '@/components/PaginationView.vue'
import LoaderIndicator from '@/components/LoaderIndicator.vue'
import { useRemoveUser, useUserList } from '@/mixins/users.ts'
import UserList from '../components/userList/UserList.vue'
import type { UserSortField } from '@/types/user.ts'

const LIMIT = 10
const currentPage = ref(1)
const searchQuery = ref('')
const sortingField = ref<{ field: UserSortField; isAsc: boolean } | null>(null)
const params = computed(() => ({
  searchQuery: searchQuery.value,
  sortField: sortingField.value?.field,
  sortAsc: sortingField.value?.isAsc,
  limit: LIMIT,
  offset: (currentPage.value - 1) * LIMIT,
}))
const { data, isLoading } = useUserList(params)
const { mutate } = useRemoveUser()
const users = computed(() => data.value?.data)
const pagination = computed(() => data.value?.pagination)
const handleCurrentPageChange = (page: number) => {
  currentPage.value = page
}
const handleSort = (field: UserSortField, isAsc: boolean) => {
  sortingField.value = {
    field,
    isAsc,
  }
  currentPage.value = 1
}
watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<template>
  <main>
    <div class="filters">
      <input type="text" placeholder="Search" v-model="searchQuery" />
      <RouterLink class="add" :to="{ name: 'newUser' }">Add User</RouterLink>
    </div>
    <loader-indicator v-if="isLoading">Loading</loader-indicator>
    <user-list
      v-else
      :users="users"
      :remove-handler="mutate"
      :sort-field="sortingField?.field"
      :sort-asc="sortingField?.isAsc"
      @sort="handleSort"
    />
    <pagination-view
      v-if="!isLoading && pagination && pagination.totalPages > 1"
      :current-page="currentPage"
      :total-pages="pagination.totalPages"
      @update:page="handleCurrentPageChange"
    />
  </main>
</template>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.add {
  padding: 4px 8px;
  border-radius: 4px;
  background: darkgreen;
  color: white;
  cursor: pointer;
  min-width: 80px;
  display: inline-block;
  text-align: center;
  border: none;
  line-height: 1.2;
  font-size: 16px;
}
</style>
