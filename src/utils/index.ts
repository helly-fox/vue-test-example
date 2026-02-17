import type { User } from '@/types/user.ts'
import type { UserSortField } from '@/types/user.ts'

export const formatTimestamp = (timestamp: number) => {
  const d = new Date(timestamp * 1000)

  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year} ${hour}:${min}`
}

// ToDo: this is a part of BE logic (have not paid much attention to this)
export const sortUsers = (
  list: User[],
  sortField?: UserSortField,
  sortAsc: boolean = true,
): User[] => {
  if (!sortField) return list

  const asc = sortAsc ?? true
  return [...list].sort((a, b) => {
    let av: string | number = ''
    let bv: string | number = ''

    switch (sortField) {
      case 'name':
        av = `${a.firstName} ${a.lastName}`.toLowerCase()
        bv = `${b.firstName} ${b.lastName}`.toLowerCase()
        break
      case 'email':
        av = a.email.toLowerCase()
        bv = b.email.toLowerCase()
        break
      case 'lastVisitedAt':
        av = a.lastVisitedAt ?? 0
        bv = b.lastVisitedAt ?? 0
        break
      default:
        const key = sortField as keyof User
        av = a[key] ?? ''
        bv = b[key] ?? ''
        break
    }

    if (av < bv) return asc ? -1 : 1
    if (av > bv) return asc ? 1 : -1
    return 0
  })
}
