# コードベース構造

## ディレクトリ構造

```
src/
├── app/                        # Next.js App Router
│   ├── blogs/                  # ブログ機能
│   │   ├── [id]/              # 個別ブログページ
│   │   └── page.tsx           # ブログ一覧（PAGE_SIZE = 12）
│   ├── contact/               # お問い合わせページ
│   ├── thanks/                # サンクスページ
│   ├── layout.tsx             # ルートレイアウト
│   ├── page.tsx               # ホームページ
│   └── not-found.tsx          # 404ページ
├── components/
│   ├── ui/                    # 再利用可能UIコンポーネント
│   │   ├── blog-card.tsx
│   │   ├── pagination.tsx
│   │   ├── button.tsx
│   │   └── ...               # 各種UIコンポーネント
│   └── layout/               # レイアウトコンポーネント
│       ├── header.tsx
│       └── footer.tsx
└── lib/
    └── microCMSClient.ts     # microCMS API クライアント

public/                       # 静的アセット
```

## 主要なルート

- `/` - ホームページ（メインビジュアル）
- `/blogs` - ブログ一覧（ページネーション付き）
- `/blogs/[id]` - 個別ブログ記事
- `/contact` - お問い合わせフォーム  
- `/thanks` - サンクスページ

## データフェッチング
- Server-side renderingでmicroCMS APIからコンテンツ取得
- TypeScript型安全なAPI レスポンス
- ページネーション（12記事/ページ）