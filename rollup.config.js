import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

module.exports = {
	//start point
	input: "src/array-utils.ts",
	output: [
		{
			file: "./dist/array-utils.js",
			//global variable name
			name: "AU",
			format: "umd",
			globals: {
				//package name : global var name
			}
		},
		{
			file: "./dist/array-utils.es.js",
			format: "es",
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonJS(),
		typescript({
			useTsconfigDeclarationDir: true
		}),
	],
	context: "Window"
};
