#!/bin/bash
set -e

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required commands
if ! command_exists git; then
  echo "Error: git is required but not installed."
  exit 1
fi

# Store the current directory
CURRENT_DIR=$(pwd)

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Function to cleanup
cleanup() {
  echo "Cleaning up..."
  rm -rf "$TEMP_DIR"
  cd "$CURRENT_DIR"
}

# Set up trap to ensure cleanup happens even if script fails
trap cleanup EXIT

# Clone the original template
echo "Cloning the original template..."
git clone https://github.com/yourusername/expo-rust-ffi-template.git "$TEMP_DIR"

# Remove generated content while preserving directory structure
echo "Removing generated content..."

# Clean iOS generated content
if [ -d "ios" ]; then
  rm -rf ios/hedgepayexpoapp
  rm -rf ios/hedgepayexpoapp.xcodeproj
  rm -rf ios/hedgepayexpoapp.xcworkspace
  rm -rf ios/Pods
  rm -rf ios/build
fi

# Clean Android generated content
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

# Clean other generated files
rm -rf node_modules
rm -rf .expo
rm -rf .git
rm -f package-lock.json
rm -f yarn.lock
rm -rf rust_core/generated
rm -rf rust_core/target
rm -rf modules/rust_ffi/ios/generated
rm -rf modules/rust_ffi/android/generated

# Copy the original template files back, preserving ios and android directories
echo "Restoring original template files..."
rsync -av --exclude='ios/hedgepayexpoapp*' \
      --exclude='ios/Pods' \
      --exclude='ios/build' \
      --exclude='android/app/src/main/java/com/anonymous/hedgepayexpoapp' \
      --exclude='android/.gradle' \
      --exclude='android/app/build' \
      --exclude='android/build' \
      "$TEMP_DIR/" .

# Make scripts executable
chmod +x scripts/*.sh

# Update template references in configuration files
echo "Updating template references..."
if [ -f "android/app/build.gradle" ]; then
  sed -i '' 's/com.anonymous.hedgepayexpoapp/com.anonymous.template/g' android/app/build.gradle
fi

if [ -f "android/app/src/main/AndroidManifest.xml" ]; then
  sed -i '' 's/com.anonymous.hedgepayexpoapp/com.anonymous.template/g' android/app/src/main/AndroidManifest.xml
fi

echo "Template has been reset to its original state!"
echo "You can now run 'npx create-expo-app my-app --template expo-rust-ffi-template' to test the template." 