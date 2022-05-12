"use strict";

const FS = require("fs");
const PATH = require("path");
const EOL = require("os").EOL;
const regEOL = new RegExp(EOL, "g");
const regFilename = /^(.*)\.(\d+)\.svg$/;
const plugin = require("../index.js");
const { optimize } = require("svgo");

describe("plugins tests", function () {
  console.log(__dirname);
  FS.readdirSync(__dirname).forEach(function (file) {
    var match = file.match(regFilename),
      index,
      name;

    if (match) {
      name = match[1];
      index = match[2];

      file = PATH.resolve(__dirname, file);

      it(name + "." + index, function () {
        return readFile(file).then(function (data) {
          // remove description
          const items = normalize(data).split(/\s*===\s*/);
          const test = items.length === 2 ? items[1] : items[0];
          // extract test case
          const [original, should, params] = test.split(/\s*@@@\s*/);
          let lastResultData = original;
          const multipass = 2;
          for (let i = 0; i < multipass; i += 1) {
            const result = optimize(lastResultData, {
              path: file,
              plugins: [
                { ...plugin, params: params ? JSON.parse(params) : {} },
              ],
              js2svg: { pretty: true },
            });
            lastResultData = result.data;
            expect(result.error).not.toEqual(expect.anything());
            //FIXME: results.data has a '\n' at the end while it should not
            expect(normalize(result.data)).toEqual(should);
          }
        });
      });
    }
  });
});

function normalize(file) {
  return file.trim().replace(regEOL, "\n");
}

function readFile(file) {
  return new Promise(function (resolve, reject) {
    FS.readFile(file, "utf8", function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
