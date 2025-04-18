#!/bin/bash
set -e

echo "Cleaning up generated files..."

# Remove generated content within ios directory
if [ -d "ios" ]; then
  rm -rf ios/hedgepayexpoapp
  rm -rf ios/hedgepayexpoapp.xcodeproj
  rm -rf ios/hedgepayexpoapp.xcworkspace
  rm -rf ios/Pods
  rm -rf ios/build
fi

# Remove generated content within android directory
if [ -d "android" ]; then
  rm -rf android/app/src/main/java/com/anonymous/hedgepayexpoapp
  rm -rf android/.gradle
  rm -rf android/app/build
  rm -rf android/build
  
  # Clean up build.gradle references
  if [ -f "android/app/build.gradle" ]; then
    sed -i '' 's/com.anonymous.hedgepayexpoapp/com.anonymous.template/g' android/app/build.gradle
  fi

  # Clean up AndroidManifest.xml references
  if [ -f "android/app/src/main/AndroidManifest.xml" ]; then
    sed -i '' 's/com.anonymous.hedgepayexpoapp/com.anonymous.template/g' android/app/src/main/AndroidManifest.xml
  fi
fi

# Remove Rust generated files
rm -rf rust_core/generated
rm -rf rust_core/target
rm -rf modules/rust_ffi/ios/generated
rm -rf modules/rust_ffi/android/generated

# Clean npm
rm -rf node_modules
rm -f package-lock.json
rm -rf .expo

echo "Generated files cleaned up!"
echo "You can now run 'npx create-expo-app my-app --template expo-rust-ffi-template' to test the template." 