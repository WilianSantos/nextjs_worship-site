'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useCreateToken } from '@/services/hooks/token/useCreateToken'
import { useCheckAuth } from '@/services/hooks/token/useCheckAuth'

export function LoginForm() {
  const [messageError, setMessageError] = useState<string | null>(null)
  const { mutate, isPending } = useCreateToken()
  const { mutate: mutateCheckAuth } = useCheckAuth()
  const router = useRouter()

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
      mutate(
        {
          username: values.username,
          password: values.password
        },
        {
          onSuccess: () => {
            mutateCheckAuth(undefined, {
              onSuccess: () => {
                router.push('/')
              },
              onError: (error) => {
                const err = error as {
                  detail?: string
                }

                if (err.detail) setMessageError(err.detail)
              }
            })
          },
          onError: (error) => {
            const err = error as {
              username?: string
              password?: string
              detail?: string
            }

            formik.setErrors({
              username: err?.username,
              password: err?.password
            })
            if (err.detail) setMessageError(`${err.detail}`)
          }
        }
      )
    }
  })

  return (
    <>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <p className="text-lg text-red-500">
            {messageError ? messageError : ''}
          </p>
        </div>
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Usuário"
              className={`${formik.touched.username ? 'border-red-500' : ''} pl-10`}
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              required
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}
          </div>
        </div>
        <div>
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            className={`${formik.touched.password ? 'border-red-500' : ''} pl-10`}
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isPending}
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </>
  )
}
