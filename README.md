# Expo Rust FFI Template

A template for building React Native applications with Expo that integrate native Rust code via FFI (Foreign Function Interface). This template demonstrates how to bridge Rust with Swift (iOS) and Kotlin (Android) in an Expo-managed workflow.

## Features

- 🦀 Rust integration with iOS and Android
- 📱 Expo managed workflow
- 🔄 Hot reloading support
- 🛠 Pre-configured build scripts
- 📚 Example module included
- 🎯 TypeScript support

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Rust](https://rustup.rs/) (latest stable)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

## Getting Started

1. Create a new project using this template:
   ```bash
   npx create-expo-app my-app --template expo-rust-ffi-template
   ```

2. Install dependencies:
   ```bash
   cd my-app
   npm install
   ```

3. Build native modules:
   ```bash
   # For iOS
   npm run build:ios
   
   # For Android
   npm run build:android
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
my-app/
├── modules/
│   └── rust_ffi/           # Shared Rust FFI implementation
│       ├── ios/            # iOS FFI bindings and libraries
│       │   └── hello_world/
│       └── android/        # Android FFI bindings and libraries
│           └── hello_world/
├── rust_core/              # Rust implementation
│   ├── modules/            # Individual Rust modules
│   │   └── hello_world/    # Example module
│   ├── uniffi-bindgen/     # UniFFI bindings generator
│   ├── generated/          # Generated bindings
│   └── Cargo.toml         # Workspace configuration
├── scripts/               # Build scripts
│   ├── build_ios.sh
│   └── build_android.sh
├── ios/                  # iOS project files
├── android/             # Android project files
└── App.tsx             # Main application entry point
```

## Development Workflow

### Creating a New Rust Module

1. Create a new module in the Rust workspace:
   ```bash
   cd rust_core/modules
   mkdir my_module
   cd my_module
   cargo init --lib
   ```

2. Add the module to `rust_core/Cargo.toml`:
   ```toml
   [workspace]
   members = [
     "modules/hello_world",
     "modules/my_module",
     "uniffi-bindgen"
   ]
   ```

3. Implement your Rust code:
   ```rust
   // rust_core/modules/my_module/src/lib.rs
   #[uniffi::export]
   pub fn my_function() -> String {
       "Hello from Rust!".to_string()
   }
   ```

4. Generate bindings:
   ```bash
   npm run build:ios    # For iOS
   npm run build:android # For Android
   ```

### Using Native Code in React Native

```typescript
import { NativeModules } from 'react-native';

const { MyModule } = NativeModules;
const message = await MyModule.myFunction();
```

## Best Practices

- Use Android Studio for editing Kotlin files
- Use Xcode for editing Swift files
- Rebuild native code after making changes
- Keep native and JavaScript interfaces in sync
- Test changes in the app before committing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [UniFFI](https://github.com/mozilla/uniffi-rs) - The FFI binding generator
- [Expo](https://expo.dev/) - The React Native development platform
