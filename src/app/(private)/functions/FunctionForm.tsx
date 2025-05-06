'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { MemberFunctionsSerializers } from '@/client/schemas'
import { useCreateFunction } from '@/services/hooks/function/useCreateFunction'
import { useUpdateFunction } from '@/services/hooks/function/useUpdateFunction'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TextEditor } from '@/components/ui/TextEditor'
import { Loader } from '@/components/Loader'

const validationSchema = Yup.object({
  functionName: Yup.string()
    .max(50, 'No máximo 50 caracteres')
    .required('Nome da função é obrigatório'),
  description: Yup.string()
})

interface FunctionFormProps {
  initialValue?: MemberFunctionsSerializers
  setFunctionForm: () => void
  setMessageSuccess: (message: string) => void
}

export const FunctionForm = ({
  initialValue,
  setFunctionForm,
  setMessageSuccess
}: FunctionFormProps) => {
  const { mutate: mutateCreate, isPending: isPendingCreate } =
    useCreateFunction()
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateFunction()
  const queryClient = useQueryClient()

  const formik = useFormik({
    initialValues: {
      functionName: initialValue?.function_name || '',
      description: initialValue?.description || ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (initialValue?.id) {
        mutateUpdate(
          {
            id: initialValue.id,
            values: {
              function_name: values.functionName,
              description: values.description
            }
          },
          {
            onSuccess: () => {
              setFunctionForm()
              queryClient.invalidateQueries({ queryKey: ['memberFunction'] })
              setMessageSuccess('Função atualizada com sucesso.')
            },
            onError: (error) => {
              formik.setErrors({
                functionName: error?.function_name
              })
            }
          }
        )
      } else {
        mutateCreate(
          {
            function_name: values.functionName,
            description: values.description
          },
          {
            onSuccess: () => {
              setFunctionForm()
              queryClient.invalidateQueries({ queryKey: ['memberFunction'] })
              setMessageSuccess('Função criada com sucesso.')
            },
            onError: (error) => {
              formik.setErrors({
                functionName: error?.function_name
              })
            }
          }
        )
      }
    }
  })

  if (isPendingCreate || isPendingUpdate) {
    return <Loader />
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-2.5">
      <div>
        <label htmlFor="functionName" className="block font-medium mb-1.5">
          Nome da função
        </label>
        <Input
          id="functionName"
          name="functionName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.functionName}
        />
        {formik.touched.functionName && formik.errors.functionName && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.functionName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium mb-1.5">
          Descrição (opcional)
        </label>
        <TextEditor
          value={formik.values.description}
          onChange={(value) => formik.setFieldValue('description', value)}
          error={formik.errors.description}
        />
      </div>

      <div className="flex justify-end mt-6 gap-2.5">
        <Button
          type="button"
          onClick={setFunctionForm}
          className="cursor-pointer bg-red-600 hover:bg-red-700"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="cursor-pointer bg-purple-600 hover:bg-purple-700"
          disabled={isPendingCreate || isPendingUpdate}
        >
          {isPendingCreate || isPendingUpdate
            ? 'Salvando alterações...'
            : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
