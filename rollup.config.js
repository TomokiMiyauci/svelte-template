import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import {terser} from "rollup-plugin-terser";
import {transformSync} from "esbuild";
import typescript from "@rollup/plugin-typescript";
const production = !process.env.ROLLUP_WATCH;

export default {
    "input": "src/main.ts",
    "output": {
        "file": "public/build/bundle.js",
        "format": "iife",
        "name": "app",
        "sourcemap": true
    },
    "plugins": [
        svelte({
            // Enable run-time checks when not in production
            "css": (css) => {

                css.write("public/build/bundle.css");

            },
            "dev": !production,

            "preprocess": sveltePreprocess({
                "defaults": {
                    "script": "typescript",
                    "style": "scss"
                },
                "postcss": {
                    "plugins": [require("autoprefixer")()]
                },
                "scss": {
                    "prependData": "@import 'src/styles/variables.scss';"
                },
                "sourceMap": production,

                typescript ({content}) {

                    const {"js": code} = transformSync(
                        content,
                        {
                            "loader": "ts"
                        }
                    );

                    return {code};

                }

            })

            /*
             * We'll extract any component CSS out into
             * A separate file - better for performance
             */

        }),

        /*
         * If you have external dependencies installed from
         * Npm, you'll most likely need these plugins. In
         * Some cases you'll need additional configuration -
         * Consult the documentation for details:
         * https://github.com/rollup/plugins/tree/master/packages/commonjs
         */
        resolve({
            "browser": true,
            "dedupe": ["svelte"]
        }),
        commonjs(),
        typescript({"sourceMap": !production}),

        /*
         * In dev mode, call `npm run start` once
         * The bundle has been generated
         */
        !production && serve(),

        /*
         * Watch the `public` directory and refresh the
         * Browser on changes when not in production
         */
        !production && livereload("public"),

        /*
         * If we're building for production (npm run build
         * Instead of npm run dev), minify
         */
        production && terser()
    ],
    "watch": {
        "clearScreen": false
    }
};

function serve () {

    let started = false;

    return {
        writeBundle () {

            if (!started) {

                started = true;

                require("child_process").spawn(
                    "npm",
                    [
                        "run",
                        "start",
                        "--",
                        "--dev"
                    ],
                    {"shell": true,
                        "stdio": [
                            "ignore",
                            "inherit",
                            "inherit"
                        ]}
                );

            }

        }
    };

}
