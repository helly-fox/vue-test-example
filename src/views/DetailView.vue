<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useEditUser, useUserDetail } from '@/mixins/users.ts'
import LoaderIndicator from '@/components/LoaderIndicator.vue'
import UserForm from '@/components/UserForm.vue'
import type { User } from '@/types/user.ts'
import { watch } from 'vue'

const router = useRouter()
const route = useRoute()

const { data: user, isLoading } = useUserDetail(route?.params?.id as string)
const { mutate, isSuccess, isPending } = useEditUser()

const handleUpdate = (updatedUser: Omit<User, 'id' | 'lastVisitedAt'>) => {
  if (user?.value?.id) {
    mutate({ ...user.value, ...updatedUser })
  }
}

watch(isSuccess, () => {
  if (isSuccess.value) {
    router.push('/')
  }
})
</script>

<template>
  <main>
    <loader-indicator v-if="isLoading" />
    <div v-else-if="user">
      <div class="info">
        <RouterLink :to="{ name: 'userList' }">←</RouterLink>
        <h1>{{ user?.email }}</h1>
      </div>
      <user-form :user="user" @submit="handleUpdate" :is-disabled="isPending" />
    </div>
    <div v-else>There is no such user. <RouterLink :to="{ name: 'userList' }">Back</RouterLink></div>
  </main>
</template>

<style scoped>
.info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
</style>
