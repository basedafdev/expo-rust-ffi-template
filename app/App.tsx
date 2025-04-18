import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";

import ArithmeticModule from "../modules/arithmetic";

import "./globals.css";
console.log("🔍 App.tsx is loading");

export default function App() {
  const [counter, setResult] = useState<number>(0);
  console.log(ArithmeticModule);
  const { add, subtract } = ArithmeticModule;

  // FFI Add
  const handleAdd = async () => {
    try {
      const response = add(counter, 2);
      setResult(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // FFI Subtract
  const handleSubtract = async () => {
    try {
      const response = subtract(counter, 2);
      setResult(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView>
      <View className="flex flex-grow flex-col justify-between items-center bg-white">
        <Text className="text-black">Native Counter</Text>

        <Button title="Increment Counter" onPress={handleAdd} />
        <Button title="Decrement Counter" onPress={handleSubtract} />
        {counter !== null && <Text className="text-black">{counter}</Text>}

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
