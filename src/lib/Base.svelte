<script>
  import { Dims } from "$types/types.d.js";
  import { Shaders } from "$types/shaders.d.js";
  import Scene from "$components/Scene.svelte";
  import vertexShader from "./shaders/vertex.glsl";

  /** @type {Shaders}*/
  export let shader;

  /** @type {Dims} */
  export let dims;
  const { width, height } = dims;
</script>

{#await import(`./shaders/${shader}/fragment.glsl`)}
  <div>loading...</div>
{:then fragmentShader}
  <Scene {width} {height} {vertexShader} fragmentShader={fragmentShader.default} />
{:catch}
  <div>wtf</div>
{/await}
