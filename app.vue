<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition">
          <Icon name="mdi:waveform" class="text-primary-500 text-2xl" />
          <h1 class="text-lg font-bold text-gray-900">ボイス素材作るくん</h1>
        </NuxtLink>
        <nav class="flex items-center gap-4">
          <NuxtLink to="/tool" class="text-gray-600 hover:text-primary-500 transition text-sm font-medium">
            ツール
          </NuxtLink>
          <a href="https://github.com/namoo-san/wav-VoiceClipper" target="_blank" rel="noopener" class="text-gray-600 hover:text-primary-500 transition text-sm">
            <Icon name="mdi:github" class="inline text-xl" />
          </a>
        </nav>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-1">
      <NuxtPage />
    </main>
  </div>
</template>
