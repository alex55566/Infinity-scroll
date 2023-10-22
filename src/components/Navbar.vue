<template>
  <div ref="nav" class="navbar-wrapper">
    <RouterLink
      @click="closePopup"
      :class="[
        'link-nav',
        router.currentRoute.value.path === '/benefits' ? 'active' : '',
      ]"
      to="/benefits"
      >Преимущества Tele2</RouterLink
    >
    <RouterLink
      @click="closePopup"
      :class="[
        'link-nav',
        router.currentRoute.value.path === '/prices' ? 'active' : '',
      ]"
      to="/prices"
      >Тарифы</RouterLink
    >
    <RouterLink
      @click="closePopup"
      :class="[
        'link-nav',
        router.currentRoute.value.path === '/special-offers' ? 'active' : '',
      ]"
      to="/special-offers"
      >Акции и спецпредложения
    </RouterLink>
    <RouterLink
      @click="closePopup"
      :class="[
        'link-nav',
        router.currentRoute.value.path === '/promo' ? 'active' : '',
      ]"
      to="/promo"
      >Промотариф Tele2</RouterLink
    >
    <RouterLink
      @click="closePopup"
      :class="[
        'link-nav',
        router.currentRoute.value.path === '/esim' ? 'active' : '',
      ]"
      to="/esim"
      >eSIM</RouterLink
    >
    <RouterLink
      @click="closePopup"
      :class="[
        'link-nav',
        router.currentRoute.value.path === '/connection' ? 'active' : '',
      ]"
      to="/connection"
      >Подключение нового абонента</RouterLink
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const nav = ref();
onMounted(() => {
  store.commit("addNav", nav.value);
});

function closePopup() {
  if (window.innerWidth <= store.state.tabletWidth)
    store.commit("closePopupClick");
}
</script>

<style lang="scss" scoped>
@import "Styles/_var.scss";
.navbar-wrapper {
  position: relative;
  @include flexAlighnC;
  gap: 18px;
  margin: 0 auto;
  max-width: $widthContainer;
  width: 100%;
  padding: 14px 50px;
  color: $colorShark;
  font-size: 14px;
  @include tablet {
    flex-direction: column;
    align-items: flex-start;
    padding: 25px 15px 15px 15px;
  }

  .link-nav {
    transition: color, 0.3s ease-in-out;
    @include tablet {
      width: 100%;
      padding-bottom: 8px;
      border-bottom: 1px solid $colorGallery;
    }
    &:hover {
      color: $colorTorchRed;
    }
    &:focus {
      color: $colorTorchRed;
    }
    &.active {
      color: $colorToryBlue;
    }
  }
}
</style>
