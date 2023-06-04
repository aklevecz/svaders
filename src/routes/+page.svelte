<script>
  import Liquid from "$lib/Liquid.svelte";
  import Mushroom from "$lib/Mushroom.svelte";
  import Ribbons from "$lib/Ribbons.svelte";
  import Rain from "$lib/Rain.svelte";
  import Water from "$lib/Water.svelte";
  import Base from "$lib/Base.svelte";
</script>

<div class="container">
  <div class="gl_view_container">
    <Liquid />
  </div>

  <div class="gl_view_container">
    <Mushroom />
  </div>
  <div class="gl_view_container">
    <Ribbons />
  </div>

  <div class="gl_view_container">
    <Rain />
  </div>
  <div class="gl_view_container">
    <Water />
  </div>
  <div>
    <Base shader="sdf" dims={{ width: 500, height: 500 }} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .gl_view_container {
    width: 300px;
    height: 300px;
    background-color: black;
  }
</style>
