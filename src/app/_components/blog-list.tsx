import Image from 'next/image'
import React from 'react'

type BlogPost = {
  slug: string
  title: string
  date: string
  summary: string
  coverImage: string
}

type BlogListProps = {
  posts: BlogPost[]
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => (
  <section aria-label='ブログ記事一覧'>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>ブログ</h2>
    <ul>
      {posts.map((post) => (
        <li
          key={post.slug}
          style={{ marginBottom: '1.5rem', listStyle: 'none' }}
        >
          <a
            href={`/posts/${post.slug}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
            aria-label={`${post.title} の詳細ページへ`}
          >
            <Image
              src={post.coverImage}
              alt={`${post.title}のカバー画像`}
              width={80}
              height={80}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
              priority
            />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {post.title}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {post.date}
              </div>
              <div style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {post.summary}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </section>
)
