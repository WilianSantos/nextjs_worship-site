'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Editor } from '@tinymce/tinymce-react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AnimatedMulti from '@/components/ui/multiple-selector'

import { useGetCategoryList } from '@/services/hooks/useGetCategoryList'
import { useCreatePdfUpload } from '@/services/hooks/useCreatePdfUpload'
import { useCreateMusic } from '@/services/hooks/useCreateMusic'
import { useGetChordList } from '@/services/hooks/useGetChordList'
import { MusicSerializers } from '@/client/schemas/musicSerializers'
import { useUpdateMusic } from '@/services/hooks/useUpdateMusic'
import { formatToISOStringWithTimezone } from '@/utils/formatDate'

type PropsMusicForm = {
  music?: MusicSerializers
  setMusicForm: () => void
}

export function MusicForm({ music, setMusicForm }: PropsMusicForm) {
  const { data: dataCategory } = useGetCategoryList()
  const { data: dataChords } = useGetChordList()

  const categoryList = dataCategory?.data
  const selectCategoryOptions = categoryList
    ?.filter(
      (item) => item.id !== undefined && item.category_name !== undefined
    )
    .map((item) => ({
      value: String(item.id),
      label: String(item.category_name)
    }))

  const chordList = dataChords?.data

  const { mutate: mutateMusicCreate, isPending: isPendingMusicCreate } =
    useCreateMusic()
  const { mutate: mutateMusicUpdate, isPending: isPendingMusicUpdate } =
    useUpdateMusic()

  const queryClient = useQueryClient()

  const validationSchema = Yup.object({
    musicTitle: Yup.string().required('Título da música é obrigatório'),
    author: Yup.string().required('Autor é obrigatório'),
    musicTone: Yup.string().required('Tom da música é obrigatório'),
    musicText: Yup.string().required('Texto da música é obrigatório'),
    musicLink: Yup.string().url('Deve ser uma URL válida')
  })

  const formik = useFormik({
    initialValues: {
      musicTitle: '',
      author: '',
      musicTone: '',
      musicText: '',
      musicLink: '',
      category: [] as number[],
      pdfUpload: '',
      musicChord: [] as string[]
    },
    validationSchema,
    onSubmit: (values) => {
      // Tratamento de dados mais seguro
      const categoryData = categoryList
        ? categoryList
            .filter(
              (item) =>
                item.id !== undefined && values.category.includes(item.id)
            )
            .map((item) => Number(item.id))
        : []

      // Verificação para garantir que musicChord é um array antes de usar includes
      const chordData =
        chordList && Array.isArray(values.musicChord)
          ? chordList
              .filter(
                (item) =>
                  item.chord_name &&
                  (values.musicChord as string[]).includes(item.chord_name)
              )
              .map((item) => Number(item.id))
          : []

      if (music?.id) {
        const now = new Date()
        mutateMusicUpdate(
          {
            id: music.id,
            values: {
              author: values.author,
              category_ids: categoryData,
              music_chord_ids: chordData,
              music_text: values.musicText,
              music_title: values.musicTitle,
              music_tone: values.musicTone,
              music_link: values.musicLink,
              updated_at: formatToISOStringWithTimezone(now)
            }
          },
          {
            onError: (error) => {
              if (error) {
                const formikErrors: Record<string, string> = {}

                // Mapeamento correto dos erros da API para campos do formik
                if (error.author) formikErrors.author = error.author
                if (error.category) formikErrors.category = error.category
                if (error.music_chord)
                  formikErrors.musicChord = error.music_chord
                if (error.music_link) formikErrors.musicLink = error.music_link
                if (error.music_text) formikErrors.musicText = error.music_text
                if (error.music_title)
                  formikErrors.musicTitle = error.music_title
                if (error.music_tone) formikErrors.musicTone = error.music_tone

                formik.setErrors(formikErrors)
              }
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['musicList']
              })
              setMusicForm()
            }
          }
        )
      } else {
        mutateMusicCreate(
          {
            author: values.author,
            category_ids: categoryData,
            music_chord_ids: chordData,
            music_text: values.musicText,
            music_title: values.musicTitle,
            music_tone: values.musicTone,
            music_link: values.musicLink
          },
          {
            onError: (error) => {
              if (error) {
                const formikErrors: Record<string, string> = {}

                // Mapeamento correto dos erros da API para campos do formik
                if (error.author) formikErrors.author = error.author
                if (error.category) formikErrors.category = error.category
                if (error.music_chord)
                  formikErrors.musicChord = error.music_chord
                if (error.music_link) formikErrors.musicLink = error.music_link
                if (error.music_text) formikErrors.musicText = error.music_text
                if (error.music_title)
                  formikErrors.musicTitle = error.music_title
                if (error.music_tone) formikErrors.musicTone = error.music_tone

                formik.setErrors(formikErrors)
              }
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['musicList']
              })
              setMusicForm()
            }
          }
        )
      }
    }
  })

  // Efeito para atualizar os valores do formulário quando music mudar
  useEffect(() => {
    if (music) {
      formik.setValues({
        musicTitle: music.music_title || '',
        author: music.author || '',
        musicTone: music.music_tone || '',
        musicText: music.music_text || '',
        musicLink: music.music_link || '',
        category: music.category?.map((cat) => Number(cat.id)) || [],
        pdfUpload: '',
        musicChord: music.music_chord?.map((chord) => chord.chord_name) || []
      })
    }
  }, [music])

  const { mutate: mutatePdfUpload } = useCreatePdfUpload()

  const handlePdfUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      mutatePdfUpload(
        { file },
        {
          onError: (error) => {
            formik.setErrors({
              pdfUpload: error.file || error.detail
            })
          },
          onSuccess: (data) => {
            const extractedText = data?.html || ''
            formik.setFieldValue('musicText', extractedText.trim())

            const chords = data?.chords || []
            formik.setFieldValue('musicChord', chords)
          }
        }
      )
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="pdf-upload"
          className="text-sm font-medium text-gray-700"
        >
          Carregar Cifra em PDF
        </label>
        <Input
          id="pdf-upload"
          name="pdfUpload"
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
        />
        {formik.errors.pdfUpload && (
          <p className="text-red-500 text-sm">
            {String(formik.errors.pdfUpload)}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="musicTitle"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Título da Música
        </label>
        <Input
          type="text"
          id="musicTitle"
          name="musicTitle"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.musicTitle}
        />
        {formik.errors.musicTitle && (
          <p className="text-red-500 text-sm">
            {String(formik.errors.musicTitle)}
          </p>
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
          <p className="text-red-500 text-sm">{String(formik.errors.author)}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="musicTone"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Tom da Música
        </label>
        <Input
          type="text"
          id="musicTone"
          name="musicTone"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.musicTone}
        />
        {formik.errors.musicTone && (
          <p className="text-red-500 text-sm">
            {String(formik.errors.musicTone)}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="musicText"
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
            formik.setFieldValue('musicText', content)
          }
          value={formik.values.musicText}
        />

        {formik.errors.musicText && (
          <p className="text-red-500 text-sm">
            {String(formik.errors.musicText)}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="musicLink"
          className="block mb-2.5 text-sm font-medium text-gray-700"
        >
          Link da Música (opcional)
        </label>
        <Input
          type="text"
          id="musicLink"
          name="musicLink"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.musicLink}
        />
        {formik.errors.musicLink && (
          <p className="text-red-500 text-sm">
            {String(formik.errors.musicLink)}
          </p>
        )}
      </div>

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
                selectedOptions.map((option) => Number(option.value))
              )
            }}
            defaultValue={
              music?.category?.map((cat) => ({
                value: String(cat.id),
                label: String(cat.category_name)
              })) || []
            }
          />
        )}
        {formik.errors.category && (
          <p className="text-red-500 text-sm">
            {String(formik.errors.category)}
          </p>
        )}
      </div>

      <div className="flex justify-end mt-6 gap-2.5">
        <Button
          type="button"
          onClick={setMusicForm}
          className="cursor-pointer bg-red-600 hover:bg-red-700"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700"
          disabled={isPendingMusicCreate || isPendingMusicUpdate}
        >
          {isPendingMusicCreate || isPendingMusicUpdate
            ? 'Salvando alterações...'
            : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
