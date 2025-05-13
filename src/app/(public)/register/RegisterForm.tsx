'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateMember } from '@/services/hooks/member/useCreateMember'
import { IMaskInput } from 'react-imask'
import { useState } from 'react'

interface RegisterFormProps {
  email?: string
  token: string | null
}

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[\w.@+-]+$/, 'Formato inválido')
    .max(150)
    .required('Usuário é obrigatório'),
  password: Yup.string().min(1).max(128).required('Senha obrigatória'),
  first_name: Yup.string().max(150),
  last_name: Yup.string().max(150),
  email: Yup.string().email().max(254),
  name: Yup.string().min(1).max(150).required('Nome obrigatório'),
  cell_phone: Yup.string().max(14)
})

export function RegisterForm({ email, token }: RegisterFormProps) {
  const [messageError, setMessageError] = useState<string | null>(null)
  const { mutate } = useCreateMember()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: email || '',
      name: '',
      cellPhone: ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (token) {
        mutate(
          {
            name: values.name,
            email: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
            password: values.password,
            username: values.username,
            cell_phone: values.cellPhone,
            token: token
          },
          {
            onSuccess: () => {
              alert('Úsuario Cadastrado, faça o login.')
              router.push('/login')
            },
            onError: (error) => {
              const err = error as {
                detail?: string
                first_name?: string
                last_name?: string
                username?: string
                email?: string
                password?: string
                cell_phone?: string
                name?: string
              }

              formik.setErrors({
                firstName: err?.first_name,
                lastName: err?.last_name,
                username: err?.username,
                email: err?.email,
                password: err?.password,
                cellPhone: err?.cell_phone,
                name: err?.name
              })
              if (err.detail) setMessageError(`${err.detail}`)
            }
          }
        )
      }
    }
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold">Cadastro</h1>
      <div>
        <p className="text-lg text-red-500">
          {messageError ? messageError : ''}
        </p>
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Usuário
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Primeiro nome
        </label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Ultimo nome
        </label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome completo
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
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
          type="tel"
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

      <Button type="submit">Cadastrar</Button>
    </form>
  )
}
