# 開発ガイドライン

## 設計パターン・方針

### Next.js 15 App Router

- ファイルベースルーティング採用
- Server Componentをデフォルト使用
- Client Componentは必要時のみ `"use client"` 指定

### コンポーネント設計

- **UI Components**: `src/components/ui/` - 再利用可能
- **Layout Components**: `src/components/layout/` - レイアウト専用
- Chakra UI v3のコンポーネントシステムを活用

### 状態管理

- 可能な限りServer Componentで完結
- Client側の状態は最小限に抑制

### API統合

- microCMS HeadlessAPI経由でコンテンツ取得
- 環境変数での設定管理
- 型安全なAPIレスポンス処理

## セキュリティ考慮事項

- APIキーは環境変数で管理
- 本番環境では適切な環境分離

## パフォーマンス最適化

- Next.js 15の最適化機能活用
- 画像は `images.microcms-assets.io` からの配信
- Chakra UIパッケージの最適化インポート設定済み

## アクセシビリティ

- 日本語サイト (`lang="ja"`)
- セマンティックHTML構造
- Chakra UIのアクセシビリティ機能活用

## 国際化対応

- 日本語コンテンツがメイン
- UIテキストは日本語
