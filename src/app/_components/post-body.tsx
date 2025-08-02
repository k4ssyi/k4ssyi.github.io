import parse, { HTMLReactParserOptions } from 'html-react-parser'
import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  // 必要に応じてoptionsでタグや属性のフィルタリングを追加できます
  const options: HTMLReactParserOptions = {}

  return (
    <div className='max-w-2xl mx-auto'>
      <div className={markdownStyles['markdown']}>
        {parse(content, options)}
      </div>
    </div>
  )
}
