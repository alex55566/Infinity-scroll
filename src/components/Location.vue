<template>
  <a href="#" class="loc-link">
    <svg class="loc-pic" style="width: 22px; height: 22px">
      <use xlink:href="../images/sprite.svg#loc-pic"></use>
    </svg>
    <span class="location">Московская область</span>
  </a>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "Styles/_var.scss";
.loc-link {
  @include flexAlighnC;
  gap: 5px;
  &:hover {
    .location {
      color: $colorTorchRed;
    }
    .loc-pic {
      fill: $colorTorchRed;
    }
  }
  &:focus {
    .location {
      color: $colorTorchRed;
    }
    .loc-pic {
      fill: $colorTorchRed;
    }
  }
}
.location {
  font-size: 14p;
  color: $colorSlateGray;
  transition: color, 0.3s ease-in-out;
  @include tablet {
    font-size: 16px;
  }
}
.loc-pic {
  fill: #7c8792;
  transition: fill, 0.3s ease-in-out;
}
</style>
