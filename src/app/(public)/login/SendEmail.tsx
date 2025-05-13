'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateEmailPassword } from '@/services/hooks/member/useCreateEmailPassword'
import { Loader } from '@/components/Loader'

export default function SendEmailForm({
  setSendEmailForm,
  setMessageSuccess
}: {
  setSendEmailForm: () => void
  setMessageSuccess: (message: string) => void
}) {
  const [messageError, setMessageError] = useState<string | null>(null)
  const { mutate, isPending } = useCreateEmailPassword()

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Campo obrigatório')
    }),
    onSubmit: (values) => {
      mutate(
        {
          username: values.username
        },
        {
          onSuccess: () => {
            setMessageSuccess(
              'Acesse o e-mail referente ao seu registro para atualizar a senha'
            )

            setSendEmailForm()
          },
          onError: (error) => {
            const err = error as { detail?: string; username?: string }

            formik.setErrors({
              username: err?.username
            })
            if (err.detail) setMessageError(`${err.detail}`)
          }
        }
      )
    }
  })

  if (isPending) {
    return <Loader />
  }

  return (
    <>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <p className="text-lg text-red-500">
            {messageError ? messageError : ''}
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-600">Digite seu usuário</p>
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

        <div className="flex justify-end mt-6 gap-2.5">
          <Button
            type="button"
            onClick={setSendEmailForm}
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? 'Enviando e-mail...' : 'Enviar e-mail'}
          </Button>
        </div>
      </form>
    </>
  )
}
