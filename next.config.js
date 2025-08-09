/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  // 静的エクスポート時に404.htmlを生成（GitHub PagesでのSPAルーティング対策）
  trailingSlash: true,
}

module.exports = nextConfig
