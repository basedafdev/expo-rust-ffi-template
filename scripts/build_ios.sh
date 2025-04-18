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

cd rust_core

# Process each module in the list
for module_name in "${MODULES[@]}"; do
    echo "Processing module: $module_name"
    
    # Compile Rust code for iOS simulator
    cargo build --release --target aarch64-apple-ios-sim --lib

    # Generate Swift bindings
    cargo run --features=uniffi/cli --bin uniffi-bindgen generate --library "./target/aarch64-apple-ios-sim/release/lib${module_name}.dylib" --out-dir "generated/swift/${module_name}/" --language swift

    # Create the output directory if it doesn't exist
    mkdir -p "../modules/rust_ffi/ios/generated/${module_name}"

    # Copy the compiled .a file to the IOS project
    cp "target/aarch64-apple-ios-sim/release/lib${module_name}.a" "../modules/rust_ffi/ios/generated/${module_name}"

    # Copy the Swift bindings to the IOS project
    cp -r "generated/swift/${module_name}" "../modules/rust_ffi/ios/generated"
done

# Navigate back to the project root
cd ..


