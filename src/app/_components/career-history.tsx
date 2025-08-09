'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH1, TypographyP } from '@/components/ui/typography'

type Education = {
  school: string
  degree: string
  period: string
}

type Work = {
  company: string
  role: string
  period: string
  description?: string
}

type CareerHistoryProps = {
  education: Education[]
  work: Work[]
}

export const CareerHistory: React.FC<CareerHistoryProps> = ({
  education,
  work,
}) => (
  <section aria-label='経歴・職務経歴'>
    <TypographyH1 className='text-2xl mb-4'>学歴</TypographyH1>
    <ul className='flex flex-col gap-2 p-0 m-0'>
      {education.map((edu, i) => (
        <li key={i} className='list-none'>
          <Card className='border-0 bg-gradient-to-br from-white via-green-50 to-green-100 shadow hover:shadow-lg transition-shadow'>
            <CardContent className='p-4'>
              <div className='font-bold flex items-center gap-2'>
                {edu.school}
                <Badge
                  variant='outline'
                  className='text-xs px-2 py-1 rounded'
                  style={{
                    fontWeight: 600,
                    fontFamily: 'system-ui, sans-serif',
                    letterSpacing: '0.01em',
                  }}
                  aria-label='在学期間'
                  title='在学期間'
                >
                  {edu.period}
                </Badge>
              </div>
              <TypographyP className='text-base mt-1 mb-0 text-gray-700'>
                {edu.degree}
              </TypographyP>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
    <TypographyH1 className='text-2xl mt-8 mb-4'>
      職歴・プロジェクト
    </TypographyH1>
    <ul className='flex flex-col gap-2 p-0 m-0'>
      {work.map((job, i) => (
        <li key={i} className='list-none'>
          <Card className='border-0 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 shadow hover:shadow-lg transition-shadow'>
            <CardContent className='p-4'>
              <div className='font-bold flex items-center gap-2'>
                {job.company}
                <Badge
                  variant='outline'
                  className='text-xs px-2 py-1 rounded'
                  style={{
                    fontWeight: 600,
                    fontFamily: 'system-ui, sans-serif',
                    letterSpacing: '0.01em',
                  }}
                  aria-label='在籍期間'
                  title='在籍期間'
                >
                  {job.period}
                </Badge>
              </div>
              <div className='font-medium'>{job.role}</div>
              {job.description && (
                <TypographyP className='text-sm mt-1 mb-0 text-gray-700'>
                  {job.description}
                </TypographyP>
              )}
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  </section>
)
