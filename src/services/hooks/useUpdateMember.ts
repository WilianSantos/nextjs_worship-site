import { useMutation } from '@tanstack/react-query'
import { api } from '../api'

export const useUpdateMember = () => {
  return useMutation({
    onSuccess: () => {},
    onError: () => {},
    mutationFn: async ({
      id,
      values
    }: {
      id: number
      values: {
        user: {
          id: number
          first_name: string
          last_name: string
          username: string
          email: string
        }
        function: number[]
        cell_phone: string
        name: string
        availability: boolean
        profile_picture?: File | string
      }
    }) => {
      const formDataMember = new FormData()
      const formDataUser = new FormData()

      formDataUser.append('first_name', values.user.first_name)
      formDataUser.append('last_name', values.user.last_name)
      formDataUser.append('username', values.user.username)
      formDataUser.append('email', values.user.email)
      const responseUser = await fetch(
        `http://localhost:8000/api/praise/user/${values.user.id}/`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formDataUser
        }
      )

      if (!responseUser.ok) {
        const errorBody = await responseUser.json().catch(() => ({}))
        throw errorBody
      }

      formDataMember.append('name', values.name)
      formDataMember.append('cell_phone', values.cell_phone)
      formDataMember.append('availability', String(values.availability))
      formDataMember.append('user', String(values.user.id))
      values.function.forEach((func) => {
        formDataMember.append('function', String(func))
      })

      if (values.profile_picture instanceof File) {
        formDataMember.append('profile_picture', values.profile_picture)
      }

      const responseMember = await fetch(
        `http://localhost:8000/api/praise/member/${id}/`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formDataMember
        }
      )

      if (!responseMember.ok) {
        const errorBody = await responseMember.json().catch(() => ({}))
        throw errorBody
      }
    }
  })
}
