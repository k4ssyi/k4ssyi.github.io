'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH1 } from '@/components/ui/typography'

type Skill = {
  name: string
  isMain?: boolean
}

type SkillsetProps = {
  skills: Skill[]
}

export const Skillset: React.FC<SkillsetProps> = ({ skills }) => (
  <section aria-label='スキルセット'>
    <TypographyH1 className='text-2xl mb-4'>スキルセット</TypographyH1>
    <Card>
      <CardContent className='flex flex-wrap gap-2 p-4'>
        {skills.map((skill) => (
          <Badge
            key={skill.name}
            variant={skill.isMain ? 'default' : 'outline'}
            className={`text-base px-4 py-2 rounded-full flex items-center gap-1 transition-all duration-200 ${skill.isMain ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' : 'hover:bg-blue-50 hover:border-blue-300'} `}
            style={{
              letterSpacing: '0.02em',
              fontWeight: skill.isMain ? 700 : 500,
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.05rem',
            }}
          >
            {skill.name}
            {skill.isMain && (
              <span
                className='ml-1 text-yellow-300 text-lg drop-shadow'
                aria-label='メインスキル'
                title='メインスキル'
                role='img'
              >
                ★
              </span>
            )}
          </Badge>
        ))}
      </CardContent>
    </Card>
  </section>
)
