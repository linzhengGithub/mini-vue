import pak from './package.json';
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts', // 入口文件
  output: [
    // 出口文件
    // 1. cjs -> commonjs
    // 2. esm -> es module
    {
      format: 'cjs',
      file: pak.main,
    },
    {
      format: 'es',
      file: pak.module,
    }
  ],
  plugins: [typescript()]
}
