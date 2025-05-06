'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/Loader'

import { useCreateEmail } from '@/services/hooks/member/useCreateEmail'

interface MemberFormProps {
  setMemberForm: () => void
  setMessageSuccess: (message: string) => void
  setErrorPage: (message: string) => void
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido')
})

export const MemberForm = ({
  setMemberForm,
  setMessageSuccess,
  setErrorPage
}: MemberFormProps) => {
  const [emailList, setEmailList] = useState<string[]>([])
  const [messageError, setMessageError] = useState<string>('')

  const { mutate, isPending } = useCreateEmail()

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: () => {}
  })

  const handleSubmit = () => {
    mutate(
      { emails: emailList },
      {
        onSuccess: (responseData) => {
          setMessageSuccess(
            `Os e-mails ${responseData?.sent.map((item) => `${item}, `)}foram enviados com sucesso.`
          )

          setErrorPage(
            `Os e-mails ${responseData?.failed.map((item) => `${item.email}, ocorreu o seguinte erro: ${item.detail}, `)}tente novamente.`
          )

          setEmailList([])
          formik.resetForm()
          setMemberForm()
        },
        onError: (error) => {
          setMessageError(`${error.message}` || `${error.detail}`)
        }
      }
    )
  }

  const addEmail = (email: string) => {
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return setMessageError('E-mail invalido')
    if (emailList.includes(email)) return

    setEmailList((prev) => [...prev, email])
    formik.setFieldValue('email', '')
    setMessageError('')
  }

  const removeEmail = (email: string) => {
    setEmailList((prev) => prev.filter((e) => e !== email))
  }

  if (isPending) {
    return <Loader />
  }
  return (
    <form className="space-y-4 p-4 border rounded shadow bg-white">
      <div className="flex flex-col">
        <label className="block font-medium mb-1.5" htmlFor="email">
          Adicionar e-mails para convite
        </label>
        <div className="flex gap-2 flex-col lg:flex-row md:flex-row">
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="exemplo@email.com"
          />
          <Button
            className="cursor-pointer"
            type="button"
            onClick={() => addEmail(formik.values.email)}
          >
            Adicionar
          </Button>
        </div>
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {emailList.length > 0 && (
        <div className="border rounded p-3 bg-gray-50">
          <p className="font-medium mb-2">E-mails adicionados:</p>
          <ul className="space-y-1 text-sm text-gray-700">
            {emailList.map((email, idx) => (
              <li
                key={idx}
                className="flex flex-col lg:justify-between lg:items-center lg:flex-row md:justify-between md:items-center md:flex-row border-b pb-1"
              >
                <span className="text-xs">{email}</span>
                <button
                  type="button"
                  onClick={() => removeEmail(email)}
                  className="text-red-500 hover:underline text-xs cursor-pointer"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {messageError && <p className="text-red-600 text-sm">{messageError}</p>}

      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          onClick={setMemberForm}
          className="bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={emailList.length === 0 || isPending}
          className="bg-purple-600 cursor-pointer"
        >
          {isPending ? 'Enviando convites' : 'Enviar Convites'}
        </Button>
      </div>
    </form>
  )
}
