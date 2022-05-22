"use strict";

const collections = require("svgo/plugins/_collections");

exports.type = "visitor";
exports.name = "addClassesToColors";
exports.active = true;
exports.description =
  "Add corresponding class to element that has specific colors";

const regHEX = /^#([a-fA-F0-9]){3,6}$/;

function findMapping(mapping, name) {
  const result = mapping[name];
  if (typeof result === "object") {
    return result;
  }
  if (typeof result !== "string" || !collections.colorsProps.includes(result)) {
    return {};
  }
  return findMapping(mapping, result);
}

/**
 * Add corresponding class to element that has specific colors.
 *
 * @author Jiajun Chen
 *
 * @type {import('svgo/lib/types').Plugin<{
 *   mapping?: Record<string, string>,
 * }>}
 */
exports.fn = (_root, params) => {
  const { mapping = {} } = params;

  return {
    element: {
      enter: (node) => {
        const classes = new Set(node.attributes.class?.split(" "));
        for (const [name, oriVal] of Object.entries(node.attributes)) {
          if (collections.colorsProps.includes(name)) {
            const value = oriVal.match(regHEX) != null ? oriVal.toLowerCase() : oriVal;
            const mappedClass = mapping[value];
            if (typeof mappedClass === "string") classes.add(mappedClass);
            else {
              const mappedClass = findMapping(mapping, name)[value];
              if (typeof mappedClass === "string") classes.add(mappedClass);
            }
          }
        }
        if (classes.size > 0)
          node.attributes.class = [...classes].sort().join(" ");
      },
    },
  };
};
