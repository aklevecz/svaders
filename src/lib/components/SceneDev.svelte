<script>
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
  import {
    Mesh,
    Scene,
    OrthographicCamera,
    WebGLRenderer,
    ShaderMaterial,
    BufferGeometry,
    Vector2,
    BufferAttribute,
  } from "three";

  // import vertexShader from "../shaders/liquid/vertex.glsl";
  // import fragmentShader from "../shaders/liquid/fragment.glsl";

  /** @type {HTMLCanvasElement}*/
  let canvas;
  export let vertexShader;
  export let fragmentShader;
  export let width;
  export let height;
  let frame;

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program creation failed:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  function createBuffer(gl, data, target = gl.ARRAY_BUFFER, usage = gl.STATIC_DRAW) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage);
    gl.bindBuffer(target, null);
    return buffer;
  }
  function initScene() {
    const gl = canvas.getContext("webgl");

    // Compile and link shaders
    const vertexShaderSource = vertexShader;
    const fragmentShaderSource = fragmentShader;
    vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Create buffer for vertices
    const vertices = new Float32Array([
      -1,
      -1,
      0, // Vertex 1
      1,
      -1,
      0, // Vertex 2
      -1,
      1,
      0, // Vertex 3
      1,
      1,
      0, // Vertex 4
    ]);
    const vertexBuffer = createBuffer(gl, vertices);

    // Create buffer for UV coordinates
    const uvs = new Float32Array([
      0,
      0, // Vertex 1
      1,
      0, // Vertex 2
      0,
      1, // Vertex 3
      1,
      1, // Vertex 4
    ]);
    const uvBuffer = createBuffer(gl, uvs);

    // Create buffer for indices
    const indices = new Uint32Array([
      0,
      1,
      2, // Triangle 1
      2,
      1,
      3, // Triangle 2
    ]);
    const indexBuffer = createBuffer(gl, indices, gl.ELEMENT_ARRAY_BUFFER);

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const uvAttributeLocation = gl.getAttribLocation(program, "a_uv");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const timeUniformLocation = gl.getUniformLocation(program, "u_time");

    // Set up rendering
    gl.useProgram(program);

    // Bind buffers and enable attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.enableVertexAttribArray(uvAttributeLocation);
    gl.vertexAttribPointer(uvAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // Set uniform values
    const resolution = new Float32Array([width, height]);
    gl.uniform2fv(resolutionUniformLocation, resolution);

    let time = 0.0;

    // Render function
    function render() {
      gl.uniform1f(timeUniformLocation, time);
      time += 0.01;

      // Rendering code here using WebGL API calls

      requestAnimationFrame(render);
    }

    render();
  }

  // function initScene() {
  //   const scene = new Scene();
  //   const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  //   camera.position.z = 1;

  //   const renderer = new WebGLRenderer({ canvas, alpha: true });
  //   if (!width && !height) {
  //     const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
  //     width = canvasWidth;
  //     height = canvasHeight;
  //   }

  //   renderer.setClearColor(0xff0000, 0); // not doing anything seemingly
  //   renderer.setPixelRatio(window.devicePixelRatio);
  //   renderer.setSize(width, height);
  //   // const planeGeometry = new PlaneGeometry(2, 2);
  //   const geometry = new BufferGeometry();

  //   // Define the vertices of the plane
  //   const vertices = new Float32Array([
  //     -1,
  //     -1,
  //     0, // Vertex 1
  //     1,
  //     -1,
  //     0, // Vertex 2
  //     -1,
  //     1,
  //     0, // Vertex 3
  //     1,
  //     1,
  //     0, // Vertex 4
  //   ]);

  //   // Define the UV coordinates
  //   const uvs = new Float32Array([
  //     0,
  //     0, // Vertex 1
  //     1,
  //     0, // Vertex 2
  //     0,
  //     1, // Vertex 3
  //     1,
  //     1, // Vertex 4
  //   ]);

  //   // Define the indices that define the triangles
  //   const indices = new Uint32Array([
  //     0,
  //     1,
  //     2, // Triangle 1
  //     2,
  //     1,
  //     3, // Triangle 2
  //   ]);

  //   // Set the vertices, UV coordinates, and indices to the BufferGeometry
  //   geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  //   geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  //   geometry.setIndex(new BufferAttribute(indices, 1));
  //   const shaderMaterial = new ShaderMaterial({
  //     uniforms: {
  //       resolution: { value: new Vector2(width * devicePixelRatio, height * devicePixelRatio) },
  //       time: { value: 0.0 },
  //     },
  //     vertexShader: vertexShader,
  //     fragmentShader: fragmentShader,
  //   });

  //   const planeMesh = new Mesh(geometry, shaderMaterial);
  //   scene.add(planeMesh);

  //   if (frame) {
  //     cancelAnimationFrame(frame);
  //   }

  //   // @note should I access this somewhere else at a higher level?
  //   // or should it exist somewhere else
  //   function render(t) {
  //     shaderMaterial.uniforms.time.value += 0.01;
  //     frame = requestAnimationFrame(render);
  //     renderer.render(scene, camera);
  //   }

  //   render();
  // }

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
