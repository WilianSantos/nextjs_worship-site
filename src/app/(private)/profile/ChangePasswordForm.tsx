'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IMaskInput } from 'react-imask'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AnimatedMulti from '@/components/ui/multiple-selector'

import { useGetFunctionList } from '@/services/hooks/function/useGetFunctionList'
import { MemberFunctionsSerializers } from '@/client/schemas'
import { Loader } from '@/components/Loader'
import { useCreatePassword } from '@/services/hooks/member/useCreatePassword'

const commonPasswords = [
  '123456',
  'password',
  'qwerty',
  '123456789',
  'senha123'
]

export const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Senha atual é obrigatória'),

  newPassword: Yup.string()
    .required('Nova senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .notOneOf(commonPasswords, 'Essa senha é muito comum. Escolha outra.')
    .test(
      'not-numeric-only',
      'A senha não pode conter apenas números',
      (value) => !/^\d+$/.test(value || '')
    ),

  confirmPassword: Yup.string()
    .required('Confirmação da senha é obrigatória')
    .oneOf([Yup.ref('newPassword')], 'As senhas não coincidem')
})

type ChangePasswordFormProps = {
  setChangePasswordForm: () => void
  setMessageSuccess: (message: string) => void
}

export function ChangePasswordForm({
  setChangePasswordForm,
  setMessageSuccess
}: ChangePasswordFormProps) {
  const { mutate, isPending } = useCreatePassword()

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      mutate(
        {
          new_password: values.newPassword,
          old_password: values.oldPassword
        },
        {
          onSuccess: () => {
            setMessageSuccess('Senha alterada com sucesso')
            setChangePasswordForm()
          }
        }
      )
    }
  })

  if (isPending) {
    return <Loader />
  }

  return (
    <form
      className="space-y-6"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <div>
        <label
          htmlFor="oldPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Senha antiga
        </label>
        <Input
          type="password"
          id="oldPassword"
          name="oldPassword"
          className={`${formik.touched.oldPassword ? 'border-red-500' : ''} w-full`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.oldPassword}
        />
        {formik.errors.oldPassword && formik.touched.oldPassword && (
          <p className="text-red-500 text-sm">{formik.errors.oldPassword}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Nova senha
        </label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          className={`${formik.touched.newPassword ? 'border-red-500' : ''} w-full`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmar senha
        </label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={`${formik.touched.confirmPassword ? 'border-red-500' : ''} w-full`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <p className="text-red-500 text-sm">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="flex justify-end mt-6 gap-2.5">
        <Button
          type="button"
          onClick={setChangePasswordForm}
          className="bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? 'Alterando alterações...' : 'Alterar'}
        </Button>
      </div>
    </form>
  )
}
