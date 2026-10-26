# Job Tracker (MVP)

A tiny demo app for tracking job applications.

- **Applicant view:** Kanban board (Saved, Applied, Interview, Offer, Rejected). Add, edit and delete applications. Move cards by drag and drop or with the dropdown on each card. Optionally attach a resume (under 500 KB).
- **Employer view:** list of applicants (name, role, overall fit) with a basic detail page.
- **"Login":** the Applicant / Employer switch in the header. There is no real auth.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## How it works

- Vite + React + TypeScript, plain CSS, no backend.
- Applications are stored in the browser's `localStorage`, so they persist between reloads on one machine.
- Employer-side applicants are hard-coded demo data in `src/Employer.tsx`.
- Resumes are stored in `localStorage` as small data URLs, which is fine for a demo but not for real use.

## Files

- `src/App.tsx`: header and role switch
- `src/Board.tsx`: Kanban board and applicant actions
- `src/AppForm.tsx`: add/edit modal with resume input
- `src/Employer.tsx`: applicant list and detail view
- `src/types.ts`, `src/useLocalStorage.ts`: shared types and the storage hook
