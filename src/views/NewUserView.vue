<script setup lang="ts">
import { useRouter } from 'vue-router'
import UserForm from '@/components/UserForm.vue'
import type { User } from '@/types/user.ts'
import { watch } from 'vue'
import { useAddUser } from '@/mixins/users.ts'

const router = useRouter()
const { mutate, isSuccess, isPending } = useAddUser()

const handleUpdate = (newUser: Omit<User, 'id' | 'lastVisitedAt'>) => {
  mutate(newUser)
}

watch(isSuccess, () => {
  if (isSuccess.value) {
    router.push('/')
  }
})
</script>

<template>
  <main>
    <div class="info">
      <RouterLink :to="{ name: 'userList' }">←</RouterLink>
      <h1>Add User</h1>
    </div>
    <user-form @submit="handleUpdate" :is-disabled="isPending" />
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
