# my-blog

## GitHub Pagesデプロイ手順

1. `next.config.js` の `distDir` を `dist` に設定
2. 静的エクスポートビルド  

   ```bash
   pnpm run build
   pnpm exec next export
   ```

3. `out/` ディレクトリの内容を `gh-pages` ブランチにpush
4. GitHub Pagesの設定で `gh-pages` ブランチの `/` ディレクトリを公開対象にする

### 注意

- 画像やアセットのパスは `/my-blog/` から始まるようにしてください（GitHub Pagesでサブディレクトリ運用する場合）。
- `public/` 配下のファイルは自動でコピーされます。
- Next.js 15以降（Turbopack）では、`params`はPromiseで渡される場合があるため、`await params`してからプロパティアクセスしてください（`src/app/posts/[slug]/page.tsx`参照）。
