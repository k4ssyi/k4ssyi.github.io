'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BLOG_POSTS,
  EDUCATION,
  EMAIL,
  GOOGLE_FORM_URL,
  PROFILE,
  SKILLS,
  SNS_LINKS,
  WORK,
} from '@/data/content'
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
