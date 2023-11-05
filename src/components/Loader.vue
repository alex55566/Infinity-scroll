<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "Styles/_var.scss";
.spinner-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid $colorTorchRed;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
