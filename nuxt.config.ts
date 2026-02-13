export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],

  app: {
    head: {
      title: 'WAVボイス素材切り抜きツール',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '長時間のWAVファイルから必要な部分を簡単に切り抜けるWebアプリケーション' },
        { name: 'keywords', content: 'WAV,音声編集,切り抜き,ボイス素材,無音検出' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27><text y=%27.9em%27 font-size=%2790%27>🎵</text></svg>' }
      ]
    }
  },

  nitro: {
    preset: 'netlify'
  },

  compatibilityDate: '2024-11-01'
})
