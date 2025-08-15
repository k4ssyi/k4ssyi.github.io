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
import { BLOG_POSTS } from '@/data/content'

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
      <article className='max-w-[700px] mx-auto'>
        <h1 className='text-3xl font-extrabold mb-2'>{post.title}</h1>
        <div className='text-muted-foreground text-sm mb-4'>
          {formatDate(post.date)}
        </div>
        <Image
          src={post.coverImage}
          alt={`${post.title}のカバー画像`}
          width={700}
          height={350}
          className='rounded-lg mb-6 object-cover'
          priority
        />
        <div className='prose prose-neutral max-w-none text-lg'>
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            components={{
              a: (props) => (
                <a
                  {...props}
                  className='text-blue-600 underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {props.children}
                </a>
              ),
              ul: (props) => (
                <ul {...props} className='list-disc pl-6 mb-4'>
                  {props.children}
                </ul>
              ),
              ol: (props) => (
                <ol {...props} className='list-decimal pl-6 mb-4'>
                  {props.children}
                </ol>
              ),
              li: (props) => (
                <li {...props} className='mb-1'>
                  {props.children}
                </li>
              ),
              h1: (props) => (
                <h1 {...props} className='text-2xl font-bold mt-8 mb-4'>
                  {props.children}
                </h1>
              ),
              h2: (props) => (
                <h2 {...props} className='text-xl font-semibold mt-6 mb-3'>
                  {props.children}
                </h2>
              ),
              p: (props) => (
                <p {...props} className='my-3'>
                  {props.children}
                </p>
              ),
              code: (props) => (
                <code
                  {...props}
                  className='bg-gray-100 rounded px-1 py-0.5 text-sm'
                >
                  {props.children}
                </code>
              ),
              pre: (props) => (
                <pre
                  {...props}
                  className='bg-gray-900 text-white rounded-lg p-4 overflow-x-auto my-4'
                >
                  {props.children}
                </pre>
              ),
              blockquote: (props) => (
                <blockquote
                  {...props}
                  className='border-l-4 border-blue-600 bg-blue-50 p-4 my-4 text-gray-800'
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
