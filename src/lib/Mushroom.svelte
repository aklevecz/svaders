<script>
  import { Shaders, Dims } from "$types";
  import Scene from "$components/Scene.svelte";
  import vertexShader from "./shaders-js/vertex.js";
  import fragmentShader from "./shaders-js/mushroom/fragment.js"

  /** @type {Dims} */
  export let dims = {width:0, height:0}
  const { width, height } = dims;
</script>

  <Scene {width} {height} {vertexShader} fragmentShader={fragmentShader} />
