export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],

  dir: {
    pages: 'app/pages',
    layouts: 'app/layouts',
    middleware: 'app/middleware'
  },

  imports: {
    dirs: ['app/composables']
  },

  components: {
    dirs: ['app/components']
  },

  runtimeConfig: {
    public: {
      gitCommit: process.env.NUXT_PUBLIC_GIT_COMMIT || 'dev',
      buildTime: new Date().toISOString(),
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      title: 'ボイス素材作るくん - WAVファイル音声切り抜きツール',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '長時間のWAVファイルから必要な部分を簡単に切り抜けるWebアプリ。ブラウザだけで動作し、無音検出による自動区間抽出、波形表示、一括エクスポート機能を搭載。' },
        { name: 'keywords', content: 'WAV,音声編集,切り抜き,ボイス素材,無音検出,音声区間抽出,波形表示,オーディオ編集,ブラウザ,無料ツール' },
        { name: 'author', content: 'ボイス素材作るくん' },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'ボイス素材作るくん - WAVファイル音声切り抜きツール' },
        { property: 'og:description', content: '長時間のWAVファイルから必要な部分を簡単に切り抜けるWebアプリ。ブラウザだけで動作し、無音検出による自動区間抽出機能を搭載。' },
        { property: 'og:site_name', content: 'ボイス素材作るくん' },
        { property: 'og:locale', content: 'ja_JP' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'ボイス素材作るくん - WAVファイル音声切り抜きツール' },
        { name: 'twitter:description', content: '長時間のWAVファイルから必要な部分を簡単に切り抜けるWebアプリ。ブラウザだけで動作。' },
        
        // Theme
        { name: 'theme-color', content: '#667eea' },
        { name: 'msapplication-TileColor', content: '#667eea' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27><text y=%27.9em%27 font-size=%2790%27>🎵</text></svg>' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ボイス素材作るくん',
            description: '長時間のWAVファイルから必要な部分を簡単に切り抜けるWebアプリケーション',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'JPY'
            },
            featureList: [
              'WAVファイルの読み込み',
              '無音検出による自動区間抽出',
              '波形表示とズーム機能',
              '音声区間の再生',
              '一括エクスポート（ZIP形式）',
              'サーバー不要・プライバシー保護'
            ]
          })
        }
      ]
    }
  },

  nitro: {
    preset: 'netlify'
  },

  compatibilityDate: '2024-11-01'
})
