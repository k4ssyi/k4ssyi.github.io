'use client'

import Image from 'next/image'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH1, TypographyP } from '@/components/ui/typography'

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
    <TypographyH1 className='text-2xl mb-4'>ブログ</TypographyH1>
    <ul className='flex flex-col gap-4 p-0 m-0'>
      {posts.map((post) => (
        <li key={post.slug} className='list-none'>
          <Card
            as='a'
            href={`/posts/${post.slug}`}
            aria-label={`${post.title} の詳細ページへ`}
            className='flex items-center gap-4 hover:shadow-2xl transition-shadow border-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 group no-underline text-inherit focus:outline-none focus:ring-2 focus:ring-blue-400'
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <div className='relative w-20 h-20 flex-shrink-0 overflow-hidden'>
              <Image
                src={post.coverImage}
                alt={`${post.title}のカバー画像`}
                width={80}
                height={80}
                className='rounded-lg object-cover shadow transition-transform duration-300 group-hover:scale-105'
                style={{ objectFit: 'cover', width: 80, height: 80 }}
                priority={false}
              />
            </div>
            <CardContent className='p-0 flex-1 min-w-0'>
              <div className='font-bold text-lg flex items-center gap-2 truncate'>
                <span className='truncate'>{post.title}</span>
                <Badge
                  variant='secondary'
                  className='ml-2 whitespace-nowrap'
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    fontFamily: 'system-ui, sans-serif',
                    padding: '0.15em 0.7em',
                  }}
                  aria-label='投稿日'
                  title='投稿日'
                >
                  {post.date}
                </Badge>
              </div>
              <TypographyP className='text-base mt-1 mb-0 text-gray-700 line-clamp-2'>
                {post.summary}
              </TypographyP>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  </section>
)
