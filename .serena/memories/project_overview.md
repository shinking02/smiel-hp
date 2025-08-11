# プロジェクト概要

## プロジェクトの目的
手話ダンス教室「スマイル」のWebサイト。日本の手話ダンスグループの情報発信、ブログ投稿、お問い合わせ機能を提供。

## 技術スタック

### フロントエンド
- **Framework**: Next.js 15 (App Router使用)
- **Language**: TypeScript (strict mode)
- **UI Library**: Chakra UI v3
- **Styling**: Chakra UIのレスポンシブデザインシステム
- **Icons**: React Icons v5.4.0
- **Theme**: 強制的にライトモード (`forcedTheme="light"`)

### CMS・API
- **Headless CMS**: microCMS
- **SDK**: microcms-js-sdk v3.1.2
- **環境変数**: 
  - `MICROCMS_SERVICE_DOMAIN`
  - `MICROCMS_API_KEY`

### 開発ツール
- **Package Manager**: npm
- **Bundler**: Turbopack (開発時)
- **Linter**: ESLint + TypeScript ESLint
- **Formatter**: Prettier (import整理プラグイン付き)
- **Build Runner**: npm-run-all (並列実行)

## アーキテクチャ
- Next.js 15のApp Routerを使用したファイルベースルーティング
- Server-side renderingでmicroCMSからコンテンツを取得
- TypeScriptによる型安全性の確保
- Chakra UI v3によるモダンなコンポーネント設計