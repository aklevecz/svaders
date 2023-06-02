<script>
  import Scene from "./components/Scene.svelte";
  import vertexShader from "./shaders/liquid/vertex.glsl";
  import fragmentShader from "./shaders/liquid/fragment.glsl";

  export let width = null;
  export let height = null;
</script>

<Scene {width} {height} {vertexShader} {fragmentShader} />
