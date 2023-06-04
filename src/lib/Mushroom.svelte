<script>
  import * as Types from "$types/types.d.js";
  import Base from "./Base.svelte";
  let shader = "mushroom";

  /** @type {Types.Dims} */
  export let dims = { width: 0, height: 0 };
</script>

<Base {shader} {dims} />
