'use client'

import React from 'react'

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
    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>お問い合わせ</h2>
    <div style={{ marginBottom: '1rem' }}>
      <a
        href={googleFormUrl}
        target='_blank'
        rel='noopener noreferrer'
        style={{
          display: 'inline-block',
          padding: '0.6em 1.2em',
          background: '#1976d2',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
        aria-label='Googleフォームで問い合わせる'
      >
        Googleフォームで問い合わせる
      </a>
    </div>
    {email && (
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontWeight: 'bold' }}>メール：</span>
        <EmailObfuscated email={email} />
      </div>
    )}
    {snsLinks.length > 0 && (
      <div>
        <span style={{ fontWeight: 'bold' }}>SNS：</span>
        <ul
          style={{ display: 'inline-flex', gap: '1rem', padding: 0, margin: 0 }}
        >
          {snsLinks.map((sns) => (
            <li key={sns.name} style={{ listStyle: 'none' }}>
              <a
                href={sns.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={sns.name}
                style={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                {sns.icon ? sns.icon : sns.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
)

// メールアドレス難読化用コンポーネント
const EmailObfuscated: React.FC<{ email: string }> = ({ email }) => {
  // "sample@example.com" → ["sample", "example.com"]
  const [user, domain] = email.split('@')
  const display = `${user} [at] ${domain}`
  const mailto = `${user}@${domain}`

  // クリップボードコピー機能
  const handleCopy = () => {
    navigator.clipboard.writeText(mailto)
  }

  return (
    <span>
      <a
        href={`mailto:${mailto}`}
        style={{ color: '#1976d2', textDecoration: 'underline' }}
        aria-label='メールで問い合わせる'
      >
        {display}
      </a>
      <button
        type='button'
        onClick={handleCopy}
        style={{
          marginLeft: 8,
          background: '#e0e0e0',
          border: 'none',
          borderRadius: 4,
          padding: '0.2em 0.7em',
          cursor: 'pointer',
          fontSize: '0.95em',
        }}
        aria-label='メールアドレスをコピー'
      >
        コピー
      </button>
    </span>
  )
}
