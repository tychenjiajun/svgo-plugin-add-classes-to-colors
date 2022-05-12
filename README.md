# svgo-plugin-add-classes-to-colors

## Install

```bash
npm install --dev svgo-plugin-add-classes-to-colors
# or
yarn add --dev svgo-plugin-add-classes-to-colors
```

## Usage

```js
const addClassesToColors = require('svgo-plugin-add-classes-to-colors');
module.exports = {
  plugins: [
    {
      ...addClassesToColors,
      params: {
        mapping: {
          'currentColor': 'tone1',
          '#fff': 'tone2',
        }
      }
    }
  ],
};
```

will transform

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <g color="#fff"/>
    <g color="currentColor"/>
</svg>
```

to

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <g color="#fff" class="tone2"/>
    <g color="currentColor" class="tone1"/>
</svg>
```

## Why

This will make controlling SVG colors easier. You can write CSS like

```css
.tone1 {
    color: white;
    fill: white;
    stroke: white;
}
```

to change all the colors of SVG in your page.