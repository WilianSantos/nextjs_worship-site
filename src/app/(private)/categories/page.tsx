'use client'

import { useState } from 'react'
import { Search, FolderOpen, Edit, Trash } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader } from '@/components/Loader'
import { CategoryForm } from './CategoryForm'

import { useGetCategoryList } from '@/services/hooks/category/useGetCategoryList'
import { useGetMusicsList } from '@/services/hooks/music/useGetMusicsList'
import { useDeleteCategory } from '@/services/hooks/category/useDeleteCategory'
import { MusicCategorySerializers } from '@/client/schemas'

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: dataCategory, isLoading: isLoadingCategory } =
    useGetCategoryList({ search: searchTerm })
  const categories = dataCategory?.data

  const { data: dataMusics, isLoading: isLoadingMusics } = useGetMusicsList({})

  const [categoryForm, setCategoryForm] = useState(false)
  const [categoryFormEdit, setCategoryFormEdit] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [initialFormValue, setInitialFormValue] =
    useState<MusicCategorySerializers>()

  const handlingTheEditingForm = (id: number | undefined) => {
    if (!id) return

    const category = categories?.find((item) => item.id === id)

    if (category) {
      setInitialFormValue(category)
      setCategoryFormEdit(true)
    }
  }

  const { mutate: mutateDelete, isPending } = useDeleteCategory()
  const [messageError, setMessageError] = useState('')
  const queryClient = useQueryClient()
  const deleteCategory = (id: number | undefined) => {
    if (!id) return

    mutateDelete(
      { id: id },
      {
        onSuccess: () => {
          setMessageSuccess('Categoria deletada com sucesso.')
          queryClient.invalidateQueries({ queryKey: ['musicCategory'] })
        },
        onError: (error) => {
          setMessageError(String(error.message))
        }
      }
    )
  }

  const musicCountInCategory = (id: number | undefined) => {
    const musicCount = dataMusics?.data.musics
      ? dataMusics?.data?.musics.filter((music) =>
          music.category?.some((c) => c.id === id)
        ).length || 0
      : 0

    return musicCount
  }

  if (isLoadingCategory || isLoadingMusics || isPending) {
    return <Loader />
  }

  return (
    <div className="p-6 space-y-6 md:pt-32">
      <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold font-parkinsans text-orange-500">
          Categorias
        </h1>
        <div>
          <p className="text-2xl text-green-500">{messageSuccess}</p>
        </div>
        <div>
          <p className="text-2xl text-red-500">{messageError}</p>
        </div>
        <div className="flex flex-col lg:items-center lg:flex-row md:flex-row md:items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => setCategoryForm(true)}
          >
            Nova Categoria
          </Button>
        </div>
      </div>

      {categoryFormEdit && initialFormValue ? (
        <Card>
          <CategoryForm
            setMessageSuccess={setMessageSuccess}
            setCategoryForm={() => setCategoryFormEdit(false)}
            initialValue={initialFormValue}
          />
        </Card>
      ) : categoryForm ? (
        <Card>
          <CategoryForm
            setMessageSuccess={setMessageSuccess}
            setCategoryForm={() => setCategoryForm(false)}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-md font-medium">
                    {category.category_name}
                  </CardTitle>
                  <FolderOpen className="h-5 w-5 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {musicCountInCategory(category.id)} músicas
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handlingTheEditingForm(category.id)}
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => deleteCategory(category.id)}
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex items-center justify-center col-span-full">
              <p className="text-sm text-gray-600">Sem registros</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
