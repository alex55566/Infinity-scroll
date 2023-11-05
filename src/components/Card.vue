<template>
  <div class="card-inner">
    <div class="img-wrapper">
      <img :draggable="false" :src="getImgUrl(block.pic)" />
    </div>
    <div class="card-inner__price"><span>Price:</span> {{ block.price }}</div>
    <div class="card-inner__level"><span>Level:</span> {{ block.lvl }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { getImgUrl } from "../helpers/helpers";
const props = defineProps({
  block: Object,
});
</script>

<style lang="scss" scoped>
@import "Styles/_var.scss";
.card-inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__price,
  &__level {
    font-size: 16px;
    @include mobile {
      font-size: 14px;
    }
    span {
      font-weight: 700;
    }
  }
}
.img-wrapper {
  margin-left: auto;
  margin-right: auto;
  width: 150px;
  height: 150px;
  @include tablet {
    width: 100px;
    height: 100px;
  }
  @include mobile {
    width: 80px;
    height: 80px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
