export const STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'] as const
export type Status = (typeof STATUSES)[number]

export interface Application {
  id: string
  company: string
  role: string
  notes: string
  status: Status
  resumeName?: string
  resumeData?: string // data URL, kept small (see MAX_RESUME_BYTES)
}

export type Fit = 'Strong' | 'Good' | 'Weak'

export interface Candidate {
  id: string
  name: string
  email: string
  role: string
  fit: Fit
  summary: string
  skills: string[]
  resumeName?: string
}

export const MAX_RESUME_BYTES = 500 * 1024
