//import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import replace from "rollup-plugin-replace";

//import pkg from './package.json'

export default {
    input: 'dist/app.js',
    output: [
        {
            file: 'dist/bundle.js',
            format: 'iife',
            sourcemap: true,
        }
    ],
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        external(),
        /*postcss({
            modules: false,
        }),*/
        url(),
        /*babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
        }),*/
        resolve(),
        commonjs(),
    ],
}
