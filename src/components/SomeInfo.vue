<template>
  <div v-if="data !== null && data.length">
    {{ data[0].text }}
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
onMounted(() => {
  store.dispatch("getData", router.currentRoute.value.path);
});

router.afterEach((to, from) => {
  store.dispatch("getData", router.currentRoute.value.path);
});

const data = computed(() => store.state.data);
</script>

<style lang="scss" scoped></style>
