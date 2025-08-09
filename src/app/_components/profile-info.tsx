import Image from 'next/image'
import React from 'react'

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
  <section aria-label='プロフィール情報'>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image
        src={avatarUrl}
        alt={`${name}のアバター`}
        width={96}
        height={96}
        style={{ borderRadius: '50%' }}
        priority
      />
      <div>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>{name}</h1>
        <p style={{ margin: 0 }}>{bio}</p>
      </div>
    </div>
  </section>
)
