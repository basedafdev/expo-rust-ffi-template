Pod::Spec.new do |s|
  s.name           = 'RustFFI'
  s.version        = '1.0.0'
  s.summary        = 'Rust FFI Template'
  s.description    = 'Template for Rust FFI integration with Expo'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.source         = { git: '' }
  s.license        = { :type => 'MIT' }

  s.source_files = "generated/*.{h,swift,modulemap}"
  s.public_header_files = 'generated/*.h'

  s.vendored_libraries = 'generated/*.a'
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_INCLUDE_PATHS' => '${PODS_TARGET_SRCROOT}/swift'
  }

  # Build as a framework
  s.static_framework = true

  s.preserve_paths = [
    'generated/*.a'
  ]
end 