# 推奨コマンド

## 開発コマンド

### メイン開発

```bash
npm run dev          # 開発サーバー起動（Turbopack使用）
npm run build        # 本番ビルド
npm start            # 本番サーバー起動
```

### コード品質

```bash
npm run lint         # 全リント実行（ESLint + Prettier並列）
npm run fix          # 自動修正（Prettier → ESLint順次）
```

#### 詳細リントコマンド

```bash
npm run lint:eslint      # ESLintのみ
npm run lint:prettier    # Prettierチェックのみ
npm run fix:prettier     # Prettier自動フォーマット
npm run fix:eslint       # ESLint自動修正
```

## Git関連

```bash
git status          # ステータス確認
git add .           # 全変更をステージング
git commit -m "prefix: message"  # Angular規約でコミット
```

## システムコマンド (Darwin/macOS)

```bash
ls -la              # ファイル一覧表示
find . -name "*.tsx" # TypeScriptファイル検索
grep -r "pattern" src/ # パターン検索
cd path/to/directory   # ディレクトリ移動
```

## ビルド・リント・テストの完了チェック

タスク完了時は以下の順で実行:

1. `npm run fix` - 自動フォーマット・修正
2. `npm run lint` - リント確認
3. `npm run build` - ビルド確認
