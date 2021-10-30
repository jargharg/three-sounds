<template>
  <ThreeCanvas />
</template>

<script>
import ThreeCanvas from "./components/ThreeCanvas";

export default {
  name: "App",
  components: {
    ThreeCanvas,
  },
};
</script>

<style>
html,
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: slategray;
}
</style>
