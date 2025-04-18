#!/bin/sh
set -e

# Define the list of modules to process
MODULES=()
for dir in rust_core/modules/*/; do
    if [ -d "$dir" ]; then
        module_name=$(basename "$dir")
        MODULES+=("$module_name")
    fi
done

# Clean up old bindings
for MODULE in "${MODULES[@]}"; do
    echo "Cleaning up old bindings for $MODULE..."
    rm -rf "modules/$MODULE/android/src/main/java/uniffi"
done
rm -rf rust_core/generated

# Navigate to the rust_core directory
cd rust_core

# Process each module in the list
for module_name in "${MODULES[@]}"; do
    echo "Processing module: $module_name"
    
    # Compile Rust code for Android
    cargo ndk --target aarch64-linux-android --platform 21 -- build --release --lib

    # Generate Kotlin bindings
    cargo run --features=uniffi/cli --bin uniffi-bindgen generate --library "./target/aarch64-linux-android/release/lib${module_name}.so" --language kotlin --out-dir "generated/kotlin/${module_name}"

    # Create the output directory if it doesn't exist
    mkdir -p "../modules/rust_ffi/android/${module_name}/src/main/jniLibs/arm64-v8a"
    mkdir -p "../modules/rust_ffi/android/${module_name}/src/main/java"

    # Copy the compiled .so file
    cp "target/aarch64-linux-android/release/lib${module_name}.so" "../modules/rust_ffi/android/${module_name}/src/main/jniLibs/arm64-v8a/"

    # Copy the Kotlin bindings
    cp -r "generated/kotlin/${module_name}" "../modules/rust_ffi/android/generated/${module_name}/src/main/java/"
done

# Navigate back to the project root
cd ..

echo "🎉 Successfully distributed Rust bindings to all modules"
