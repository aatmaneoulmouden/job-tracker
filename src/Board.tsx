import { useState } from 'react'
import { Application, STATUSES, Status } from './types'
import { useLocalStorage } from './useLocalStorage'
import AppForm from './AppForm'
import Icon from './Icon'

const SEED: Application[] = [
  { id: 's1', company: 'Acme Corp', role: 'Frontend Engineer', notes: 'Referred by Sam', status: 'Saved' },
  { id: 's2', company: 'Globex', role: 'Full-Stack Developer', notes: 'Applied via careers page', status: 'Applied' },
  { id: 's3', company: 'Initech', role: 'Software Engineer', notes: 'Phone screen Thursday', status: 'Interview' },
]
type Editing = Application | 'new' | null
const statusIcons = { Saved: 'bookmark', Applied: 'send', Interview: 'chat', Offer: 'check', Rejected: 'close' } as const

export default function Board() {
  const [apps, setApps] = useLocalStorage<Application[]>('jt.applications', SEED)
  const [editing, setEditing] = useState<Editing>(null)
  const [dragId, setDragId] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<Status | null>(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All statuses')
  const [view, setView] = useState<'board' | 'list'>('board')
  const visible = apps.filter(a => `${a.company} ${a.role} ${a.notes}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'All statuses' || a.status === filter))

  function move(id: string, status: Status) { setApps(list => list.map(a => a.id === id ? { ...a, status } : a)) }
  function remove(id: string) { if (window.confirm('Delete this application?')) setApps(list => list.filter(a => a.id !== id)) }
  function save(data: Omit<Application, 'id'>) {
    if (editing === 'new') setApps(list => [...list, { ...data, id: crypto.randomUUID() }])
    else if (editing) setApps(list => list.map(a => a.id === editing.id ? { ...a, ...data } : a))
    setEditing(null)
  }

  function card(a: Application) {
    return <article key={a.id} className={`card ${dragId === a.id ? 'dragging' : ''}`} draggable onDragStart={e => { setDragId(a.id); e.dataTransfer.setData('text/plain', a.id); e.dataTransfer.effectAllowed = 'move' }} onDragEnd={() => { setDragId(null); setDragOver(null) }}>
      <div className="card-heading"><span className={`company-logo logo-${a.company.length % 4}`}>{a.company.slice(0, 1).toUpperCase()}</span><span className="card-company">{a.company}</span><button className="edit-button" aria-label={`Edit ${a.company} application`} onClick={() => setEditing(a)}>•••</button></div>
      <h4>{a.role}</h4><span className={`status-tag status-${a.status.toLowerCase()}`}><span />{a.status}</span>
      {a.notes && <p className="notes"><Icon name="chat" size={14} /><span>{a.notes}</span></p>}
      {a.resumeName && <a className="resume" href={a.resumeData} download={a.resumeName}><Icon name="file" size={14} />{a.resumeName}</a>}
      <div className="card-actions"><select aria-label={`Move ${a.company} to another status`} value={a.status} onChange={e => move(a.id, e.target.value as Status)}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select><button className="danger" aria-label={`Delete ${a.company} application`} onClick={() => remove(a.id)}>Delete</button></div>
    </article>
  }

  return <>
    <div className="toolbar page-heading"><div><div className="eyebrow">A LITTLE PROGRESS, EVERY DAY</div><h1>My applications<span className="heading-dot">.</span></h1><p>Your next opportunity, all in one place. Let’s keep things moving.</p></div><button className="primary" onClick={() => setEditing('new')}><Icon name="plus" size={18} />Add application</button></div>
    <div className="stats-grid">
      {[{ label: 'Total applications', value: apps.length, icon: 'briefcase' as const, detail: 'Every opportunity counts', color: 'green' }, { label: 'In progress', value: apps.filter(a => a.status === 'Applied').length, icon: 'send' as const, detail: 'Good things take a little time', color: 'blue' }, { label: 'Interviews', value: apps.filter(a => a.status === 'Interview').length, icon: 'chat' as const, detail: 'Time to make an impression', color: 'purple' }, { label: 'Offers received', value: apps.filter(a => a.status === 'Offer').length, icon: 'check' as const, detail: 'Your hard work, paying off', color: 'gold' }].map(stat => <div className="stat-card" key={stat.label}><div className="stat-label">{stat.label}<span className={`stat-icon ${stat.color}`}><Icon name={stat.icon} size={19} /></span></div><strong>{String(stat.value).padStart(2, '0')}</strong><small>{stat.detail}</small></div>)}
    </div>
    <section className="applications-section" aria-label="Application tracker">
      <div className="section-heading"><h2>Application board <span>{apps.length}</span></h2><span className="board-tip">Drag cards to update their status</span></div>
      <div className="board-controls"><label className="search"><Icon name="search" size={18} /><input aria-label="Search applications" placeholder="Search company, role, or notes…" value={query} onChange={e => setQuery(e.target.value)} />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><Icon name="close" size={15} /></button>}</label><div className="filter-controls"><select aria-label="Filter by status" value={filter} onChange={e => setFilter(e.target.value)}><option>All statuses</option>{STATUSES.map(s => <option key={s}>{s}</option>)}</select><div className="view-switch" aria-label="Application view" role="group"><button aria-label="Board view" aria-pressed={view === 'board'} className={view === 'board' ? 'active' : ''} onClick={() => setView('board')}><Icon name="grid" size={17} /></button><button aria-label="List view" aria-pressed={view === 'list'} className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><Icon name="list" size={18} /></button></div></div></div>
      {view === 'board' ? <div className="board">{STATUSES.map(status => {
        const items = visible.filter(a => a.status === status)
        return <section key={status} className={`column column-${status.toLowerCase()} ${dragOver === status ? 'drag-over' : ''}`} onDragOver={e => { e.preventDefault(); if (dragId) setDragOver(status) }} onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(null) }} onDrop={e => { e.preventDefault(); if (dragId) move(dragId, status); setDragId(null); setDragOver(null) }}><div className="column-heading"><h3><span className="status-dot" />{status}<span className="count">{items.length}</span></h3><button className="column-add" aria-label={`Add ${status.toLowerCase()} application`} onClick={() => setEditing({ id: '', company: '', role: '', notes: '', status })}><Icon name="plus" size={16} /></button></div>{items.map(card)}{!items.length && <div className="empty"><span className="empty-icon"><Icon name={statusIcons[status]} size={21} /></span><strong>{query || filter !== 'All statuses' ? 'No matching applications' : 'Room for possibilities'}</strong><p>{query || filter !== 'All statuses' ? 'Try another search or filter.' : status === 'Offer' ? 'Your next yes belongs here.' : status === 'Rejected' ? 'Every step is a learning step.' : 'Add an application or drag one here.'}</p></div>}</section>
      })}</div> : <div className="application-list">{visible.map(card)}{!visible.length && <div className="empty"><strong>No matching applications</strong><p>Try another search or filter.</p></div>}</div>}
    </section>
    <div className="encouragement"><span><Icon name="leaf" size={18} /></span><p>You don’t need to have it all figured out. Just take the next step.</p></div>
    {editing && <AppForm initial={editing === 'new' ? undefined : editing} onSave={data => { if (editing !== 'new' && !editing.id) { setApps(list => [...list, { ...data, id: crypto.randomUUID() }]); setEditing(null) } else save(data) }} onCancel={() => setEditing(null)} />}
  </>
}
