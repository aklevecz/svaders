<script>
  import { Shaders, Dims } from "$types";
  import Scene from "$components/Scene.svelte";
  import vertexShader from "./shaders-js/vertex.js";
  import fragmentShader from "./shaders-js/liquid/fragment.js"
  /** @type {Shaders}*/
  export let shader;
  const fragmentShaderPath = `./shaders/${shader}/fragment.glsl`;

  /** @type {Dims} */
  export let dims;
  const { width, height } = dims;
</script>

{#await import(fragmentShaderPath)}
  <div>loading...</div>
{:then fragmentShader}
  <Scene {width} {height} {vertexShader} fragmentShader={fragmentShader.default} />
{:catch}
  <div>wtf</div>
{/await}
