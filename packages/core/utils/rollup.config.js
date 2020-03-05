import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';

export function generateBaseConfig(pkg) {
  return {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
      sourcemaps(),
      typescript({
        // eslint-disable-next-line global-require
        typescript: require('typescript')
      }),
      terser()
    ]
  };
}

const baseConfig = generateBaseConfig(pkg);

export default baseConfig;
