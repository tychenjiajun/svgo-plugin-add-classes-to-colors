# svgo-plugin-add-classes-to-colors

[![GitHub license](https://img.shields.io/github/license/tychenjiajun/svgo-plugin-add-classes-to-colors)](https://github.com/tychenjiajun/svgo-plugin-add-classes-to-colors/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/dw/svgo-plugin-add-classes-to-colors)](https://www.npmjs.com/package/svgo-plugin-add-classes-to-colors)

Add corresponding class to element that has specific colors.

## Install

```bash
npm install --dev svgo-plugin-add-classes-to-colors
# or
yarn add --dev svgo-plugin-add-classes-to-colors
```

## Usage

```js
// svgo.config.js
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