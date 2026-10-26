import { FormEvent, useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { Application, MAX_RESUME_BYTES, STATUSES, Status } from './types'

interface Props {
  initial?: Application
  onSave: (data: Omit<Application, 'id'>) => void
  onCancel: () => void
}

export default function AppForm({ initial, onSave, onCancel }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { dialog.current?.showModal(); dialog.current?.querySelector('input')?.focus() }, [])
  const [company, setCompany] = useState(initial?.company ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [status, setStatus] = useState<Status>(initial?.status ?? 'Saved')
  const [resumeName, setResumeName] = useState(initial?.resumeName)
  const [resumeData, setResumeData] = useState(initial?.resumeData)
  const [error, setError] = useState('')

  function pickFile(file: File | undefined) {
    if (!file) return
    if (file.size > MAX_RESUME_BYTES) {
      setError(`Resume must be under ${MAX_RESUME_BYTES / 1024} KB for this demo.`)
      return
    }
    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      setResumeName(file.name)
      setResumeData(String(reader.result))
    }
    reader.readAsDataURL(file)
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!company.trim() || !role.trim()) {
      setError('Company and role are required.')
      return
    }
    onSave({ company: company.trim(), role: role.trim(), notes, status, resumeName, resumeData })
  }

  return (
    <dialog ref={dialog} className="overlay" onCancel={onCancel} onClick={onCancel} aria-labelledby="application-form-title">
      <form className="modal" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <div className="modal-title"><h2 id="application-form-title">{initial?.id ? 'Edit application' : 'Add application'}</h2><button type="button" aria-label="Close form" onClick={onCancel}><Icon name="close" size={20} /></button></div>

        <label>
          Company
          <input placeholder="e.g. Acme Corp" required value={company} onChange={(e) => setCompany(e.target.value)} autoFocus />
        </label>
        <label>
          Role
          <input placeholder="e.g. Frontend Engineer" required value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Notes
          <textarea placeholder="Contacts, next steps, or a little reminder…" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <label>
          Resume (optional)
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e) => pickFile(e.target.files?.[0])} />
          {resumeName && <span className="hint">Attached: {resumeName}</span>}
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <div className="modal-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary">
            Save application
          </button>
        </div>
      </form>
    </dialog>
  )
}
