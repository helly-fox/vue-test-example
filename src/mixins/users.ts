import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref, unref } from 'vue'
import { type UserListParams, userService } from '@/services/users'

export const useUserList = (params: Ref<UserListParams>) =>
  useQuery({
    queryKey: computed(() => {
      return [
        'users',
        params.value.limit,
        params.value.offset,
        params.value.searchQuery,
        params.value.sortField,
        params.value.sortAsc,
      ]
    }),
    queryFn: () => userService.getUserList(unref(params) as UserListParams),
  })

export const useUserDetail = (id?: number | string) =>
  useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getUserById(id as string | number),
    enabled: !!id,
  })

export const useRemoveUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userService.removeUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('users'),
      }),
  })
}

export const useEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userService.editUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('users'),
      }),
  })
}

export const useAddUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userService.addUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('users'),
      }),
  })
}
