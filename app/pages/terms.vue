<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">利用規約</h1>
      
      <div class="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第1条（適用）</h2>
          <p class="text-gray-700 leading-relaxed">
            本規約は、ボイス素材作るくん（以下「本サービス」）の利用に関する条件を定めるものです。本サービスを利用するすべてのユーザーは、本規約に同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第2条（サービスの内容）</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            本サービスは、WAVファイルから音声区間を切り抜くためのWebアプリケーションを提供します。主な機能は以下の通りです：
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>WAVファイルの読み込みと波形表示</li>
            <li>無音検出による自動音声区間抽出</li>
            <li>音声区間の再生と編集</li>
            <li>選択した区間の一括エクスポート</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第3条（利用条件）</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            ユーザーは、以下の行為を行ってはなりません：
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーまたは第三者の権利を侵害する行為</li>
            <li>本サービスを不正な目的で利用する行為</li>
            <li>本サービスのリバースエンジニアリング、逆コンパイル、逆アセンブル</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第4条（著作権・知的財産権）</h2>
          <p class="text-gray-700 leading-relaxed">
            本サービスに関する著作権、知的財産権は、本サービス運営者または正当な権利者に帰属します。ユーザーがアップロードした音声ファイルの著作権は、ユーザーまたは正当な権利者に帰属します。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第5条（免責事項）</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            本サービスは「現状有姿」で提供されます。運営者は、以下について一切の責任を負いません：
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>本サービスの正確性、完全性、有用性</li>
            <li>本サービスの中断、停止、終了</li>
            <li>本サービスの利用により生じた損害</li>
            <li>ユーザーのデバイスやデータの損失</li>
            <li>第三者との紛争</li>
          </ul>
          <p class="text-gray-700 leading-relaxed mt-4">
            本サービスはブラウザ上で動作するため、音声ファイルの処理結果についてはユーザーの責任において確認してください。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第6条（サービスの変更・停止）</h2>
          <p class="text-gray-700 leading-relaxed">
            運営者は、ユーザーへの事前通知なく、本サービスの内容を変更、または提供を停止することができます。これにより生じた損害について、運営者は一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第7条（利用規約の変更）</h2>
          <p class="text-gray-700 leading-relaxed">
            運営者は、必要に応じて本規約を変更することができます。変更後の規約は、本ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第8条（準拠法・管轄裁判所）</h2>
          <p class="text-gray-700 leading-relaxed">
            本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄裁判所とします。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">第9条（お問い合わせ）</h2>
          <p class="text-gray-700 leading-relaxed">
            本規約に関するお問い合わせは、<a href="https://github.com/namoo-san/wav-VoiceClipper/issues" target="_blank" rel="noopener" class="text-primary-500 hover:text-primary-600 underline">GitHubのIssue</a>までお願いいたします。
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
  title: '利用規約 - ボイス素材作るくん',
  meta: [
    { name: 'description', content: 'ボイス素材作るくんの利用規約。サービスの利用条件について説明します。' },
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
