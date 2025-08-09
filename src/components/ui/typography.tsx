'use client'

import React from 'react'

type TypographyH1Props = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
export const TypographyH1: React.FC<TypographyH1Props> = ({
  className = '',
  as: Tag = 'h1',
  ...props
}) => (
  <Tag
    className={
      'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ' +
      className
    }
    {...props}
  />
)

type TypographyPProps = React.HTMLAttributes<HTMLParagraphElement>
export const TypographyP: React.FC<TypographyPProps> = ({
  className = '',
  ...props
}) => (
  <p
    className={'leading-7 mb-4 [&:not(:first-child)]:mt-6 ' + className}
    {...props}
  />
)
