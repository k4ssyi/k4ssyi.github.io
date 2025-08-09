'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH1, TypographyP } from '@/components/ui/typography'

type ProfileInfoProps = {
  name: string
  avatarUrl: string
  bio: string
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  avatarUrl,
  bio,
}) => (
  <section aria-label='プロフィール情報' className='mb-6'>
    <Card className='flex items-center gap-8 p-8 shadow-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 border-0'>
      <Avatar className='w-28 h-28 ring-4 ring-blue-200 shadow-md'>
        <AvatarImage src={avatarUrl} alt={`${name}のアバター`} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <CardContent className='p-0'>
        <TypographyH1 className='text-4xl mb-2 tracking-tight'>
          {name}
        </TypographyH1>
        <TypographyP className='text-base text-muted-foreground mb-2'>
          {bio}
        </TypographyP>
        <div className='flex gap-2 mt-2'>
          <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
            Freelance
          </span>
          <span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded'>
            Web Engineer
          </span>
        </div>
      </CardContent>
    </Card>
  </section>
)
