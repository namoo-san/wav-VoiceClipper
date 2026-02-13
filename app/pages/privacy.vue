<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>
      
      <div class="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">1. はじめに</h2>
          <p class="text-gray-700 leading-relaxed">
            ボイス素材作るくん（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、本サービスにおける個人情報の取り扱いについて説明するものです。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">2. 収集する情報</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            本サービスは、以下の情報を収集する場合があります：
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時など）</li>
            <li>Cookieによる匿名の利用統計情報</li>
          </ul>
          <p class="text-gray-700 leading-relaxed mt-4">
            <strong>重要：</strong>本サービスは完全にブラウザ上で動作するため、アップロードされた音声ファイルやその内容は一切サーバーに送信されません。全ての処理はお使いのデバイス上で完結します。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">3. 情報の利用目的</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            収集した情報は、以下の目的で利用します：
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>サービスの提供・運営</li>
            <li>サービスの改善・最適化</li>
            <li>利用状況の分析</li>
            <li>不正利用の防止</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">4. 情報の第三者提供</h2>
          <p class="text-gray-700 leading-relaxed">
            本サービスは、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">5. Cookieについて</h2>
          <p class="text-gray-700 leading-relaxed">
            本サービスは、サービスの利便性向上のためにCookieを使用する場合があります。Cookieの使用を望まない場合は、ブラウザの設定で無効にすることができます。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">6. アクセス解析ツール</h2>
          <p class="text-gray-700 leading-relaxed">
            本サービスは、サービス向上のためにGoogle Analyticsなどのアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用して匿名の統計情報を収集します。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">7. セキュリティ</h2>
          <p class="text-gray-700 leading-relaxed">
            本サービスは、情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を実施します。ただし、本サービスはクライアントサイドで動作するため、音声ファイルはユーザーのデバイス上でのみ処理され、外部に送信されることはありません。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">8. プライバシーポリシーの変更</h2>
          <p class="text-gray-700 leading-relaxed">
            本プライバシーポリシーは、法令の変更や本サービスの機能追加等に伴い、予告なく変更される場合があります。変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">9. お問い合わせ</h2>
          <p class="text-gray-700 leading-relaxed">
            本プライバシーポリシーに関するお問い合わせは、<a href="https://github.com/namoo-san/wav-VoiceClipper/issues" target="_blank" rel="noopener" class="text-primary-500 hover:text-primary-600 underline">GitHubのIssue</a>までお願いいたします。
          </p>
        </section>

        <section class="pt-8 border-t border-gray-200">
          <p class="text-gray-600 text-sm">
            制定日：2024年2月13日<br>
            最終更新日：2024年2月13日
          </p>
        </section>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
        >
          <Icon name="mdi:arrow-left" />
          トップページに戻る
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'プライバシーポリシー - ボイス素材作るくん',
  meta: [
    { name: 'description', content: 'ボイス素材作るくんのプライバシーポリシー。個人情報の取り扱いについて説明します。' },
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
