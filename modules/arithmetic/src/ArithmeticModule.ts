import { NativeModule, requireNativeModule } from "expo";

import { ArithmeticModuleEvents } from "./Arithmetic.types";

declare class ArithmeticModule extends NativeModule<ArithmeticModuleEvents> {
  PI: number;
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ArithmeticModule>("Arithmetic");
