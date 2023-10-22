<template>
  <div ref="popup" class="layout-popup">
    <div class="layout-popup__content">
      <div class="mobile-menu">
        <div class="layout-popup__wrapper">
          <div>
            <div class="mobile-header">
              <RouterLink class="header-wrapper__left" to="/benefits">
                <img src="../images/Logo.png" alt="logo-name"
              /></RouterLink>
              <button ref="popupClose" class="layout-popup__close">
                <span></span>
                <span></span>
              </button>
            </div>
            <div class="mobile-start">
              <Navbar />
            </div>
          </div>
          <div class="mobile-end">
            <Location />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import Location from "./Location.vue";
import Navbar from "./Navbar.vue";
const store = useStore();
const popup = ref();
const popupClose = ref();
onMounted(() => {
  store.commit("addPopup", popup.value);
  store.commit("addPopupClose", popupClose.value);
  store.commit("initOpenClosePopup");
  window.addEventListener("resize", () => {
    appHeight;
    store.commit("checkStatePopup");
  });
  appHeight();
});

onUnmounted(() => {
  window.removeEventListener("resize", appHeight);
});

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
</script>

<style lang="scss" scoped>
@import "Styles/_var.scss";

.mobile-menu {
  height: 100vh;
  height: var(--app-height);
}

.mobile-header {
  padding: 15px;
}

.layout-popup {
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);

  &__close {
    cursor: pointer;
    @include flexCenterCenter;
    width: 20px;
    height: 20px;
    position: relative;
    span {
      position: absolute;
      border: 0.5px solid $colorWhite;
      width: 15px;
    }
    span:nth-child(1) {
      transform: rotate(45deg);
    }
    span:nth-child(2) {
      transform: rotate(-45deg);
    }
  }

  &__content {
    width: 70%;
    min-width: 265px;
    opacity: 0;
    transform: translate(-30%) rotate(-5deg) scale(0.9);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

    background-color: $colorWhite;
  }
  &.active {
    opacity: 1;
    z-index: 800;
    .layout-popup__content {
      transform: translate(0) rotate(0) scale(1);
      opacity: 1;
    }
  }
  &.showen {
    display: flex;
  }
  &__wrapper {
    @include flexColumnSpaceB;
    padding-bottom: 10px;
    height: 100%;
    .mobile-header {
      @include flexSpaceBAlighnC;
      background-color: $colorShark;
    }
    .mobile-start {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      font-weight: 700;
    }
    .mobile-end {
      padding: 0 15px;
    }
  }
}
</style>
