import { CSSProperties } from 'react'

type IconName = 'grid' | 'briefcase' | 'search' | 'plus' | 'arrow' | 'bookmark' | 'send' | 'chat' | 'check' | 'list' | 'leaf' | 'close' | 'file'
const paths: Record<IconName, string> = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  briefcase: 'M8 6V4h8v2 M3 7h18v13H3z M3 12c5 4 13 4 18 0 M10 13h4',
  search: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  plus: 'M12 5v14 M5 12h14', arrow: 'M5 12h14 M14 7l5 5-5 5',
  bookmark: 'M6 3h12v18l-6-4-6 4z', send: 'M22 2 9 15 M22 2l-8 20-5-7-7-5z',
  chat: 'M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4z M8 10h8 M8 14h5',
  check: 'M5 12l4 4L19 6', list: 'M8 5h13 M8 12h13 M8 19h13 M3 5h.01 M3 12h.01 M3 19h.01',
  leaf: 'M20 3C7 1 2 8 6 15c7 6 15-1 14-12z M4 21 15 10', close: 'M6 6l12 12 M6 18 18 6',
  file: 'M14 2H5v20h14V7z M14 2v6h5 M8 12h8 M8 16h5',
}
export default function Icon({ name, size = 20, style }: { name: IconName; size?: number; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name]} /></svg>
}
