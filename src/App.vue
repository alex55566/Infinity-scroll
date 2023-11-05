<template>
  <div ref="container" class="container">
    <div class="block">
      <div class="main">
        <div
          ref="leftColumn"
          @scroll="doScroll('left')"
          class="column left-side"
        >
          <FirstBlock>
            <div
              @click="onClick(block, 'left')"
              class="card"
              v-for="block in firstVisibleItems"
              :key="block.id"
              @mousedown="onReadyDrag($event, block, 'left')"
              @ondragstart="onReadyDragStart"
            >
              <Card :block="block" />
            </div>
            <Stub />
            <div ref="leftLoader" class="loader-wrapper">
              <Loader />
            </div>
          </FirstBlock>
        </div>
        <div
          ref="rightColumn"
          @scroll="doScroll('right')"
          class="column right-side"
        >
          <SecondBlock>
            <div
              @click="onClick(block, 'right')"
              class="card"
              v-for="block in secondVisibleItems"
              :key="block.id"
              @mousedown="onReadyDrag($event, block, 'right')"
              @ondragstart="onReadyDragStart"
            >
              <Card :block="block" />
            </div>
            <Stub />
            <div ref="rightLoader" class="loader-wrapper">
              <Loader />
            </div>
          </SecondBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Card from "./components/Card.vue";
import FirstBlock from "./components/FirstBlock.vue";
import Loader from "./components/Loader.vue";
import SecondBlock from "./components/SecondBlock.vue";
import Stub from "./components/Stub.vue";
import { readyDrag } from "./helpers/drag";
const store = useStore();
const leftColumn = ref();
const rightColumn = ref();
const leftLoader = ref();
const rightLoader = ref();

let mouseDownTimer;
let isMouseDown = false;

onMounted(() => {
  store.commit("initBlocks");
  store.commit("initLeftColumn", leftColumn.value);
  store.commit("initRightColumn", rightColumn.value);
  store.commit("initLeftLoader", leftLoader.value);
  store.commit("initRightLoader", rightLoader.value);
});

const firstVisibleItems = computed(() => {
  return store.state.leftBlock.slice(
    store.state.leftStepPrev,
    store.state.leftStepNext
  );
});

const secondVisibleItems = computed(() => {
  return store.state.rightBlock.slice(
    store.state.rightStepPrev,
    store.state.rightStepNext
  );
});

function doScroll(id) {
  store.commit("doScroll", id);
}

function onClick(block, side) {
  if (isMouseDown) {
    // Если кнопка была отпущена до окончания таймера, обрабатываем click
    // Действия для click
    isMouseDown = false;
    store.commit("changeContainer", {
      block: side,
      id: block.id,
    });
  }
  // Сбрасываем таймер
  clearTimeout(mouseDownTimer);
}

function onReadyDrag(event, block, side) {
  const card = event.currentTarget;
  // Устанавливаем таймер на 300 миллисекунд
  mouseDownTimer = setTimeout(() => {
    // Если кнопка все еще нажата после таймера, обрабатываем mousedown
    if (isMouseDown) {
      // Действия для mousedown
      readyDrag(
        event,
        card,
        side === "left" ? leftColumn.value : rightColumn.value,
        side === "left" ? rightColumn.value : leftColumn.value,
        side === "left" ? "left-side" : "right-side",
        side === "left" ? "right-side" : "left-side",
        block,
        side
      );
    }
  }, 300);
  isMouseDown = true;
}

function onReadyDragStart() {
  return false;
}
</script>

<style lang="scss" scoped>
@import "Styles/_var.scss";

.container {
  @include flexCenter;
  height: 100%;
  overflow: hidden;
}

.block {
  @include flexColumnCenter;
  gap: $gapSmall;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  position: relative;
  max-width: $widthContainer;
  gap: $gapSmall;
  padding: 50px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  @include mobile {
    padding: 15px;
  }
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 10px;
  width: 50%;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid black;
  overflow: auto;
  border-radius: 5px;
  &.in-target {
    background-color: $colorOver;
  }
}

.card {
  width: 50%;
  padding: 5px;
  border-radius: 5px;
  border: 1px dashed $colorSlateGray;
  background-color: $colorDodgerBlue;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  cursor: pointer;
  @include mobile {
    width: 80%;
  }
  &.move {
    position: absolute;
    z-index: 1000;
    background: $colorWhite;
  }
}

.loader-wrapper {
  position: fixed;
  display: none;
  width: 80px;
  height: 80px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  &.visible {
    display: block;
  }
  @include mobile {
    width: 50px;
    height: 50px;
  }
}
</style>
