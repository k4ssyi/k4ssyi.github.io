import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  name: string
  title: string
  picture: string
  coverImage: string
}

export const ProfileHeader = ({ name, title, picture, coverImage }: Props) => {
  return (
    <div className='relative flex flex-col items-center justify-center mb-12'>
      <div className='w-full h-48 md:h-64 rounded-xl overflow-hidden relative mb-[-64px]'>
        <Image
          src={coverImage}
          alt='カバー画像'
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          priority
        />
      </div>
      <Card className='relative z-10 flex flex-col items-center bg-white/80 dark:bg-slate-900/80 rounded-xl shadow-lg px-8 py-6 mt-[-48px] backdrop-blur'>
        <CardContent className='flex flex-col items-center p-0'>
          <Image
            src={picture}
            alt={name}
            width={96}
            height={96}
            className='rounded-full border-4 border-white dark:border-slate-900 shadow-lg mb-2'
            priority
          />
          <h1 className='text-3xl font-bold mt-2 mb-1'>{name}</h1>
          <div className='text-lg text-gray-600 dark:text-gray-300'>
            {title}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
