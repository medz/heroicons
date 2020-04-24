import path from 'path';
import rollupTypescript from 'rollup-plugin-typescript2';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonjs from 'rollup-plugin-commonjs';
import rollupVue from 'rollup-plugin-vue';

const resolve = p => path.resolve(__dirname, p);
const name = path.basename(__dirname);

export default {
  input: resolve('src/main.ts'),
  output: [
    {
      file: resolve(`dist/${name}.esm.js`),
      format: 'es',
      exports: 'named',
    },
    {
      file: resolve(`dist/${name}.cjs.js`),
      format: 'cjs',
      exports: 'named',
    },
    {
      name: 'VueHeroicons',
      file: resolve(`dist/${name}.global.js`),
      format: 'iife',
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
    },
  ],
  plugins: [
    rollupCommonjs(),
    rollupNodeResolve(),
    rollupVue(),
    rollupTypescript({
      tsconfig: resolve('../../tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: false
        },
      }
    }),
  ],
  external: ['vue'],
};