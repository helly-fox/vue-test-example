import type { PaginatedResponse, User, UserSortField } from '@/types/user.ts'
import { sortUsers } from '@/utils'

export interface UserListParams {
  limit?: number
  offset?: number
  searchQuery?: string
  sortField?: UserSortField
  sortAsc?: boolean
}

class UserService {
  private localUsers: User[] | null = null

  constructor() {
    this.getUserList = this.getUserList.bind(this)
    this.getUserById = this.getUserById.bind(this)
    this.addUser = this.addUser.bind(this)
    this.editUser = this.editUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
  }

  private async loadUsers(): Promise<User[]> {
    try {
      if (this.localUsers) {
        return Promise.resolve(this.localUsers)
      }
      const res = await fetch('/userList.json')
      this.localUsers = (await res.json()) as User[]

      return this.localUsers
    } catch (error) {
      console.error(error)

      return Promise.resolve([])
    }
  }

  async getUserList({
    limit = 10,
    offset = 0,
    searchQuery,
    sortField,
    sortAsc = true,
  }: UserListParams = {}): Promise<PaginatedResponse<User>> {
    const userList = await this.loadUsers()

    const normalizedQuery = searchQuery?.toLowerCase().trim()

    const filtered = normalizedQuery
      ? userList.filter((user) =>
          `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
            normalizedQuery,
          ),
        )
      : userList

    const sorted = sortUsers(filtered, sortField, sortAsc ?? true)

    const paged = sorted.slice(offset, offset + limit)

    return {
      data: paged,
      pagination: {
        totalPages: Math.max(1, Math.ceil(sorted.length / limit)),
        currentPage: Math.floor(offset / limit) + 1,
      },
    }
  }

  async getUserById(id: string | number): Promise<User | null> {
    const users = await this.loadUsers()
    return users.find((user) => user.id === +id) || null
  }

  async addUser(user: Omit<User, 'id' | 'lastVisitedAt'>): Promise<User> {
    const users = await this.loadUsers()

    const newUser: User = {
      id: Date.now(),
      ...user,
    }

    this.localUsers = [newUser, ...users]

    return newUser
  }

  async editUser(updatedUser: User): Promise<User> {
    const users = await this.loadUsers()
    this.localUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u))

    return updatedUser
  }

  async removeUser(id: number): Promise<void> {
    const users = await this.loadUsers()

    this.localUsers = users.filter((user) => user.id !== id)
  }
}

export const userService = new UserService()
