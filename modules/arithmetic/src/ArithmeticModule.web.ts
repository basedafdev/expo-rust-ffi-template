import { registerWebModule, NativeModule } from "expo";

import { ChangeEventPayload } from "./Arithmetic.types";

type ArithmeticModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

class ArithmeticModule extends NativeModule<ArithmeticModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit("onChange", { value });
  }
  hello() {
    return "Hello world! 👋";
  }
}

export default registerWebModule(ArithmeticModule);
