

<template>
  <div class="b-section" @click="goToLink">
    {{ name }}
  </div>
</template>
<script setup>
import router from "../router.js";

const props = defineProps({
  name: String,
  route: String
});

function goToLink() {
  router.push(props.route)
}
</script>
<style scoped>

.b-section {
  position: relative;
  margin-block: 1vh;
  align-items: center;
  width: 24vb;
  height: calc(5vb + 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 1vh;
    transition: all 0.5s ease;
  }

  &::before {
    top: 0;
    left: 0;
    height: 5vb;
    border-top: 1px solid var(--hover-color);
    border-left: 1px solid var(--hover-color);
  }

  &::after {
    right: 0;
    bottom: 0;
    height: 5vb;
    border-bottom: 1px solid var(--hover-color);
    border-right: 1px solid var(--hover-color);
  }

  &:hover::before,
  &:hover::after {
    width: calc(100% - 1px);
  //height: calc(100% - 1px);

  }
}

.b-section:hover {
  cursor: pointer;
  color: var(--hover-color);
}

@media screen and (max-aspect-ratio: 1/1.7) {
  .b-section {
    width: 60vw;

  }
}

</style>