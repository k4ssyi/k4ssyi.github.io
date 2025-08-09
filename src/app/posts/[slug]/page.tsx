/**
 * ブログ記事詳細ページ
 * - レイアウト・デザイン調整
 * - アクセシビリティ対応
 * - Markdown→HTML変換時のサニタイズ
 */

import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

// ダミーデータ（本来はMDファイルやAPIから取得）
const BLOG_POSTS = [
  {
    slug: 'hello-world',
    title: 'はじめてのブログ投稿',
    date: '2024-07-01',
    summary: 'このブログではフロントエンド技術やキャリアについて発信します。',
    coverImage: '/assets/blog/hello-world/cover.jpg',
    content: `# はじめてのブログ投稿

こんにちは！山田太郎です。

このブログではフロントエンド技術やキャリアについて発信していきます。

- React/Next.js
- TypeScript
- UI/UX

よろしくお願いします！`,
  },
  {
    slug: 'dynamic-routing',
    title: 'Next.jsの動的ルーティング入門',
    date: '2024-07-10',
    summary: 'Next.jsのApp Routerによる動的ルーティングの基本を解説します。',
    coverImage: '/assets/blog/dynamic-routing/cover.jpg',
    content: `# Next.jsの動的ルーティング入門

App Routerの[slug]ページの作り方を解説します。`,
  },
  {
    slug: 'preview',
    title: 'プレビュー機能の実装例',
    date: '2024-07-15',
    summary: 'ブログ記事のプレビュー機能をNext.jsで実装する方法を紹介します。',
    coverImage: '/assets/blog/preview/cover.jpg',
    content: `# プレビュー機能の実装例

Next.jsでブログ記事のプレビュー機能を作る方法を紹介します。`,
  },
]

// 記事データ取得
function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

/**
 * Next.js 15.0.2 (Turbopack) の params は Promise で渡される場合があるため
 * 必ず await してからプロパティアクセスする
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const awaitedParams = await params
  const slug = awaitedParams.slug
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      images: [post.coverImage],
    },
  }
}

// 静的生成用: 全slugリストを返す
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

const formatDate = (date: string) => {
  // YYYY-MM-DD → YYYY年M月D日
  const d = new Date(date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  // paramsはPromiseで渡される場合があるため、必ずawaitしてからアクセス
  const awaitedParams = await params
  const slug = awaitedParams.slug
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  return (
    <main>
      <article style={{ maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {post.title}
        </h1>
        <div
          style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1rem' }}
        >
          {formatDate(post.date)}
        </div>
        <Image
          src={post.coverImage}
          alt={`${post.title}のカバー画像`}
          width={700}
          height={350}
          style={{
            borderRadius: '8px',
            marginBottom: '1.5rem',
            objectFit: 'cover',
          }}
          priority
        />
        <div style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            components={{
              a: (props) => (
                <a
                  {...props}
                  style={{ color: '#1976d2', textDecoration: 'underline' }}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {props.children}
                </a>
              ),
              ul: (props) => (
                <ul
                  {...props}
                  style={{ paddingLeft: '1.5em', marginBottom: '1em' }}
                >
                  {props.children}
                </ul>
              ),
              ol: (props) => (
                <ol
                  {...props}
                  style={{ paddingLeft: '1.5em', marginBottom: '1em' }}
                >
                  {props.children}
                </ol>
              ),
              li: (props) => (
                <li {...props} style={{ marginBottom: '0.3em' }}>
                  {props.children}
                </li>
              ),
              h1: (props) => (
                <h1
                  {...props}
                  style={{ fontSize: '1.6rem', margin: '1.5em 0 0.7em' }}
                >
                  {props.children}
                </h1>
              ),
              h2: (props) => (
                <h2
                  {...props}
                  style={{ fontSize: '1.2rem', margin: '1.2em 0 0.6em' }}
                >
                  {props.children}
                </h2>
              ),
              p: (props) => (
                <p {...props} style={{ margin: '0.7em 0' }}>
                  {props.children}
                </p>
              ),
              code: (props) => (
                <code
                  {...props}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    padding: '0.2em 0.4em',
                    fontSize: '0.95em',
                  }}
                >
                  {props.children}
                </code>
              ),
              pre: (props) => (
                <pre
                  {...props}
                  style={{
                    background: '#222',
                    color: '#fff',
                    borderRadius: '6px',
                    padding: '1em',
                    overflowX: 'auto',
                    margin: '1em 0',
                  }}
                >
                  {props.children}
                </pre>
              ),
              blockquote: (props) => (
                <blockquote
                  {...props}
                  style={{
                    borderLeft: '4px solid #1976d2',
                    background: '#f0f4fa',
                    margin: '1em 0',
                    padding: '0.5em 1em',
                    color: '#333',
                  }}
                >
                  {props.children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  )
}

export default BlogDetailPage
