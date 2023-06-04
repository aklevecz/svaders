<script>
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
  import * as THREE from "three";

  // import vertexShader from "../shaders/liquid/vertex.glsl";
  // import fragmentShader from "../shaders/liquid/fragment.glsl";

  /** @type {HTMLCanvasElement}*/
  let canvas;
  export let vertexShader;
  export let fragmentShader;
  export let width;
  export let height;

  let frame;

  function initScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    if (!width && !height) {
      const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
      width = canvasWidth;
      height = canvasHeight;
    }

    renderer.setClearColor(0xff0000, 0); // not doing anything seemingly
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    const planeGeometry = new THREE.PlaneGeometry(2, 2);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        resolution: { value: new THREE.Vector2(width * devicePixelRatio, height * devicePixelRatio) },
        time: { value: 0.0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const planeMesh = new THREE.Mesh(planeGeometry, shaderMaterial);
    scene.add(planeMesh);

    if (frame) {
      cancelAnimationFrame(frame);
    }

    // @note should I access this somewhere else at a higher level?
    function render(t) {
      shaderMaterial.uniforms.time.value += 0.01;
      frame = requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    render();
  }

  beforeUpdate(() => {});

  afterUpdate(() => {
    initScene();
  });

  // onMount(() => {
  //   initScene();
  // });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
  });
</script>

<canvas bind:this={canvas} />

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
