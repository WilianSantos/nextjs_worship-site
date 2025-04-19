'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useCreateToken } from '@/services/hooks/useCreateToken'

export default function LoginForm() {
  const { mutate, isSuccess, isError, isPending } = useCreateToken()
  const router = useRouter()

  useEffect(() => {
    if (isSuccess) router.push('/')
  }, [isSuccess, router])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório')
    }),
    onSubmit: (values) => {
      mutate({
        username: values.username,
        password: values.password
      })
    }
  })

  return (
    <>
      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline"></span>
        </div>
      )}
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Usuário"
              className="pl-10"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              required
            />
          </div>
        </div>
        <div>
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={isPending}
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </>
  )
}
