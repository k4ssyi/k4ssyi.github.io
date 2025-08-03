import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Alert from '@/app/_components/alert'
import { BadgeList } from '@/app/_components/badge-list'
import Container from '@/app/_components/container'
import Header from '@/app/_components/header'
import { PostBody } from '@/app/_components/post-body'
import { ProfileHeader } from '@/app/_components/profile-header'
import { getPostBySlug } from '@/lib/api'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

// プロフィール用のバッジデータを抽出する関数
function extractBadgesFromMarkdown(content: string) {
  // スキル
  const skillMatch = content.match(/## スキル\s+([\s\S]+?)(?:\n## |\n$)/)
  const skills = skillMatch?.[1]
    ? skillMatch[1]
        .replace(/\n/g, '')
        .replace(/、/g, ',')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  // 実績
  const achievementsMatch = content.match(/## 実績\s+([\s\S]+?)(?:\n## |\n$)/)
  const achievements = achievementsMatch?.[1]
    ? achievementsMatch[1]
        .split('\n')
        .map((line) => line.replace(/^- /, '').trim())
        .filter((s) => s.length > 0)
    : []

  // 資格
  const certMatch = content.match(/## 資格\s+([\s\S]+?)(?:\n## |\n$)/)
  const certifications = certMatch?.[1]
    ? certMatch[1]
        .split('\n')
        .map((line) => line.replace(/^- /, '').trim())
        .filter((s) => s.length > 0)
    : []

  // 言語
  const langMatch = content.match(/## 言語\s+([\s\S]+?)(?:\n## |\n$)/)
  const languages = langMatch?.[1]
    ? langMatch[1]
        .split('\n')
        .map((line) => line.replace(/^- /, '').trim())
        .filter((s) => s.length > 0)
    : []

  return { skills, achievements, certifications, languages }
}

export default async function ProfilePage() {
  const post = getPostBySlug('profile')

  if (!post) {
    return notFound()
  }

  // Markdown本文からバッジ用データを抽出
  const { skills, achievements, certifications, languages } =
    extractBadgesFromMarkdown(post.content || '')

  const content = await markdownToHtml(post.content || '')

  return (
    <main>
      {post.preview && <Alert preview={post.preview} />}
      <Container>
        <Header />
        <ProfileHeader
          name={post.author.name}
          title={post.title}
          picture={post.author.picture}
          coverImage={post.coverImage}
        />
        <div className='max-w-2xl mx-auto mb-8'>
          <BadgeList title='スキル' items={skills} />
          <BadgeList title='実績' items={achievements} />
          <BadgeList title='資格' items={certifications} />
          <BadgeList title='言語' items={languages} />
        </div>
        <article className='mb-32'>
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const post = getPostBySlug('profile')
  if (!post) return {}
  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`
  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage?.url || ''],
    },
  }
}
