<script lang="ts" setup>
import { reactive } from 'vue'
import type { User } from '@/types/user.ts'

const { user, isDisabled } = defineProps<{
  user?: Pick<User, 'firstName' | 'lastName' | 'email'>
  isDisabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', user: Pick<User, 'firstName' | 'lastName' | 'email'>): void
}>()

const form = reactive<Pick<User, 'firstName' | 'lastName' | 'email'>>({
  firstName: user?.firstName ?? '',
  lastName: user?.lastName ?? '',
  email: user?.email ?? '',
})

function handleSubmit() {
  emit('submit', form)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="field">
      <label>First Name</label>
      <input v-model="form.firstName" type="text" required />
    </div>

    <div class="field">
      <label>Last Name</label>
      <input v-model="form.lastName" type="text" required />
    </div>

    <div class="field">
      <label>Email</label>
      <input v-model="form.email" type="email" required />
    </div>

    <div class="actions">
    <button class="button" :disabled="isDisabled" type="submit">Save</button>
    <router-link class="button outline" :to="{ name: 'userList' }">Cancel</router-link>
    </div>
  </form>
</template>


<style scoped>
.form {
  max-width: 520px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #e5e7eb; /* gray-200 */
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #374151; /* gray-700 */
}

input[type='text'],
input[type='email'] {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.4;
  background: #fff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input:focus {
  outline: none;
  border-color: #2563eb; /* blue-600 */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.button {
  align-self: flex-end;
  padding: 8px 14px;
  border-radius: 6px;
  background: darkgreen;
  color: white;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
  line-height: 1.2;
  font-size: 16px;
  border: 1px solid darkgreen;
}

.outline {
  color: darkgreen;
  background: transparent;
  border: 1px solid darkgreen;
}

button[type='submit'][disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
