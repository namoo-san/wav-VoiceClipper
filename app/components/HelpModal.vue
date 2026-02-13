<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click="emit('update:modelValue', false)"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
          @click.stop
        >
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900">使い方</h2>
            <button
              @click="emit('update:modelValue', false)"
              class="text-gray-400 hover:text-gray-600 transition"
            >
              <Icon name="mdi:close" class="text-3xl" />
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <section>
              <h3 class="text-lg font-bold text-primary-600 mb-2 flex items-center gap-2">
                <Icon name="mdi:numeric-1-circle" />
                ファイルの読み込み
              </h3>
              <p class="text-gray-700">「WAVファイルを選択」ボタンからWAVファイルをアップロードします。</p>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-primary-600 mb-2 flex items-center gap-2">
                <Icon name="mdi:numeric-2-circle" />
                音声区間の検出
              </h3>
              <p class="text-gray-700">「音声区間を自動検出」ボタンで無音部分を除いた音声区間を自動検出できます。しきい値と最小音声長を調整して精度を変更できます。</p>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-primary-600 mb-2 flex items-center gap-2">
                <Icon name="mdi:numeric-3-circle" />
                範囲の選択
              </h3>
              <p class="text-gray-700">波形上でマウスをドラッグするか、検出された区間をクリックして選択します。時間を直接入力することも可能です。</p>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-primary-600 mb-2 flex items-center gap-2">
                <Icon name="mdi:numeric-4-circle" />
                波形の表示調整
              </h3>
              <p class="text-gray-700">拡大・縮小ボタンで波形を見やすく調整できます。「無音を圧縮表示」をオンにすると、長時間ファイルでも見やすくなります。</p>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-primary-600 mb-2 flex items-center gap-2">
                <Icon name="mdi:numeric-5-circle" />
                キューへ追加
              </h3>
              <p class="text-gray-700">「キューに追加」ボタンで選択範囲をエクスポートキューに追加します。ファイル名は編集可能です。</p>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-primary-600 mb-2 flex items-center gap-2">
                <Icon name="mdi:numeric-6-circle" />
                エクスポート
              </h3>
              <p class="text-gray-700">「一括エクスポート」ボタンでキュー内の全ファイルをZIPファイルとしてダウンロードします。</p>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-primary-600 mb-2 flex items-center gap-2">
                <Icon name="mdi:keyboard" />
                ショートカットキー
              </h3>
              <div class="space-y-2 text-gray-700">
                <p><kbd class="px-2 py-1 bg-gray-100 rounded border">+</kbd> / <kbd class="px-2 py-1 bg-gray-100 rounded border">=</kbd> : 波形を拡大</p>
                <p><kbd class="px-2 py-1 bg-gray-100 rounded border">-</kbd> / <kbd class="px-2 py-1 bg-gray-100 rounded border">_</kbd> : 波形を縮小</p>
                <p><kbd class="px-2 py-1 bg-gray-100 rounded border">←</kbd> : 前の音声区間へ移動</p>
                <p><kbd class="px-2 py-1 bg-gray-100 rounded border">→</kbd> : 次の音声区間へ移動</p>
                <p><kbd class="px-2 py-1 bg-gray-100 rounded border">Enter</kbd> / <kbd class="px-2 py-1 bg-gray-100 rounded border">Space</kbd> : 選択中の区間をキューに追加</p>
              </div>
            </section>
            
            <section class="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 class="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">
                <Icon name="mdi:shield-check" />
                プライバシー
              </h3>
              <p class="text-gray-700">このツールは完全にブラウザ内で動作します。アップロードしたファイルはサーバーに送信されず、全ての処理がお使いのデバイス上で行われます。</p>
            </section>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
