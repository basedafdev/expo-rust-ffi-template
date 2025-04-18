module.exports = {
    placeholderName: "MyApp",
    templateDir: "./", // this can be "." if the template is the root
    postInitScript: "./post-init.js", // optional setup script
    name: 'expo-rust-ffi-template',
    description: 'A template for creating Expo apps with Rust FFI support',
    version: '0.1.0',
    slug: 'expo-rust-ffi-template',
    scheme: 'exporustffi',
    ios: {
        bundleIdentifier: 'com.anonymous.exporustffi',
    },
    android: {
        package: 'com.anonymous.exporustffi',
    },
};