import Link from 'next/link'
import Container from '@/app/_components/container'
import { HeroPost } from '@/app/_components/hero-post'
import { Intro } from '@/app/_components/intro'
import { MoreStories } from '@/app/_components/more-stories'
import { getAllPosts } from '@/lib/api'

export default function Index() {
  const allPosts = getAllPosts()
  const heroPost = allPosts[0]

  const morePosts = allPosts.slice(1)

  return (
    <main>
      <Container>
        <Intro />
        <div style={{ margin: '24px 0' }}>
          <Link
            href='/posts/profile'
            style={{
              display: 'inline-block',
              background: '#f3f4f6',
              color: '#222',
              borderRadius: 6,
              padding: '10px 20px',
              fontWeight: 500,
              textDecoration: 'none',
              border: '1px solid #e5e7eb',
              transition: 'background 0.2s',
            }}
            aria-label='Wantedlyプロフィールまとめページへ'
          >
            Wantedlyプロフィールを見る
          </Link>
        </div>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  )
}
