<template>
  <div ref="container" class="container">
    <div class="block">
      <div ref="sticky" class="sticky">
        <HeaderBlock />
        <div class="wrapper-nav">
          <Navbar />
        </div>
      </div>
      <div class="main">
        <router-view />
      </div>
      <div class="footer"></div>
    </div>
  </div>
  <div v-if="store.state.isLoad" class="loader">
    <Loader />
  </div>
  <div v-if="store.state.isError" class="error">
    <Error />
  </div>
  <MobileMenu />
</template>

<script setup>
import Error from "Components/Error.vue";
import HeaderBlock from "Components/HeaderBlock.vue";
import Loader from "Components/Loader.vue";
import MobileMenu from "Components/MobileMenu.vue";
import Navbar from "Components/Navbar.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const sticky = ref();
const container = ref();
onMounted(() => {
  store.commit("addHeader", sticky.value);
  store.commit("addContainer", container.value);
  store.commit("addBody");
  store.commit("initOnScroll");
});
</script>

<style lang="scss" scoped>
@import "Styles/_var.scss";

.container {
  @include flexCenter;
  min-height: 100%;
}

.block {
  @include flexColumnCenter;
  gap: $gapSmall;
  width: 100%;
  min-height: 100%;
}

.main {
  flex: 1 1 auto;
  position: relative;
  max-width: $widthContainer;
  gap: $gapSmall;
  padding: 0 50px;
  width: 100%;
  margin: 0 auto;
}

.loader {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  top: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  padding: 20px;
  text-align: center;
  z-index: 5;
  font-weight: 700;
  background-color: $colorTorchRed;
  color: $colorWhite;
  border-radius: 20px;
}

.footer {
  height: 50px;
  width: 100%;
  background-color: $colorShark;
}

.wrapper-nav {
  @include tablet {
    display: none;
  }
}

.sticky {
  position: sticky;
  background-color: $colorWhite;
  z-index: 5;
}
</style>
