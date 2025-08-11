# コードスタイル・規約

## TypeScript設定

- **Strict Mode**: 有効
- **Target**: ESNext
- **Module Resolution**: bundler
- **Path Aliases**: `@/*` → `./src/*`

## ESLint規約

- Next.js core-web-vitals
- TypeScript推奨設定
- **Type Import**: 型インポートは分離 (`prefer: "type-imports"`)
- **未使用変数**: `_`プレフィックスは除外
- **React**:
    - JSX中括弧の不要な使用を禁止
    - 自己終了タグの強制
    - hooks依存配列の厳密チェック
- **Console**: `console.log`禁止（`warn`, `error`は許可）

## Prettier設定

- **Tab Width**: 4スペース
- **Print Width**: 140文字
- **Quotes**: ダブルクォート
- **Trailing Comma**: すべて追加
- **Arrow Params**: 常に括弧付き
- **Import Organization**: prettier-plugin-organize-imports使用

## ファイル命名規約

- コンポーネントファイル: kebab-case (例: `blog-card.tsx`)
- ページファイル: `page.tsx`, `layout.tsx`, `not-found.tsx`
- 設定ファイル: camelCase (例: `microCMSClient.ts`)

## React/Next.js規約

- App Routerのファイルベースルーティング
- Server Componentをデフォルト使用
- Chakra UI v3のコンポーネント使用
- 日本語対応 (`lang="ja"`)
