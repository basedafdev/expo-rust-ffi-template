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
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(new RegExp(search, 'g'), replace);
  fs.writeFileSync(filePath, newContent);
}

// Function to modify Podfile
function modifyPodfile(podfilePath) {
  if (!fs.existsSync(podfilePath)) {
    console.log(`Podfile not found: ${podfilePath}`);
    return;
  }

  const content = fs.readFileSync(podfilePath, 'utf8');
  const targetLine = `target '${appName.toLowerCase()}' do`;
  const rustFFIPod = '  # Add RustFFI pod\n  pod \'RustFFI\', :path => \'../modules/rust_ffi/ios\'\n';
  
  if (content.includes(targetLine)) {
    const newContent = content.replace(
      `${targetLine}\n  use_expo_modules!`,
      `${targetLine}\n  use_expo_modules!\n\n${rustFFIPod}`
    );
    fs.writeFileSync(podfilePath, newContent);
    console.log('Added RustFFI pod to Podfile');
  } else {
    console.log('Could not find target line in Podfile');
  }
}

// Function to rename directory
function renameDirectory(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
}

// Function to process all files in a directory recursively
function processDirectory(dirPath, callback) {
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath, callback);
    } else {
      callback(filePath);
    }
  }
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
  replaceInFile(filePath, search, replace);
});

// Process iOS project files
const iosFiles = [
  'hedgepayexpoapp.xcodeproj',
  'hedgepayexpoapp.xcworkspace',
  'hedgepayexpoapp'
];

// Rename iOS directories and files
iosFiles.forEach(file => {
  const oldPath = path.join('ios', file);
  const newPath = path.join('ios', file.replace('hedgepayexpoapp', appName.toLowerCase()));
  renameDirectory(oldPath, newPath);
});

// Process all files in the ios directory to replace references
processDirectory('ios', (filePath) => {
  if (filePath.includes('hedgepayexpoapp')) {
    const newPath = filePath.replace('hedgepayexpoapp', appName.toLowerCase());
    renameDirectory(filePath, newPath);
  } else {
    replaceInFile(filePath, 'hedgepayexpoapp', appName.toLowerCase());
  }
});

// Process all files in the android directory to replace references
processDirectory('android', (filePath) => {
  replaceInFile(filePath, 'hedgepayexpoapp', appName.toLowerCase());
});

// Rename Android package directories
const androidPackagePath = path.join('android', 'app', 'src', 'main', 'java', 'com', 'anonymous');
if (fs.existsSync(androidPackagePath)) {
  const oldPackagePath = path.join(androidPackagePath, 'hedgepayexpoapp');
  const newPackagePath = path.join(androidPackagePath, appName.toLowerCase());
  renameDirectory(oldPackagePath, newPackagePath);
}

// Modify Podfile to include RustFFI pod
const podfilePath = path.join('ios', 'Podfile');
modifyPodfile(podfilePath);

console.log('Template setup complete!'); 