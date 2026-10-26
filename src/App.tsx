import { useLocalStorage } from './useLocalStorage'
import Board from './Board'
import Employer from './Employer'
import Icon from './Icon'

type Role = 'applicant' | 'employer'

export default function App() {
  const [role, setRole] = useLocalStorage<Role>('jt.role', 'applicant')
  return (
    <div className="app">
      <aside className="sidebar">
        <a className="brand" href="./"><span className="brand-mark"><Icon name="leaf" size={25} /></span>Job Tracker<span className="brand-dot">.</span></a>
        <div className="workspace-label">YOUR WORKSPACE</div>
        <nav aria-label="Workspace">
          <button className={role === 'applicant' ? 'nav-item selected' : 'nav-item'} onClick={() => setRole('applicant')}><Icon name="grid" />My applications<Icon name="arrow" size={16} /></button>
          <button className={role === 'employer' ? 'nav-item selected' : 'nav-item'} onClick={() => setRole('employer')}><Icon name="briefcase" />Applicants<Icon name="arrow" size={16} /></button>
        </nav>
        <div className="sidebar-note"><span className="note-icon"><Icon name="leaf" size={23} /></span><h3>Your next chapter<br />starts here.</h3><p>Small steps today.<br />Big possibilities tomorrow.</p><div className="plant-art" aria-hidden="true"><span /><span /><span /><span /><i /></div></div>
        <div className="sidebar-footer"><span className="avatar">Y</span><div><strong>Your workspace</strong><small>Make your next move</small></div><span className="online-dot" /></div>
      </aside>
      <div className="main-shell">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{role === 'applicant' ? 'My applications' : 'Applicants'}</strong></div><div className="switch" role="group" aria-label="Switch user type"><button aria-pressed={role === 'applicant'} className={role === 'applicant' ? 'active' : ''} onClick={() => setRole('applicant')}>Applicant</button><button aria-pressed={role === 'employer'} className={role === 'employer' ? 'active' : ''} onClick={() => setRole('employer')}>Employer</button></div></header>
        <main>{role === 'applicant' ? <Board /> : <Employer />}</main>
        <footer className="page-footer"><span><span className="online-dot" /> Saved on this device</span><span>A little more organized. A step closer.</span></footer>
      </div>
    </div>
  )
}
