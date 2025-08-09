import React from 'react'

type Skill = {
  name: string
  isMain?: boolean
}

type SkillsetProps = {
  skills: Skill[]
}

export const Skillset: React.FC<SkillsetProps> = ({ skills }) => (
  <section aria-label='スキルセット'>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>スキルセット</h2>
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        padding: 0,
        margin: 0,
      }}
    >
      {skills.map((skill, _) => (
        <li
          key={skill.name}
          style={{
            listStyle: 'none',
            padding: '0.4em 1em',
            borderRadius: '999px',
            background: skill.isMain ? '#1976d2' : '#e0e0e0',
            color: skill.isMain ? '#fff' : '#333',
            fontWeight: skill.isMain ? 'bold' : 'normal',
            fontSize: '1rem',
            border: skill.isMain ? '2px solid #1976d2' : '1px solid #ccc',
          }}
          aria-label={skill.isMain ? `${skill.name}（得意分野）` : skill.name}
        >
          {skill.name}
          {skill.isMain && (
            <span style={{ marginLeft: 4, fontSize: '0.9em' }}>★</span>
          )}
        </li>
      ))}
    </ul>
  </section>
)
