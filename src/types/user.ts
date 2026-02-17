export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  lastVisitedAt?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    totalPages: number
    currentPage: number
  }
}

export type UserSortField = keyof User | 'name'
