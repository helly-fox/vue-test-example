<script setup lang="ts">
import { computed } from 'vue'

const { currentPage, totalPages } = defineProps<{
  currentPage: number
  totalPages: number
}>()
const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const isFirst = computed(() => currentPage === 1)
const isLast = computed(() => currentPage === totalPages)

function goPrev() {
  if (!isFirst.value) emit('update:page', currentPage - 1)
}

function goNext() {
  if (!isLast.value) emit('update:page', currentPage + 1)
}
</script>

<template>
  <div class="pagination">
    <button type="button" @click="goPrev" :disabled="isFirst">Prev</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button type="button" @click="goNext" :disabled="isLast">Next</button>
  </div>
</template>
