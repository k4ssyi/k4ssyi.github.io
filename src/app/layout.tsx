import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プロフィール',
  description: '笠井凌のプロフィールサイト',
  metadataBase: new URL('https://k4ssyi.github.io/'),
}

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  )
}
