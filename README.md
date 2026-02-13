# WAVボイス素材切り抜きツール

長時間のWAVファイルから必要な部分を簡単に切り抜けるWebアプリケーションです。

🔗 **デモ**: [Netlifyでホスト予定]

## 特徴

- ✨ 完全ブラウザ内で動作（サーバーにファイルをアップロードしません）
- 🎵 WAVファイルの波形視覚化
- 🔍 無音区間の自動検出
- 🔎 波形の拡大・縮小機能
- 📦 複数の切り抜きをキュー管理
- 💾 一括エクスポート（ZIP形式）
- 🎨 モダンなUI（Nuxt 3 + Tailwind CSS）

## 技術スタック

- **フレームワーク**: Nuxt 3
- **スタイリング**: Tailwind CSS
- **アイコン**: Nuxt Icon
- **音声処理**: Web Audio API
- **対応フォーマット**: WAV（PCM 16bit）

## セットアップ

### 前提条件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## ビルドとデプロイ

### 静的サイト生成

```bash
# 静的ファイルを生成
npm run generate

# 生成されたファイルは .output/public に出力されます
```

### Netlifyへのデプロイ

#### 方法1: Netlify CLIを使用

```bash
# Netlify CLIをインストール（初回のみ）
npm install -g netlify-cli

# ビルドしてデプロイ
npm run generate
netlify deploy --prod --dir=.output/public
```

#### 方法2: GitHubと連携

1. このリポジトリをGitHubにプッシュ
2. [Netlify](https://app.netlify.com/)にログイン
3. "New site from Git"を選択
4. GitHubリポジトリを選択
5. ビルド設定:
   - Build command: `npm run generate`
   - Publish directory: `.output/public`
6. "Deploy site"をクリック

#### 方法3: Netlify Drop

```bash
npm run generate
```

生成された `.output/public` フォルダを [Netlify Drop](https://app.netlify.com/drop) にドラッグ&ドロップ

## 使い方

1. 「WAVファイルを選択」ボタンからWAVファイルをアップロード
2. 「音声区間を自動検出」で無音部分を除いた音声区間を検出（オプション）
3. 波形上でマウスをドラッグ、または検出された区間をクリックして選択
4. 「キューに追加」で選択範囲をエクスポートキューに追加
5. ファイル名を編集（必要に応じて）
6. 「一括エクスポート」でZIPファイルとしてダウンロード

### ショートカットキー

- `+` / `=` : 波形を拡大
- `-` / `_` : 波形を縮小
- `←` : 前の音声区間へ移動
- `→` : 次の音声区間へ移動
- `Enter` / `Space` : 選択中の区間をキューに追加

## プロジェクト構造

```
.
├── app/
│   ├── components/          # Vueコンポーネント
│   │   ├── AudioUploader.vue
│   │   ├── WaveformViewer.vue
│   │   ├── DetectionPanel.vue
│   │   ├── RegionNavigation.vue
│   │   ├── AudioControls.vue
│   │   ├── TimeDisplay.vue
│   │   ├── ExportQueue.vue
│   │   ├── LoadingOverlay.vue
│   │   └── HelpModal.vue
│   ├── composables/         # Composable関数
│   │   ├── useAudioPlayback.ts
│   │   ├── useAudioDetection.ts
│   │   └── useAudioExport.ts
│   └── pages/
│       └── index.vue        # メインページ
├── public/                  # 静的ファイル
├── nuxt.config.ts          # Nuxt設定
├── tailwind.config.js      # Tailwind設定
├── netlify.toml            # Netlify設定
└── package.json
```

## プライバシー

このツールは完全にブラウザ内で動作します。アップロードしたファイルはサーバーに送信されず、全ての処理がお使いのデバイス上で行われます。

## ライセンス

MIT License

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。
