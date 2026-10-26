import { useState } from 'react'
import { Candidate } from './types'

// Demo data. A real version would load this from a backend.
const CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Priya Natarajan',
    email: 'priya.n@example.com',
    role: 'Frontend Engineer',
    fit: 'Strong',
    summary: '6 years building React apps. Led a design-system migration at her last company.',
    skills: ['React', 'TypeScript', 'Accessibility', 'Testing'],
    resumeName: 'priya-natarajan-resume.pdf',
  },
  {
    id: 'c2',
    name: 'Marcus Webb',
    email: 'marcus.w@example.com',
    role: 'Full-Stack Developer',
    fit: 'Good',
    summary: '3 years full-stack. Strong Node and Postgres, lighter on frontend testing.',
    skills: ['Node', 'Postgres', 'React', 'REST'],
    resumeName: 'marcus-webb-cv.pdf',
  },
  {
    id: 'c3',
    name: 'Elena Rossi',
    email: 'elena.r@example.com',
    role: 'Software Engineer',
    fit: 'Good',
    summary: 'Recent bootcamp grad with two solid internships and a shipped side project.',
    skills: ['JavaScript', 'Python', 'SQL'],
  },
  {
    id: 'c4',
    name: 'Tom Okafor',
    email: 'tom.o@example.com',
    role: 'Frontend Engineer',
    fit: 'Weak',
    summary: 'Mostly backend experience; limited exposure to modern frontend tooling.',
    skills: ['Java', 'Spring', 'SQL'],
  },
]

export default function Employer() {
  const [selected, setSelected] = useState<Candidate | null>(null)

  if (selected) {
    return (
      <div className="detail">
        <button onClick={() => setSelected(null)}>← Back to applicants</button>
        <h2>{selected.name}</h2>
        <p>
          <span className={`fit fit-${selected.fit}`}>{selected.fit} fit</span> · {selected.role}
        </p>
        <dl>
          <dt>Email</dt>
          <dd>{selected.email}</dd>
          <dt>Summary</dt>
          <dd>{selected.summary}</dd>
          <dt>Skills</dt>
          <dd>{selected.skills.join(', ')}</dd>
          <dt>Resume</dt>
          <dd>{selected.resumeName ?? 'Not provided'}</dd>
        </dl>
      </div>
    )
  }

  return (
    <>
      <div className="toolbar page-heading"><div><div className="eyebrow">FIND YOUR NEXT TEAMMATE</div><h1>Applicants<span className="heading-dot">.</span></h1><p>Get to know the people behind the applications. · Demo candidates</p></div></div>
      <table className="list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Overall fit</th>
          </tr>
        </thead>
        <tbody>
          {CANDIDATES.map((c) => (
            <tr key={c.id} onClick={() => setSelected(c)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(c)}>
              <td>{c.name}</td>
              <td>{c.role}</td>
              <td>
                <span className={`fit fit-${c.fit}`}>{c.fit}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
