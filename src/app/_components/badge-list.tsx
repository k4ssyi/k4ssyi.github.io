import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  items: string[]
}

export const BadgeList = ({ title, items }: Props) => {
  if (!items || items.length === 0) return null
  return (
    <section className='mb-8'>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <div className='flex flex-wrap gap-2'>
        {items.map((item, i) => (
          <Badge key={i} variant='outline' className='text-base px-3 py-1'>
            {item}
          </Badge>
        ))}
      </div>
    </section>
  )
}
