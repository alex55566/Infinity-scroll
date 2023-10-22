<template>
  <div class="header-wrapper__outer">
    <div class="header-wrapper__inner">
      <RouterLink class="header-wrapper__left" to="/benefits">
        <img src="../images/Logo.png" alt="logo-name"
      /></RouterLink>
      <div class="header-wrapper__right">
        <div class="loc">
          <Location />
        </div>
        <a @click="stopAnim" :class="[{ anim: animate }, 'bang-alert']">
          <svg
            @click="stopAnim"
            class="'bang-alert"
            style="width: 22px; height: 22px"
          >
            <use xlink:href="../images/sprite.svg#bang-alert"></use>
          </svg>
          <span class="bullet"></span>
        </a>
        <button ref="btnBurger" class="menu__burger">
          <span class="menu__burger__top"></span>
          <span class="menu__burger__middle"></span>
          <span class="menu__burger__bottom"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import Location from "./Location.vue";
const store = useStore();
const btnBurger = ref();
const animate = ref(true);
onMounted(() => {
  store.commit("addBtnBurger", btnBurger.value);
});

function stopAnim() {
  animate.value = false;
}
</script>

<style lang="scss" scoped>
@import "Styles/_var.scss";
.header-wrapper {
  &__outer {
    width: 100%;
    padding: 10px 0px;
    background-color: $colorShark;
  }
  &__inner {
    @include flexSpaceBAlighnC;
    margin: 0 auto;
    max-width: $widthContainer;
    padding: 0 50px;
  }

  &__right {
    @include flexSpaceBAlighnC;
    gap: 32px;

    .loc {
      @include tablet {
        display: none;
      }
    }

    .bang-alert {
      position: relative;
      fill: $colorWhite;
      transform: rotate(28deg);
    }
    .anim {
      animation: swing 2s ease-in-out infinite;
      transform: rotate(28deg);
      cursor: pointer;
      .bullet {
        position: absolute;
        background-color: $colorDodgerBlue;
        width: 6px;
        height: 6px;
        top: 2px;
        right: 7px;
        z-index: 10;
        border-radius: 50%;
      }
    }
    .menu__burger {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: 24px;
      height: 24px;
      line-height: 0;
      padding: 6px 3px;
      cursor: pointer;
      position: relative;
      @include tablet {
        display: flex;
      }
      > span {
        display: inline-block;
        width: 100%;
        border-top: 2px solid $colorWhite;
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}

@keyframes swing {
  0% {
    transform: rotate(28deg);
  }
  25% {
    transform: rotate(56deg);
  }
  50% {
    transform: rotate(28deg);
  }
  75% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(28deg);
  }
}
</style>
