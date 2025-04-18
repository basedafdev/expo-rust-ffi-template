const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the app name from the command line arguments
const appName = process.argv[2];

if (!appName) {
  console.error('Please provide an app name');
  process.exit(1);
}

// Function to replace text in a file
function replaceInFile(filePath, search, replace) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(new RegExp(search, 'g'), replace);
  fs.writeFileSync(filePath, newContent);
}

// Replace package names and identifiers
const filesToUpdate = [
  {
    path: 'android/app/build.gradle',
    search: 'com.anonymous.hedgepayexpoapp',
    replace: `com.anonymous.${appName.toLowerCase()}`
  },
  {
    path: 'ios/hedgepayexpoapp/Info.plist',
    search: 'com.anonymous.hedgepayexpoapp',
    replace: `com.anonymous.${appName.toLowerCase()}`
  },
  {
    path: 'android/app/src/main/AndroidManifest.xml',
    search: 'com.anonymous.hedgepayexpoapp',
    replace: `com.anonymous.${appName.toLowerCase()}`
  },
  {
    path: 'android/app/src/main/java/com/anonymous/hedgepayexpoapp/MainActivity.kt',
    search: 'com.anonymous.hedgepayexpoapp',
    replace: `com.anonymous.${appName.toLowerCase()}`
  },
  {
    path: 'android/app/src/main/java/com/anonymous/hedgepayexpoapp/MainApplication.kt',
    search: 'com.anonymous.hedgepayexpoapp',
    replace: `com.anonymous.${appName.toLowerCase()}`
  }
];

// Update all files
filesToUpdate.forEach(({ path: filePath, search, replace }) => {
  if (fs.existsSync(filePath)) {
    replaceInFile(filePath, search, replace);
  }
});

// Rename iOS project files
const iosFiles = [
  'hedgepayexpoapp.xcodeproj',
  'hedgepayexpoapp.xcworkspace',
  'hedgepayexpoapp'
];

iosFiles.forEach(file => {
  const oldPath = path.join('ios', file);
  const newPath = path.join('ios', file.replace('hedgepayexpoapp', appName.toLowerCase()));
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
});

console.log('Template setup complete!'); 