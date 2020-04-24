const path = require('path');
const fs = require('fs-extra');
const compiler = require('vue-template-compiler');

const svgDir = path.resolve(__dirname, '../../../source/dist');
const svgResolve = p => path.resolve(svgDir, p);

// fs.readdirSync(svgResolve('outline-md')).map(p => svgResolve(`outline-md/${p}`))
const outlineFiles = fs.readdirSync(svgResolve('outline-md')).map(p => svgResolve(`outline-md/${p}`));
const solidFiles = fs.readdirSync(svgResolve('solid-sm')).map(p => svgResolve(`solid-sm/${p}`));

const resolve = (...p) => path.resolve(__dirname, '../src/icons', ...p);

const vueTemplate = (svg, name) => `
import Vue from 'vue';
export const ${name} = Vue.extend({
  name: '${name}',
  template: \`${svg}\`,
});
`;

function getIconBasename(filename) {
  return path.basename(filename, '.svg')
    .replace('md-', '')
    .replace('sm-', '')
    .replace('_', '-');
}

function getIconName(filename) {
  return 'Heroicons' + getIconBasename(filename).split('-').map(value => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }).join('');
}

function generator(files, type) {
  files.forEach(file => {
    const template = fs.readFileSync(file).toString().trim();
    const iconName = getIconName(file) + type;
    // console.log(
    //   compiler.compile(template).render.replace('with(this){', '').replace(/\}$/, ';')
    // );
    fs.writeFileSync(
      resolve('components', `${iconName}.ts`),
      vueTemplate(template, iconName).trim(),
    );
  });
}

module.exports = function() {
  // 清理目录
  fs.removeSync(resolve());
  fs.mkdirSync(resolve());
  fs.mkdirSync(resolve('components'));

  // 从 SVG 生成 Vue 文件
  generator(outlineFiles, 'Outline');
  generator(solidFiles, 'Solid');

  // 处理命名
  const names = [];
  outlineFiles.forEach(file => {
    names.push(getIconName(file) + 'Outline');
  });
  solidFiles.forEach(file => {
    names.push(getIconName(file) + 'Solid');
  });

  // 写入命名
  fs.writeFileSync(resolve('names.ts'), `
import * as components from './components';
export const names = {
${names.map(name => `  '${name}': components.${name},`).join('\r\n')}
};
  `.trim());

  // 写入组件索引文件
  fs.writeFileSync(
    resolve('components/index.ts'),
    names.map(name => `export { ${name} } from './${name}';`).join('\r\n'),
  );

  // 写入 icons 索引文件
  fs.writeFileSync(
    resolve('index.ts'),
    `
export * from './components';
export { names as iconsMap } from './names';
    `.trim()
  );
};
