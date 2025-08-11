# Git コミット規約

## Angular規約ベース

`.cursorrules`で定義されたコミットメッセージ規約:

## 基本フォーマット

```
prefix: message
```

## プレフィックス規則

- `feat:` 新機能の追加
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `style:` コードの意味に影響しない変更（フォーマット、セミコロンなど）
- `refactor:` バグ修正でも機能追加でもないコード変更
- `perf:` パフォーマンス改善のコード変更
- `test:` テストの追加・修正
- `chore:` ビルドプロセスや補助ツールの変更

## ルール

- **必須**: プレフィックス使用
- **文字数**: プレフィックス含めて50文字以下
- **文体**: 命令形（imperative mood）
- **言語**: 英語必須
- **終端**: ピリオドなし

## 例

```bash
feat: add blog pagination component
fix: resolve mobile header layout issue
docs: update README installation steps
style: format code with prettier
refactor: extract header component logic
```
