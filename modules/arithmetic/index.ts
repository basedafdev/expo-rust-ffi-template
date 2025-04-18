// Reexport the native module. On web, it will be resolved to ArithmeticModule.web.ts
// and on native platforms to ArithmeticModule.ts
export { default } from "./src/ArithmeticModule";
export * from "./src/Arithmetic.types";
