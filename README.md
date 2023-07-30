# Svaders

Svaders is a package that allows you to render WebGL shader backgrounds in your [Svelte](https://svelte.dev/) applications. It uses [Three.js](https://threejs.org/) for its WebGL capabilities.

## Installation

To install Svaders, simply run the following command:

```
npm install svaders
```

### Components

Svaders provides prebaked components that you can use out of the box. More components are constantly being added. Here are the currently available components:

- `<Cells/>`
- `<Dropper/>`
- `<Glitch/>`
- `<Liquid/>`
- `<Mushroom/>`
- `<Rain/>`
- `<Ribbons/>`
- `<Sdf/>`
- `<Stochastic/>`
- `<Water/>`

#### Props

The components accept an optional `dims` prop, which allows you to specify the width and height of the component. If it is not specified the canvas will try to fill its container.

##### Example

```svelte
<script>
import { Cells, Rain } from "svaders"
</script>

<Cells dims={{width:500, height:500}} />
<Rain dims={{width:"69%", height:"69%"}}>
```

### Shaders - Modules

If you prefer to use the base scene and pick from available shaders or inject your own, Svaders provides shader modules.

###The shader modules allow you to customize the rendering of the base scene by choosing from available shaders or injecting your own. Note that if you inject your own you will have access to GLSL variables provided by Three.js.

#### Available Shaders

Svaders provides the following shaders that you can use:

- cells
- dropper
- glitch
- liquid
- mushroom
- rain
- ribbons
- sdf
- stochastic
- water

#### Props

In order to use the shader modules, you need to import the `Base` and `Shaders` components from "svaders".

The `Base` component accepts the `shader` prop, which specifies the shader to use. You can also provide an optional `dims` prop to set the width and height of the component.

##### Example

```svelte
<script>
import { Base, Shaders } from "svaders"
</script>

<Base shader={Shaders.liquid} />
<Base shader={Shaders.mushroom} dims={{width:500, height:500}}>
```

### Additional Notes

Please note that the package is still a work in progress and more features will be added in the future.
