
import { formatDate } from 'valaxy'

/**
 * set default img
 * @param e
 */
export function onImgError(e: Event, defaultImg = '/images/668e53660cde2.webp') {
  const targetEl = e.target as HTMLImageElement
  targetEl.setAttribute('data-src', targetEl.src)
  targetEl.src = defaultImg
}

export function formatTimestamp(date: string | number | Date): string {
  return formatDate(date, {
    template: 'YYYY-MM-DD HH:mm:ss',
  })
}