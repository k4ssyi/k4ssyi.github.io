import React from 'react'

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
    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>学歴</h2>
    <ul>
      {education.map((edu, i) => (
        <li key={i} style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 'bold' }}>{edu.school}</span>（{edu.period}
          ）<br />
          <span>{edu.degree}</span>
        </li>
      ))}
    </ul>
    <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0 0.5rem' }}>
      職歴・プロジェクト
    </h2>
    <ul>
      {work.map((job, i) => (
        <li key={i} style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 'bold' }}>{job.company}</span>（
          {job.period}）<br />
          <span>{job.role}</span>
          {job.description && (
            <div>
              <small>{job.description}</small>
            </div>
          )}
        </li>
      ))}
    </ul>
  </section>
)
