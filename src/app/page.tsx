'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogList } from './_components/blog-list'
import { CareerHistory } from './_components/career-history'
import { Contact } from './_components/contact'
import { ProfileInfo } from './_components/profile-info'
import { Skillset } from './_components/skillset'

type TabValue = 'career' | 'skills' | 'blog'

const parseTab = (v: string | null): TabValue => {
  if (v === 'career' || v === 'skills' || v === 'blog') return v
  return 'career'
}

const PROFILE = {
  name: '笠井 凌',
  avatarUrl: '/assets/profile/avatar.jpg',
  bio: 'フリーランスWebエンジニア。アーリー・グロース期のスタートアップでフロントエンド・バックエンド両方の開発経験あり。ピザ2枚ルール（5〜10人）規模のチームでアジャイル開発に慣れています。副業案件もご相談ください。',
}

const EDUCATION = [
  {
    school: '穴吹コンピュータ専門学校',
    degree: '情報システム学科',
    period: '2015年3月 卒業',
  },
]

const WORK = [
  {
    company: 'フリーランス',
    role: 'Webエンジニア',
    period: '2020年 - 現在',
    description:
      '不動産事業、FinTech事業、HR事業など様々な会社で業務委託・副業として参画。アーリー・グロース期のプロダクトでフロントエンド・バックエンド両方を担当。',
  },
  {
    company: '株式会社ミツモア',
    role: 'エンジニア（業務委託）',
    period: '2023年8月 - 現在',
    description: '',
  },
  {
    company: '株式会社miive',
    role: 'エンジニア',
    period: '2023年4月 - 2023年6月',
    description:
      '社内オペレーションサイトの機能修正、福利厚生アプリの新規機能追加。フロントエンド（TypeScript, React）、バックエンド（Golang）、アプリ（React Native）領域を担当。',
  },
  {
    company: '株式会社いい生活',
    role: 'バックエンドエンジニア',
    period: '2022年6月 - 2023年3月',
    description:
      'スクラム開発を経験。10年以上続く大規模プロダクトの機能改修・保守を担当。複雑なコードのリーディング・改修経験。',
  },
  {
    company: 'BASE株式会社(PAY株式会社)',
    role: 'Webバックエンドエンジニア',
    period: '2020年 - 2021年',
    description:
      'Fintech領域でユーザ向けダッシュボードの機能追加。API設計、DB設計、バッチ処理、オープンソースへのコミット等を経験。',
  },
  {
    company: '株式会社GOOYA',
    role: 'Pythonエンジニア',
    period: '2019年1月 - 2020年',
    description: '複数案件を掛け持ちで担当。',
  },
  {
    company: 'ユニアデックス株式会社',
    role: 'カスタマーサポート・社内SE',
    period: '2015年 - 2018年',
    description:
      '業務システム運用監視、社内PCキッティング、PCトラブル対応などを担当。',
  },
]

const SKILLS = [
  { name: 'TypeScript', isMain: true },
  { name: 'React', isMain: true },
  { name: 'Next.js', isMain: true },
  { name: 'Golang' },
  { name: 'Python' },
  { name: 'HTML5' },
  { name: 'CSS3' },
  { name: 'Tailwind CSS' },
  { name: 'Node.js' },
  { name: 'Redux' },
  { name: 'React Native' },
  { name: 'Git', isMain: true },
  { name: 'GitFlow' },
  { name: 'Slack' },
  { name: 'Redmine' },
  { name: 'チケット駆動開発' },
]

const BLOG_POSTS = [
  {
    slug: 'hello-world',
    title: 'はじめてのブログ投稿',
    date: '2024-07-01',
    summary: 'このブログではフロントエンド技術やキャリアについて発信します。',
    coverImage: '/assets/blog/hello-world/cover.jpg',
  },
  {
    slug: 'dynamic-routing',
    title: 'Next.jsの動的ルーティング入門',
    date: '2024-07-10',
    summary: 'Next.jsのApp Routerによる動的ルーティングの基本を解説します。',
    coverImage: '/assets/blog/dynamic-routing/cover.jpg',
  },
  {
    slug: 'preview',
    title: 'プレビュー機能の実装例',
    date: '2024-07-15',
    summary: 'ブログ記事のプレビュー機能をNext.jsで実装する方法を紹介します。',
    coverImage: '/assets/blog/preview/cover.jpg',
  },
]

const GOOGLE_FORM_URL = 'https://forms.gle/your-google-form-id'
const EMAIL = 'sample@example.com'
const SNS_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/k4ssyi',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ryo-kasai-446073190',
  },
  {
    name: 'Wantedly',
    url: 'https://www.wantedly.com/id/ryo_kasai_li',
  },
]

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialTab = useMemo<TabValue>(() => {
    return parseTab(searchParams.get('tab'))
  }, [searchParams])

  const [tab, setTab] = useState<TabValue>(initialTab)

  useEffect(() => {
    const next = parseTab(searchParams.get('tab'))
    if (next !== tab) setTab(next)
  }, [searchParams, tab])

  const handleTabChange = useCallback(
    (next: string) => {
      const value = parseTab(next)
      setTab(value)
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('tab', value)
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  return (
    <main>
      <ProfileInfo
        name={PROFILE.name}
        avatarUrl={PROFILE.avatarUrl}
        bio={PROFILE.bio}
      />
      <Separator className='my-8' />
      <Tabs
        value={tab}
        onValueChange={handleTabChange}
        className='w-full max-w-2xl mx-auto'
      >
        <TabsList className='grid w-full grid-cols-3 mb-4'>
          <TabsTrigger value='career'>経歴</TabsTrigger>
          <TabsTrigger value='skills'>スキル</TabsTrigger>
          <TabsTrigger value='blog'>ブログ</TabsTrigger>
        </TabsList>
        <TabsContent value='career'>
          <CareerHistory education={EDUCATION} work={WORK} />
        </TabsContent>
        <TabsContent value='skills'>
          <Skillset skills={SKILLS} />
        </TabsContent>
        <TabsContent value='blog'>
          <BlogList posts={BLOG_POSTS} />
        </TabsContent>
      </Tabs>
      <Separator className='my-8' />
      <Contact
        googleFormUrl={GOOGLE_FORM_URL}
        email={EMAIL}
        snsLinks={SNS_LINKS}
      />
    </main>
  )
}
