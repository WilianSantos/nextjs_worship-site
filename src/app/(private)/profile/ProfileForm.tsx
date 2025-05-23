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

export type valueForm = {
  firstName: string
  lastName: string
  username: string
  email: string
  function: (number | undefined)[]
  cellPhone: string
  name: string
  availability: boolean
}

type ProfileFormProps = {
  onSubmit: (
    values: valueForm,
    functions: MemberFunctionsSerializers[] | undefined
  ) => void
  initialValue: valueForm
  isPending: boolean
  setUserEditFalse: () => void
}

export function ProfileForm({
  onSubmit,
  initialValue,
  isPending,
  setUserEditFalse
}: ProfileFormProps) {
  const { data: functionData } = useGetFunctionList({})

  const functions = functionData?.data
  const selectFunctionsOptions = functions
    ?.filter(
      (item) => item.id !== undefined && item.function_name !== undefined
    )
    .map((item) => ({
      value: String(item.id),
      label: String(item.function_name)
    }))
  const defaultSelectFunctionsOptions = functions
    ?.filter(
      (item) =>
        item.id !== undefined &&
        item.function_name !== undefined &&
        initialValue.function.includes(item.id)
    )
    .map((item) => ({
      value: String(item.id),
      label: String(item.function_name)
    }))

  const validationSchema = Yup.object({
    username: Yup.string().required('Nome de usuário é obrigatório'),
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    cellPhone: Yup.string().matches(
      /^\d{11}$/,
      'Celular deve ter 11 dígitos numéricos'
    )
  })

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values, functions)
      } catch (error) {
        const err = error as {
          first_name?: string
          last_name?: string
          username?: string
          email?: string
          function?: string
          cell_phone?: string
          name?: string
        }

        formik.setErrors({
          firstName: err.first_name || '',
          lastName: err.last_name || '',
          username: err.username || '',
          email: err.email || '',
          function: err.function || '',
          cellPhone: err.cell_phone || '',
          name: err.name || ''
        })
      }
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
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Primeiro Nome
        </label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.errors.firstName && (
          <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Sobrenome
        </label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.errors.lastName && (
          <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Nome de Usuário
        </label>
        <Input
          type="text"
          id="username"
          name="username"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="function"
          className="block text-sm font-medium text-gray-700"
        >
          Funções
        </label>
        {selectFunctionsOptions && (
          <AnimatedMulti
            options={selectFunctionsOptions}
            onChange={(selectedOptions) => {
              formik.setFieldValue(
                'function',
                selectedOptions.map((option) => option.value)
              )
            }}
            defaultValue={defaultSelectFunctionsOptions}
          />
        )}
        {formik.errors.function && (
          <p className="text-red-500 text-sm">{formik.errors.function}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="cellPhone"
          className="block text-sm font-medium text-gray-700"
        >
          Celular
        </label>
        <IMaskInput
          mask="(00) 00000-0000"
          id="cellPhone"
          name="cellPhone"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={formik.values.cellPhone}
          onAccept={(value) => {
            const onlyNumbers = value.replace(/\D/g, '')
            formik.setFieldValue('cellPhone', onlyNumbers)
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.cellPhone && formik.errors.cellPhone && (
          <p className="text-red-500 text-sm">{formik.errors.cellPhone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="availability"
          className="block text-sm font-medium text-gray-700"
        >
          Disponibilidade
        </label>
        <div className="flex items-center">
          <span className="ml-2">Disponível</span>
          <input
            type="checkbox"
            id="availability"
            name="availability"
            className="ml-2"
            checked={formik.values.availability}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-2.5">
        <Button
          type="button"
          onClick={setUserEditFalse}
          className="bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? 'Salvando alterações...' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
