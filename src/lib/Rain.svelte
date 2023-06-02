<script>
  import Scene from "./components/Scene.svelte";
  import vertexShader from "./shaders/vertex.glsl";
  import fragmentShader from "./shaders/rain/fragment.glsl";

  export let width = null;
  export let height = null;
</script>

<Scene {width} {height} {vertexShader} {fragmentShader} />
