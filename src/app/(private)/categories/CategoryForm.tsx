'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { MusicCategorySerializers } from '@/client/schemas'
import { useCreateCategory } from '@/services/hooks/category/useCreateCategory'
import { useUpdateCategory } from '@/services/hooks/category/useUpdateCategory'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/Loader'

const validationSchema = Yup.object({
  categoryName: Yup.string() // Alterado para corresponder ao nome do campo no formulário
    .max(50, 'No máximo 50 caracteres')
    .required('Nome da categoria é obrigatório')
})

interface CategoryFormProps {
  initialValue?: MusicCategorySerializers
  setCategoryForm: () => void
  setMessageSuccess: (message: string) => void
}

export const CategoryForm = ({
  initialValue,
  setCategoryForm,
  setMessageSuccess
}: CategoryFormProps) => {
  const { mutate: mutateCreate, isPending: isPendingCreate } =
    useCreateCategory()
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateCategory()
  const queryClient = useQueryClient()

  const formik = useFormik({
    initialValues: {
      categoryName: initialValue?.category_name || ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (initialValue?.id) {
        mutateUpdate(
          {
            id: initialValue.id,
            values: { category_name: values.categoryName }
          },
          {
            onSuccess: () => {
              setCategoryForm()
              queryClient.invalidateQueries({ queryKey: ['musicCategory'] })
              setMessageSuccess('Categoria atualizada com sucesso.')
            },
            onError: (error) => {
              // corrigindo erro
              const err = error as { category_name?: string }
              formik.setErrors({
                categoryName: err.category_name || ''
              })
            }
          }
        )
      } else {
        mutateCreate(
          {
            category_name: values.categoryName
          },
          {
            onSuccess: () => {
              setCategoryForm()
              queryClient.invalidateQueries({ queryKey: ['musicCategory'] })
              setMessageSuccess('Categoria criada com sucesso.')
            },
            onError: (error) => {
              formik.setErrors({
                categoryName: error?.category_name
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
        <label htmlFor="categoryName" className="block font-medium mb-1.5">
          Nome da categoria
        </label>
        <Input
          id="categoryName"
          name="categoryName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryName}
        />
        {formik.touched.categoryName && formik.errors.categoryName && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.categoryName}
          </p>
        )}
      </div>

      <div className="flex justify-end mt-6 gap-2.5">
        <Button
          type="button"
          onClick={setCategoryForm}
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
