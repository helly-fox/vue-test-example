<template>
  <div class="loader"><div class="loader-spinner" /></div>
</template>

<style scoped>
.loader {
  width: 100%;
  text-align: center;
}

.loader-spinner {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-spinner {
    animation: none;
  }
}
</style>
