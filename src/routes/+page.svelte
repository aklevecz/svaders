<script>
  import { Base } from "$lib";
</script>

<div class="container">
  <div class="gl_view_container">
    <Base shader="liquid" dims={{ width: 0, height: 0 }} />
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
