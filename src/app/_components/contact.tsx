'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH1 } from '@/components/ui/typography'

type SnsLink = {
  name: string
  url: string
  icon?: React.ReactNode
}

type ContactProps = {
  googleFormUrl: string
  email?: string
  snsLinks?: SnsLink[]
}

export const Contact: React.FC<ContactProps> = ({
  googleFormUrl,
  email,
  snsLinks = [],
}) => (
  <section aria-label='連絡先'>
    <TypographyH1 className='text-2xl mb-4'>お問い合わせ</TypographyH1>
    <Card className='border-0 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 shadow-lg'>
      <CardContent className='p-6'>
        <div className='mb-6'>
          <a
            href={googleFormUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg font-bold no-underline hover:from-blue-700 hover:to-indigo-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400'
            aria-label='Googleフォームで問い合わせる'
            tabIndex={0}
          >
            Googleフォームで問い合わせる
          </a>
        </div>
        {email && (
          <div className='mb-4 flex items-center gap-2'>
            <span className='font-bold'>メール：</span>
            <EmailObfuscated email={email} />
          </div>
        )}
        {snsLinks.length > 0 && (
          <div>
            <span className='font-bold'>SNS：</span>
            <ul className='inline-flex gap-4 p-0 m-0'>
              {snsLinks.map((sns) => (
                <li key={sns.name} className='list-none'>
                  <a
                    href={sns.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={sns.name}
                    className='text-indigo-600 font-bold no-underline hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                    tabIndex={0}
                  >
                    {sns.icon && (
                      <span className='mr-1 text-lg flex items-center'>
                        {sns.icon}
                      </span>
                    )}
                    <Badge
                      variant='secondary'
                      className='text-xs px-2 py-1 rounded'
                      style={{
                        fontWeight: 600,
                        fontFamily: 'system-ui, sans-serif',
                        letterSpacing: '0.01em',
                        fontSize: '0.95rem',
                      }}
                    >
                      {sns.name}
                    </Badge>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  </section>
)

// メールアドレス難読化用コンポーネント
const EmailObfuscated: React.FC<{ email: string }> = ({ email }) => {
  const [user, domain] = email.split('@')
  const display = `${user} [at] ${domain}`
  const mailto = `${user}@${domain}`
  const [copied, setCopied] = React.useState(false)

  // Promiseを使わず、状態遷移が確実に動くようにする
  const handleCopy = () => {
    let success = false
    try {
      // github.ioなど静的環境では clipboard API が使えない場合があるため、Promiseチェーンで確実に反映
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(mailto)
          .then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          })
          .catch(() => {
            window.prompt(
              'コピーできませんでした。手動でコピーしてください:',
              mailto,
            )
          })
        return
      } else {
        // 非セキュア環境やサポート外の場合はexecCommandでフォールバック
        const textarea = document.createElement('textarea')
        textarea.value = mailto
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.body.removeChild(textarea)
        success = true
      }
    } catch (_) {
      window.prompt('コピーできませんでした。手動でコピーしてください:', mailto)
    }
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <span>
      <a
        href={`mailto:${mailto}`}
        className='text-blue-600 underline'
        aria-label='メールで問い合わせる'
        tabIndex={0}
      >
        {display}
      </a>
      <button
        type='button'
        onClick={handleCopy}
        className='ml-2 bg-gray-200 border-none rounded px-2 py-1 cursor-pointer text-sm hover:bg-gray-300 transition-colors'
        aria-label='メールアドレスをコピー'
      >
        {copied ? 'コピーしました' : 'コピー'}
      </button>
    </span>
  )
}
