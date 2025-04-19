'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Editor } from '@tinymce/tinymce-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AnimatedMulti from '@/components/ui/multiple-selector'

import { useGetCategoryList } from '@/services/hooks/useGetCategoryList'

type Category = {
  id?: number
  category_name?: string
}

type PropsMusicForm = {
  music?: {
    id?: number
    category?: Category[]
    music_chord?: {
      id?: number
      chord_name?: string
      chord_image?: string | null
    }[]
    created_at?: Date
    updated_at?: Date
    music_title?: string
    author?: string
    music_tone?: string
    music_text?: string
    music_link?: string
  }
  onSubmitSuccess?: () => void
  setMusicForm: () => void
}

export function MusicForm({
  music,
  onSubmitSuccess,
  setMusicForm
}: PropsMusicForm) {
  const validationSchema = Yup.object({
    music_title: Yup.string().required('Título da música é obrigatório'),
    author: Yup.string().required('Autor é obrigatório'),
    music_tone: Yup.string().required('Tom da música é obrigatório'),
    music_text: Yup.string().required('Texto da música é obrigatório'),
    music_link: Yup.string().url('Deve ser uma URL válida')
  })

  const formik = useFormik({
    initialValues: {
      music_title: music?.music_title || '',
      author: music?.author || '',
      music_tone: music?.music_tone || '',
      music_text: music?.music_text || '',
      music_link: music?.music_link || '',
      category: music?.category?.map((cat) => cat.id) || []
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Valores enviados:', values)
      // Aqui você pode fazer a mutação
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
    }
  })

  const { data: dataCategory } = useGetCategoryList()

  const categoryList = dataCategory?.data
  const selectCategoryOptions = categoryList
    ?.filter(
      (item) => item.id !== undefined && item.category_name !== undefined
    )
    .map((item) => ({
      value: String(item.id), // Aqui é garantido que id existe
      label: String(item.category_name) // Aqui é garantido que category_name existe
    }))

  const handlePdfUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      const { extractTextFromPdf } = await import('@/utils/extractTextFromPdf')
      const extractedText = await extractTextFromPdf(file)

      // Atualiza o campo music_text do Formik
      formik.setFieldValue('music_text', extractedText.trim())
    }
  }

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="pdf-upload"
          className="text-sm font-medium text-gray-700"
        >
          Carregar Cifra em PDF
        </label>
        <Input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
        />
      </div>

      <div>
        <label
          htmlFor="music_title"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Título da Música
        </label>
        <Input
          type="text"
          id="music_title"
          name="music_title"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.music_title}
        />
        {formik.errors.music_title && (
          <p className="text-red-500 text-sm">{formik.errors.music_title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Autor
        </label>
        <Input
          type="text"
          id="author"
          name="author"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.author}
        />
        {formik.errors.author && (
          <p className="text-red-500 text-sm">{formik.errors.author}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="music_tone"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Tom da Música
        </label>
        <Input
          type="text"
          id="music_tone"
          name="music_tone"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.music_tone}
        />
        {formik.errors.music_tone && (
          <p className="text-red-500 text-sm">{formik.errors.music_tone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="music_text"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Letra da Música
        </label>
        <Editor
          apiKey="4z1hf8zobk0ns34u5nwsnn1haz25wcn8133kqxzd4x69t213"
          init={{
            plugins:
              'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            language: 'pt_BR'
          }}
          onEditorChange={(content) =>
            formik.setFieldValue('music_text', content)
          }
          onChange={formik.handleChange}
          value={formik.values.music_text}
        />

        {formik.errors.music_text && (
          <p className="text-red-500 text-sm">{formik.errors.music_text}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="music_link"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Link da Música (opcional)
        </label>
        <Input
          type="text"
          id="music_link"
          name="music_link"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.music_link}
        />
        {formik.errors.music_link && (
          <p className="text-red-500 text-sm">{formik.errors.music_link}</p>
        )}
      </div>

      {/* 🔥 Select Múltiplo de Categorias */}
      <div>
        <label
          htmlFor="category"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Categorias
        </label>
        {selectCategoryOptions && (
          <AnimatedMulti
            options={selectCategoryOptions}
            onChange={(selectedOptions) => {
              formik.setFieldValue(
                'category',
                selectedOptions.map((option) => option.value)
              )
            }}
          />
        )}
        {formik.errors.category && (
          <p className="text-red-500 text-sm">
            {formik.errors.category as string}
          </p>
        )}
      </div>

      {/* Botões */}
      <div className="flex justify-end mt-6 gap-2.5">
        <Button
          type="button"
          onClick={setMusicForm}
          className="bg-red-600 hover:bg-red-700"
        >
          Cancelar
        </Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
          Salvar Música
        </Button>
      </div>
    </form>
  )
}
