'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IMaskInput } from 'react-imask'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { MemberMeReadable } from '@/client/types.gen'
import { useUpdateMember } from '@/services/hooks/useUpdateMember'
import { useGetFunctionList } from '@/services/hooks/useGetFunctionList'

type ProfileFormProps = {
  member: MemberMeReadable
  setUserEditTrue: () => void
  setUserEditFalse: () => void
}

export function ProfileForm({
  member,
  setUserEditTrue,
  setUserEditFalse
}: ProfileFormProps) {
  const { isPending, mutateAsync } = useUpdateMember()
  const { data: functionData } = useGetFunctionList()
  const queryClient = useQueryClient()

  const functions = functionData?.data

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
    initialValues: {
      firstName: member?.user?.first_name || '',
      lastName: member?.user?.last_name || '',
      username: member?.user?.username || '',
      email: member?.user?.email || '',
      function: member?.function?.map((item) => item.id) || [],
      profilePicture: member?.profile_picture as unknown as File | null,
      cellPhone: member?.cell_phone || '',
      name: member?.name || '',
      availability: member?.availability || false
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(
        {
          id: Number(member?.id) ?? 0,
          values: {
            user: {
              id: Number(member?.user?.id),
              first_name: values.firstName,
              last_name: values.lastName,
              username: values.username,
              email: values.email
            },
            function: functions
              ? functions
                  .filter((item) => values.function.includes(item.id))
                  .map((item) => Number(item.id))
              : [],
            cell_phone: values.cellPhone,
            name: values.name,
            availability: values.availability,
            profile_picture: values.profilePicture as File | string
          }
        },
        {
          onSuccess: () => {
            setUserEditTrue()
            queryClient.invalidateQueries({ queryKey: ['member'] })
          },
          onError: (error) => {
            const data = error
            if (data) {
              formik.setErrors({
                firstName: data?.first_name,
                lastName: data?.last_name,
                username: data?.username,
                email: data?.email,
                function: data?.function,
                cellPhone: data?.cell_phone,
                profilePicture: data?.profile_picture,
                name: data?.name
              })
            }
          }
        }
      )
    }
  })

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
        #TODO Adicionar um select estilizado
        <select
          multiple
          id="function"
          name="function"
          value={formik.values.function.map((item) => String(item || ''))}
          onChange={({ target }) => {
            const selectedOptions = Array.from(
              target.selectedOptions,
              (option) => option.value
            )
            formik.setFieldValue(
              'function',
              selectedOptions.map((item) => Number(item))
            )
          }}
        >
          {functions ? (
            functions.map((func) => (
              <option key={func.id} value={func.id}>
                {func.function_name}
              </option>
            ))
          ) : (
            <option disabled>Sem funções disponíveis</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="profilePicture"
          className="block text-sm font-medium text-gray-700"
        >
          Foto de Perfil
        </label>
        <Input
          type="file"
          id="profilePicture"
          name="profilePicture"
          className="w-full"
          onChange={(event) =>
            formik.setFieldValue(
              'profilePicture',
              event.currentTarget.files?.[0] || null
            )
          }
        />
        {formik.errors.profilePicture && (
          <p className="text-red-500 text-sm">{formik.errors.profilePicture}</p>
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

      <div className="flex justify-end mt-6">
        <Button
          type="button"
          className="mr-2 bg-gray-300 hover:bg-gray-400"
          onClick={setUserEditFalse}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={isPending}
        >
          {isPending ? 'Salvando alterações...' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
