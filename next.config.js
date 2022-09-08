/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // This setting is needed for Docker, but the side effect is that it disables automatic refreshes of css
  // output: 'standalone',
  webpack(config) {
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { asyncWebAssembly: true }

    return config
  }
}
